"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const DOT_SPACING = 18;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uDpr;

  varying float vGlow;
  varying float vWave;

  void main() {
    vec2 toMouse = position.xy - uMouse;
    float dist = length(toMouse);

    // Dots ease away from the cursor and relax back
    vec2 displaced = position.xy;
    if (dist > 0.001) {
      displaced += normalize(toMouse) * 10.0 * exp(-dist / 110.0);
    }

    vGlow = exp(-dist / 130.0);
    vWave =
      0.5 +
      0.5 *
        sin(uTime * 0.8 + position.x * 0.012 + position.y * 0.016);

    gl_Position =
      projectionMatrix * modelViewMatrix * vec4(displaced, 0.0, 1.0);
    gl_PointSize = (1.6 + vGlow * 2.4) * uDpr;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3 uAccent;

  varying float vGlow;
  varying float vWave;

  void main() {
    // Square points = retro pixels; no circular mask on purpose
    vec3 color = mix(vec3(1.0), uAccent, clamp(vGlow * 1.4, 0.0, 1.0));
    float alpha = 0.06 + 0.07 * vWave + 0.6 * vGlow;
    gl_FragColor = vec4(color, alpha);
  }
`;

function buildGrid(width: number, height: number) {
  const cols = Math.ceil(width / DOT_SPACING) + 1;
  const rows = Math.ceil(height / DOT_SPACING) + 1;
  const positions = new Float32Array(cols * rows * 3);

  let i = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      positions[i++] = col * DOT_SPACING;
      positions[i++] = row * DOT_SPACING;
      positions[i++] = 0;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geometry;
}

export default function HeroBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 0, 1, -1, 1);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(-9999, -9999) },
        uDpr: { value: dpr },
        uAccent: { value: new THREE.Color("#ad91ea") },
      },
    });

    let points: THREE.Points | null = null;

    const rebuild = () => {
      const { clientWidth: width, clientHeight: height } = container;
      if (!width || !height) return;

      renderer.setSize(width, height);
      camera.right = width;
      camera.bottom = height;
      camera.updateProjectionMatrix();

      if (points) {
        scene.remove(points);
        points.geometry.dispose();
      }
      points = new THREE.Points(buildGrid(width, height), material);
      scene.add(points);
    };

    rebuild();

    const mouseTarget = new THREE.Vector2(-9999, -9999);
    const mouse = material.uniforms.uMouse.value as THREE.Vector2;

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseTarget.set(event.clientX - rect.left, event.clientY - rect.top);
    };
    const onPointerLeave = () => {
      mouseTarget.set(-9999, -9999);
    };

    let rafId = 0;
    let running = false;
    const clock = new THREE.Clock();

    const tick = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      mouse.lerp(mouseTarget, 0.08);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      clock.start();
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(rafId);
    };

    if (reducedMotion) {
      renderer.render(scene, camera);
    } else {
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerleave", onPointerLeave);
      start();
    }

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visibility.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const resize = new ResizeObserver(() => {
      rebuild();
      if (reducedMotion) renderer.render(scene, camera);
    });
    resize.observe(container);

    return () => {
      stop();
      visibility.disconnect();
      resize.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (points) {
        scene.remove(points);
        points.geometry.dispose();
      }
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_28%,transparent_82%)]"
    />
  );
}
