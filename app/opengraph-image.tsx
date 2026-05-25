import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const runtime = "edge";
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 10%, rgba(173,145,234,0.28) 0%, rgba(8,8,8,1) 55%), #080808",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 600,
              maxWidth: 980,
              display: "flex",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.3,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 900,
              display: "flex",
            }}
          >
            {siteConfig.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <div style={{ display: "flex" }}>{siteConfig.jobTitle}</div>
          <div style={{ display: "flex" }}>{siteConfig.twitter}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
