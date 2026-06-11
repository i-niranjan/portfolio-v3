"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform sampler2D uMap;
  uniform vec2 uUvScale;
  uniform vec2 uUvOffset;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform float uReveal;
  uniform vec3 uAccent;

  varying vec2 vUv;

  // 4x4 Bayer threshold via the recursive trick
  float bayer2(vec2 a) {
    a = floor(a);
    return fract(a.x / 2.0 + a.y * a.y * 0.75);
  }
  float bayer4(vec2 a) {
    return bayer2(0.5 * a) * 0.25 + bayer2(a);
  }

  void main() {
    vec2 uv = vUv * uUvScale + uUvOffset;

    // Chunky mosaic sample
    float cell = 90.0;
    vec2 pixelUv = (floor(uv * cell) + 0.5) / cell;
    vec3 pixelated = texture2D(uMap, pixelUv).rgb;

    // Dithered purple duotone for the rest state
    float luma = dot(pixelated, vec3(0.299, 0.587, 0.114));
    float threshold = bayer4(gl_FragCoord.xy * 0.5);
    float tone = luma + (threshold - 0.5) * 0.22;
    vec3 retro = mix(vec3(0.02, 0.015, 0.04), uAccent, smoothstep(0.18, 0.95, tone));

    vec3 sharp = texture2D(uMap, uv).rgb;

    // Resolve to the sharp photo around the cursor
    float dist = distance(gl_FragCoord.xy, uMouse);
    float radius = uReveal * 0.55 * max(uRes.x, uRes.y);
    float focus = (1.0 - smoothstep(radius * 0.45, radius, dist)) * uReveal;

    // Quantize the focus edge so the resolve happens in dither steps, not a smooth fade
    focus = floor(focus * 5.0 + threshold) / 5.0;
    focus = clamp(focus, 0.0, 1.0);

    gl_FragColor = vec4(mix(retro, sharp, focus), 1.0);
  }
`;

export default function PortraitDissolve({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "low-power",
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uMap: { value: null },
        uUvScale: { value: new THREE.Vector2(1, 1) },
        uUvOffset: { value: new THREE.Vector2(0, 0) },
        uRes: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: new THREE.Vector2(-9999, -9999) },
        uReveal: { value: 0 },
        uAccent: { value: new THREE.Color("#ad91ea") },
      },
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    let imageAspect = 1;
    let textureReady = false;

    // background-size: cover, in UV space
    const updateCoverUv = () => {
      const { clientWidth: width, clientHeight: height } = container;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      material.uniforms.uRes.value.set(width * dpr, height * dpr);

      const canvasAspect = width / height;
      const scale = material.uniforms.uUvScale.value as THREE.Vector2;
      const offset = material.uniforms.uUvOffset.value as THREE.Vector2;
      if (canvasAspect > imageAspect) {
        scale.set(1, imageAspect / canvasAspect);
      } else {
        scale.set(canvasAspect / imageAspect, 1);
      }
      offset.set((1 - scale.x) / 2, (1 - scale.y) / 2);
    };

    new THREE.TextureLoader().load(src, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      imageAspect = texture.image.width / texture.image.height;
      material.uniforms.uMap.value = texture;
      textureReady = true;
      updateCoverUv();
      if (reducedMotion) renderer.render(scene, camera);
    });

    updateCoverUv();

    const mouseTarget = new THREE.Vector2(-9999, -9999);
    const mouse = material.uniforms.uMouse.value as THREE.Vector2;
    let revealTarget = 0;

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      // gl_FragCoord has y up
      mouseTarget.set(
        (event.clientX - rect.left) * dpr,
        (rect.height - (event.clientY - rect.top)) * dpr,
      );
    };
    const onPointerEnter = (event: PointerEvent) => {
      onPointerMove(event);
      mouse.copy(mouseTarget);
      revealTarget = 1;
    };
    const onPointerLeave = () => {
      revealTarget = 0;
    };

    const interactionRoot = container.parentElement ?? container;
    if (!reducedMotion) {
      interactionRoot.addEventListener("pointermove", onPointerMove);
      interactionRoot.addEventListener("pointerenter", onPointerEnter);
      interactionRoot.addEventListener("pointerleave", onPointerLeave);
    }

    let rafId = 0;
    let running = false;

    const tick = () => {
      mouse.lerp(mouseTarget, 0.14);
      const reveal = material.uniforms.uReveal;
      reveal.value += (revealTarget - reveal.value) * 0.07;
      if (textureReady) renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(rafId);
    };

    start();

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visibility.observe(container);

    const resize = new ResizeObserver(() => {
      updateCoverUv();
      if (reducedMotion && textureReady) renderer.render(scene, camera);
    });
    resize.observe(container);

    return () => {
      stop();
      visibility.disconnect();
      resize.disconnect();
      interactionRoot.removeEventListener("pointermove", onPointerMove);
      interactionRoot.removeEventListener("pointerenter", onPointerEnter);
      interactionRoot.removeEventListener("pointerleave", onPointerLeave);
      quad.geometry.dispose();
      (material.uniforms.uMap.value as THREE.Texture | null)?.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [src]);

  return <div ref={containerRef} aria-hidden className="absolute inset-0" />;
}
