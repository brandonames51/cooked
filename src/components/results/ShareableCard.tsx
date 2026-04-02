import { forwardRef } from "react";
import type { CookedResult } from "@/types";
import { getTier } from "@/constants";

interface ShareableCardProps {
  result: CookedResult;
}

const SPACE = "'Space Grotesk', sans-serif";
const DM = "'DM Sans', -apple-system, sans-serif";

/**
 * ShareableCard — Offscreen 1:1 mirror of PersonalityCard for PNG export.
 * Width fixed at 360px, height auto-sized by content.
 * Exported at 3x scale for retina quality.
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
        padding: "22px 20px 18px",
        fontFamily: DM,
        position: "absolute", left: "-9999px", top: 0,
        overflow: "hidden",
      }}>
        {/* Top glow */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: tier.topGlow }} />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontFamily: SPACE, fontSize: 18, fontWeight: 700, letterSpacing: 6, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)" }}>Rotted</div>
          <span style={{
            fontFamily: SPACE, fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" as const,
            padding: "4px 12px", borderRadius: 100,
            background: tier.pillBg, color: tier.pillColor, border: `1px solid ${tier.pillBorder}`,
          }}>{tier.label}</span>
        </div>

        {/* Brain + Score */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 16, padding: "8px 0" }}>
          <img src={`/images/${tier.brainImage}`} alt="" style={{ width: 120, height: "auto" }} crossOrigin="anonymous" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ fontFamily: SPACE, fontSize: 64, fontWeight: 700, lineHeight: "64px", height: 64, letterSpacing: -2, color: tier.scoreColor, overflow: "visible" }}>{result.cookedLevel}</div>
            <div style={{ fontFamily: SPACE, fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.3)", marginTop: 8 }}>/ 100</div>
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
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
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

        {/* Meter */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontFamily: SPACE, fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>Fresh</span>
            <span style={{ fontFamily: SPACE, fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>Rotted</span>
          </div>
          <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 3, width: `${result.cookedLevel}%`, background: tier.meterGrad }} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.08)", gap: 6 }}>
          <span style={{ fontFamily: SPACE, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.35)", letterSpacing: 0.5 }}>get rotted →</span>
          <span style={{ fontFamily: SPACE, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: tier.footerDomain }}>rotted.app</span>
        </div>
      </div>
    );
  }
);

ShareableCard.displayName = "ShareableCard";
export default ShareableCard;
