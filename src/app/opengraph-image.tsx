import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const runtime = "edge";
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0b1220 0%, #1e293b 55%, #0ea5e9 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#ffffff",
              color: "#0b1220",
              fontSize: 44,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            W
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, opacity: 0.9 }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Free Word Counter
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.3,
              opacity: 0.9,
              maxWidth: 980,
            }}
          >
            Words · Characters · Reading time · Keyword density · Readability
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            opacity: 0.85,
          }}
        >
          <div>100% private — runs in your browser</div>
          <div style={{ fontWeight: 700 }}>No signup · No upload</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
