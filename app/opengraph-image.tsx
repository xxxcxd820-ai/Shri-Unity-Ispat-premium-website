import { ImageResponse } from "next/og";

export const alt = "Shri Unity Ispat — Iron & Steel, The Complete Solution";
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
          padding: 72,
          background: "#0f1d31",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          color: "#fbfaf7",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 56, border: "2px solid #fbfaf7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>I</div>
          <div style={{ fontSize: 30, letterSpacing: 6, textTransform: "uppercase" }}>Shri Unity Ispat</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 0.95, textTransform: "uppercase" }}>The material behind</div>
          <div style={{ fontSize: 92, lineHeight: 0.95, textTransform: "uppercase", color: "#d8b86a" }}>every stronger tomorrow.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "rgba(251,250,247,0.7)", fontFamily: "sans-serif" }}>
          <span>Iron &amp; Steel — The Complete Solution</span>
          <span>Varanasi · India</span>
        </div>
      </div>
    ),
    size,
  );
}
