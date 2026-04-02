import { forwardRef } from "react";
import type { CookedResult } from "@/types";
import { getTier } from "@/constants";

interface ShareableCardProps {
  result: CookedResult;
}

const SPACE = "'Space Grotesk', sans-serif";
const DM = "'DM Sans', -apple-system, sans-serif";

/**
 * ShareableCard — Optimized for Instagram Stories.
 * 360px wide, auto-height with top/bottom safe zones for IG UI overlay.
 * Exported at 3x = 1080px wide retina PNG.
 *
 * RULES (html2canvas):
 * - ALL styles inline (no Tailwind)
 * - <img> tags only (not next/image)
 * - No emojis
 */
const ShareableCard = forwardRef<HTMLDivElement, ShareableCardProps>(
  ({ result }, ref) => {
    const tier = getTier(result.cookedLevel);

    return (
      <div ref={ref} style={{
        width: 360,
        backgroundColor: "#0d0d0d",
        fontFamily: DM,
        position: "absolute", left: "-9999px", top: 0,
        overflow: "hidden",
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 20,
        paddingRight: 20,
      }}>
        {/* Top glow */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: tier.topGlow }} />

        {/* Header: rotted.app CTA left + tier pill right */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontFamily: SPACE, fontSize: 14, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)" }}>Rotted</span>
            <span style={{ fontFamily: DM, fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.25)" }}>·</span>
            <span style={{ fontFamily: DM, fontSize: 10, fontWeight: 600, color: tier.footerDomain, letterSpacing: 0.3 }}>rotted.app</span>
          </div>
          <div style={{
            fontFamily: SPACE, fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" as const,
            padding: "6px 14px", borderRadius: 100,
            background: tier.pillBg, color: tier.pillColor, border: `1px solid ${tier.pillBorder}`,
            textAlign: "center" as const,
          }}>{tier.label}</div>
        </div>

        {/* Brain + Score — both vertically centered in row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 20 }}>
          <img src={`/images/${tier.brainImage}`} alt="" style={{ width: 160, height: 160, objectFit: "contain" }} crossOrigin="anonymous" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
            <div style={{ fontFamily: SPACE, fontSize: 72, fontWeight: 700, lineHeight: "1", letterSpacing: -2, color: tier.scoreColor }}>{result.cookedLevel}</div>
            <div style={{ fontFamily: SPACE, fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>/ 100</div>
          </div>
        </div>

        {/* Personality */}
        <div style={{ fontFamily: SPACE, fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.2, textAlign: "center" as const, marginBottom: 16, letterSpacing: -0.3 }}>{result.personalityType}</div>

        {/* Most damning */}
        <div style={{ background: "rgba(255,255,255,0.035)", borderLeft: `2px solid ${tier.damningBorder}`, padding: "12px 16px", marginBottom: 14 }}>
          <div style={{ fontFamily: SPACE, fontSize: 9, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 2.5, marginBottom: 6, color: tier.damningLabel }}>Most damning</div>
          <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, fontWeight: 500 }}>{result.stats.mostDamning}</div>
        </div>

        {/* Roast */}
        <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.55, marginBottom: 16, fontWeight: 400 }}>{result.roastText}</div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 12 }}>
            <div style={{ fontFamily: SPACE, fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, letterSpacing: 2 }}>Screen time</div>
            <div style={{ fontFamily: SPACE, fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{result.totalScreenTime}</div>
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 12 }}>
            <div style={{ fontFamily: SPACE, fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, letterSpacing: 2 }}>Top app</div>
            <div style={{ fontFamily: SPACE, fontSize: 18, fontWeight: 700, color: tier.accentColor, marginTop: 4 }}>{result.topApp}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 500, marginTop: 1 }}>{result.topAppTime}</div>
          </div>
        </div>

        {/* Bottom vignette — fades to black below stats for seamless IG Stories blend */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, rgba(13,13,13,0), #0d0d0d)", pointerEvents: "none" as const }} />
      </div>
    );
  }
);

ShareableCard.displayName = "ShareableCard";
export default ShareableCard;
