import { forwardRef } from "react";
import type { CookedResult } from "@/types";
import { getTier } from "@/constants";

interface ShareableCardProps {
  result: CookedResult;
}

const ShareableCard = forwardRef<HTMLDivElement, ShareableCardProps>(
  ({ result }, ref) => {
    const tier = getTier(result.cookedLevel);

    return (
      <div ref={ref} style={{
        width: 540, height: 960, backgroundColor: "#050505",
        padding: "40px 32px 32px",
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        display: "flex", flexDirection: "column",
        position: "absolute", left: "-9999px", top: 0, overflow: "hidden",
      }}>
        {/* Top glow */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: tier.topGlow }} />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, letterSpacing: 10, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)" }}>Rotted</div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" as const,
            padding: "6px 18px", borderRadius: 100,
            background: tier.pillBg, color: tier.pillColor, border: `1px solid ${tier.pillBorder}`,
          }}>{tier.label}</span>
        </div>

        {/* Brain + Score */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32, marginBottom: 28, padding: "12px 0" }}>
          <img src={`/images/${tier.brainImage}`} alt="" style={{ width: 180, height: "auto" }} crossOrigin="anonymous" />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 96, fontWeight: 700, lineHeight: 1, letterSpacing: -3, color: tier.scoreColor }}>{result.cookedLevel}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 500, color: "rgba(255,255,255,0.3)", marginTop: -6 }}>/ 100</div>
          </div>
        </div>

        {/* Personality */}
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 34, fontWeight: 700, color: "#fff", lineHeight: 1.2, textAlign: "center" as const, marginBottom: 24, letterSpacing: -0.5 }}>{result.personalityType}</div>

        {/* Most damning */}
        <div style={{ background: "rgba(255,255,255,0.035)", borderLeft: `3px solid ${tier.damningBorder}`, padding: "18px 24px", marginBottom: 20 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 3, marginBottom: 8, color: tier.damningLabel }}>Most damning</div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, fontWeight: 500 }}>{result.stats.mostDamning}</div>
        </div>

        {/* Roast */}
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.45)", lineHeight: 1.55, marginBottom: 24, fontWeight: 400, flexGrow: 1 }}>{result.roastText}</div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 18px" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, letterSpacing: 3 }}>Screen time</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginTop: 6 }}>{result.totalScreenTime}</div>
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 18px" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" as const, letterSpacing: 3 }}>Top app</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: tier.accentColor, marginTop: 6 }}>{result.topApp}</div>
            <div style={{ fontSize: 16, color: "rgba(255,255,255,0.35)", fontWeight: 500, marginTop: 2 }}>{result.topAppTime}</div>
          </div>
        </div>

        {/* Meter */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>Fresh</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>Rotted</span>
          </div>
          <div style={{ height: 10, background: "rgba(255,255,255,0.1)", borderRadius: 5, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 4, width: `${result.cookedLevel}%`, background: tier.meterGrad }} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)", gap: 8 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 500, color: "rgba(255,255,255,0.35)", letterSpacing: 0.5 }}>get rotted →</span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: 0.5, color: tier.footerDomain }}>rotted.app</span>
        </div>
      </div>
    );
  }
);

ShareableCard.displayName = "ShareableCard";
export default ShareableCard;
