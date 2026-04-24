"use client";

import { usePathname } from "next/navigation";
import { ViewTransition, type ReactNode } from "react";

export default function RouteTransitionShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <ViewTransition name="route-content">
      <div key={pathname}>{children}</div>
    </ViewTransition>
  );
}
