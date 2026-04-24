"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { navigateWithTransition } from "@/lib/view-transition-navigation";
import { type ComponentPropsWithoutRef, type MouseEvent } from "react";

type TransitionLinkProps = ComponentPropsWithoutRef<typeof Link>;

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.button !== 0
  );
}

export default function TransitionLink({
  href,
  onClick,
  target,
  children,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      target={target}
      onClick={(event) => {
        onClick?.(event);

        if (
          event.defaultPrevented ||
          target ||
          isModifiedClick(event) ||
          typeof href !== "string" ||
          href.startsWith("#") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:") ||
          href.includes("#")
        ) {
          return;
        }

        event.preventDefault();
        navigateWithTransition(router.push, href);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
