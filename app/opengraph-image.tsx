import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — Cybersecurity Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamic OpenGraph/Twitter card — dark industrial, uses system fonts. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0b",
        color: "#eaeaea",
        padding: 80,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: "#8a8a90",
          fontSize: 26,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        <div style={{ width: 10, height: 40, background: "#ff5a1f" }} />
        HEM.GABHAWALA / PORTFOLIO
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          <span>From breaking systems to</span>
          <span style={{ color: "#ff5a1f" }}>building the guardrails.</span>
        </div>
        <div style={{ fontSize: 30, color: "#8a8a90" }}>
          Cybersecurity Engineer · VAPT → GRC & AI Security
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 28,
          color: "#71717a",
          fontSize: 24,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "#ff5a1f" }}>SC-01 Offensive</span>
        <span style={{ color: "#3b9eff" }}>SC-02 GRC</span>
        <span style={{ color: "#9b7bff" }}>SC-03 AI</span>
        <span style={{ color: "#2dd4bf" }}>SC-04 Cloud</span>
      </div>
    </div>,
    size,
  );
}
