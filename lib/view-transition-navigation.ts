import { startTransition } from "react";

export interface RouteWipeRequestDetail {
  href: string;
  proceed: () => void;
}

export const ROUTE_WIPE_EVENT = "route-wipe:request";

export function navigateWithTransition(
  push: (href: string) => void,
  href: string,
) {
  const proceed = () => {
    startTransition(() => {
      push(href);
    });
  };

  if (typeof window === "undefined") {
    proceed();
    return;
  }

  // Give the RouteWipe overlay a chance to take over the navigation;
  // if nothing intercepts (or it declines), navigate immediately.
  const event = new CustomEvent<RouteWipeRequestDetail>(ROUTE_WIPE_EVENT, {
    cancelable: true,
    detail: { href, proceed },
  });
  const notIntercepted = window.dispatchEvent(event);
  if (notIntercepted) proceed();
}
