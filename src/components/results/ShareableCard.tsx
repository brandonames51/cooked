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
 * 360x640 at 3x scale = 1080x1920 (Instagram Story size).
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
        width: 360, height: 640, backgroundColor: "#0d0d0d",
        padding: "18px 18px 14px",
        fontFamily: DM,
        display: "flex", flexDirection: "column",
        position: "absolute", left: "-9999px", top: 0, overflow: "hidden",
        borderRadius: 0,
      }}>
        {/* Top glow */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: tier.topGlow }} />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontFamily: SPACE, fontSize: 15, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)" }}>Rotted</div>
          <span style={{
            fontFamily: SPACE, fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" as const,
            padding: "3px 10px", borderRadius: 100,
            background: tier.pillBg, color: tier.pillColor, border: `1px solid ${tier.pillBorder}`,
          }}>{tier.label}</span>
        </div>

        {/* Brain + Score */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 12, padding: "4px 0" }}>
          <img src={`/images/${tier.brainImage}`} alt="" style={{ width: 100, height: "auto" }} crossOrigin="anonymous" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ fontFamily: SPACE, fontSize: 56, fontWeight: 700, lineHeight: 1, letterSpacing: -2, color: tier.scoreColor }}>{result.cookedLevel}</div>
            <div style={{ fontFamily: SPACE, fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>/ 100</div>
          </div>
        </div>

        {/* Personality */}
        <div style={{ fontFamily: SPACE, fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.2, textAlign: "center" as const, marginBottom: 12, letterSpacing: -0.3 }}>{result.personalityType}</div>

        {/* Most damning */}
        <div style={{ background: "rgba(255,255,255,0.035)", borderLeft: `2px solid ${tier.damningBorder}`, padding: "10px 14px", marginBottom: 10 }}>
          <div style={{ fontFamily: SPACE, fontSize: 8, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 4, color: tier.damningLabel }}>Most damning</div>
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.8)", lineHeight: 1.45, fontWeight: 500 }}>{result.stats.mostDamning}</div>
        </div>

        {/* Roast */}
        <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, marginBottom: 12, fontWeight: 400, flexGrow: 1 }}>{result.roastText}</div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontFamily: SPACE, fontSize: 8, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, letterSpacing: 2 }}>Screen time</div>
            <div style={{ fontFamily: SPACE, fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginTop: 3 }}>{result.totalScreenTime}</div>
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontFamily: SPACE, fontSize: 8, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, letterSpacing: 2 }}>Top app</div>
            <div style={{ fontFamily: SPACE, fontSize: 16, fontWeight: 700, color: tier.accentColor, marginTop: 3 }}>{result.topApp}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 500, marginTop: 1 }}>{result.topAppTime}</div>
          </div>
        </div>

        {/* Meter */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: SPACE, fontSize: 8, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>Fresh</span>
            <span style={{ fontFamily: SPACE, fontSize: 8, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>Rotted</span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 3, width: `${result.cookedLevel}%`, background: tier.meterGrad }} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.08)", gap: 5 }}>
          <span style={{ fontFamily: SPACE, fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.35)", letterSpacing: 0.5 }}>get rotted →</span>
          <span style={{ fontFamily: SPACE, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: tier.footerDomain }}>rotted.app</span>
        </div>
      </div>
    );
  }
);

ShareableCard.displayName = "ShareableCard";
export default ShareableCard;
