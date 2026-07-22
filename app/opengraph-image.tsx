import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — Cybersecurity Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OpenGraph/Twitter card. Matches the paper plate — a shared card that looks
 * nothing like the page it links to is its own kind of tell.
 *
 * System fonts only: next/og cannot use the next/font Archivo instance without
 * shipping the binaries, so the width-axis hierarchy the site relies on is
 * unavailable here and scale plus colour carry it instead.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#faf9f7",
        color: "#14151a",
        padding: 80,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: "#6b6d79",
          fontSize: 24,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            background: "#b4331f",
          }}
        />
        {profile.name}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 68,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          <span>I break systems to understand them,</span>
          <span>then build the architecture</span>
          <span>that stops them breaking.</span>
        </div>
        <div style={{ fontSize: 28, color: "#5a5c66" }}>
          Cybersecurity Engineer · VAPT → GRC &amp; AI Security
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 40,
          color: "#5a5c66",
          fontSize: 24,
          borderTop: "1px solid rgba(20,21,26,0.14)",
          paddingTop: 28,
        }}
      >
        <span>Top 2% TryHackMe</span>
        <span>175+ labs</span>
        <span>3 platforms built</span>
      </div>
    </div>,
    size,
  );
}
