"use client";

import { motion, useInView } from "motion/react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import {
  isValidElement,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

function flattenText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(flattenText).join("");
  }

  if (isValidElement(node)) {
    return flattenText((node.props as { children?: ReactNode }).children);
  }

  return "";
}

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function RevealBlock({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function HeadingTwo({ children }: ComponentPropsWithoutRef<"h2">) {
  const label = flattenText(children);
  const id = slugifyHeading(label);

  return (
    <RevealBlock>
      <h2
        id={id}
        data-toc-heading="true"
        data-heading-label={label}
        className="mb-5 scroll-mt-24 text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-white/92 first:mt-0 mt-[72px]"
      >
        {children}
      </h2>
    </RevealBlock>
  );
}

function HeadingThree({ children }: ComponentPropsWithoutRef<"h3">) {
  return (
    <RevealBlock>
      <h3 className="mb-3 mt-8 font-commit text-[11px] uppercase tracking-[0.1em] text-white/40">
        {children}
      </h3>
    </RevealBlock>
  );
}

function Paragraph({ children }: ComponentPropsWithoutRef<"p">) {
  return (
    <RevealBlock>
      <p className="mb-4 text-[15px] leading-[1.85] font-normal text-white/52">
        {children}
      </p>
    </RevealBlock>
  );
}

function UnorderedList({ children }: ComponentPropsWithoutRef<"ul">) {
  return <ul className="mb-[18px] space-y-2.5">{children}</ul>;
}

function ListItem({ children }: ComponentPropsWithoutRef<"li">) {
  return (
    <RevealBlock>
      <li className="flex gap-3 text-[15px] leading-[1.75] text-white/50">
        <span className="mt-[9px] block h-[3px] w-[3px] flex-shrink-0 rounded-full bg-white/20" />
        <span>{children}</span>
      </li>
    </RevealBlock>
  );
}

function BlockQuote({ children }: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <RevealBlock>
      <blockquote className="my-6 rounded-r-[4px] border-l-2 border-white/18 bg-white/[0.03] px-[22px] py-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-[20px] [&_p]:m-0 [&_p]:text-[14px] [&_p]:italic [&_p]:leading-[1.78] [&_p]:text-white/60">
        {children}
      </blockquote>
    </RevealBlock>
  );
}

function Link(props: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      {...props}
      className="text-white/78 underline decoration-white/20 underline-offset-4 transition-colors duration-200 hover:text-white"
    />
  );
}

function Strong({ children }: ComponentPropsWithoutRef<"strong">) {
  return <strong className="font-semibold text-white/84">{children}</strong>;
}

function CaseStudyImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt?: string;
  caption?: string;
}) {
  return (
    <RevealBlock>
      <div className="my-7">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_1px_rgba(255,255,255,0.07),0_24px_48px_rgba(0,0,0,0.5)] sm:aspect-[16/8]">
          <Image fill src={src} alt={alt ?? ""} className="object-cover" />
        </div>
        {caption ? (
          <p className="mt-2 text-center font-commit text-[11px] tracking-[0.06em] text-white/22">
            {caption}
          </p>
        ) : null}
      </div>
    </RevealBlock>
  );
}

function MarkdownImage(props: ComponentPropsWithoutRef<"img">) {
  return (
    <CaseStudyImage
      src={typeof props.src === "string" ? props.src : ""}
      alt={props.alt}
    />
  );
}

export const caseStudyMDXComponents = {
  h2: HeadingTwo,
  h3: HeadingThree,
  p: Paragraph,
  ul: UnorderedList,
  li: ListItem,
  blockquote: BlockQuote,
  a: Link,
  strong: Strong,
  img: MarkdownImage,
  CaseStudyImage,
} satisfies MDXComponents;
