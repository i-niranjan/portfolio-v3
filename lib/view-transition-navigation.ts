import { startTransition } from "react";

export function navigateWithTransition(push: (href: string) => void, href: string) {
  startTransition(() => {
    push(href);
  });
}
