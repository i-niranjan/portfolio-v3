"use client";
import { getCalApi } from "@calcom/embed-react";
import { type ReactNode, useEffect } from "react";

export default function CalButton({ children }: { children: ReactNode }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          light: { "cal-brand": "#ad91ea" },
          dark: { "cal-brand": "#ad91ea" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return children;
}
