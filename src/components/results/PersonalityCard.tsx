"use client";

import type { CookedResult } from "@/types";
import { getTier, FONTS } from "@/constants";

export default function PersonalityCard({ result }: { result: CookedResult }) {
  const tier = getTier(result.cookedLevel);

  return (
    <div style={{
      width: "100%", maxWidth: 340,
      background: "#0d0d0d",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 20,
      padding: "22px 20px 18px",
      position: "relative", overflow: "hidden",
      fontFamily: FONTS.body,
    }}>
      {/* Top glow */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: tier.topGlow }} />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: FONTS.heading, fontSize: 18, fontWeight: 700, letterSpacing: 6, textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Cooked</div>
        <span style={{
          fontFamily: FONTS.heading, fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase",
          padding: "4px 12px", borderRadius: 100,
          background: tier.pillBg, color: tier.pillColor, border: `1px solid ${tier.pillBorder}`,
        }}>{tier.label}</span>
      </div>

      {/* Brain + Score */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 16, padding: "8px 0" }}>
        <img src={`/images/${tier.brainImage}`} alt={`${tier.label} brain`} style={{ width: 120, height: "auto" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ fontFamily: FONTS.heading, fontSize: 64, fontWeight: 700, lineHeight: 1, letterSpacing: -2, color: tier.scoreColor }}>{result.cookedLevel}</div>
          <div style={{ fontFamily: FONTS.heading, fontSize: 16, fontWeight: 500, color: "rgba(255,255,255,0.15)", marginTop: -4 }}>/ 100</div>
        </div>
      </div>

      {/* Personality */}
      <div style={{ fontFamily: FONTS.heading, fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.2, textAlign: "center", marginBottom: 16, letterSpacing: -0.3 }}>{result.personalityType}</div>

      {/* Most damning */}
      <div style={{ background: "rgba(255,255,255,0.02)", borderLeft: `2px solid ${tier.damningBorder}`, padding: "12px 16px", marginBottom: 14 }}>
        <div style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2.5, marginBottom: 6, color: tier.damningLabel }}>Most damning</div>
        <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, fontWeight: 500 }}>{result.stats.mostDamning}</div>
      </div>

      {/* Roast */}
      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.3)", lineHeight: 1.55, marginBottom: 16, fontWeight: 400 }}>{result.roastText}</div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: 12 }}>
          <div style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: 2 }}>Screen time</div>
          <div style={{ fontFamily: FONTS.heading, fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{result.totalScreenTime}</div>
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 12, padding: 12 }}>
          <div style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: 2 }}>Top app</div>
          <div style={{ fontFamily: FONTS.heading, fontSize: 18, fontWeight: 700, color: tier.accentColor, marginTop: 4 }}>{result.topApp}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontWeight: 500, marginTop: 1 }}>{result.topAppTime}</div>
        </div>
      </div>

      {/* Meter */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>Fresh</span>
          <span style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>Cooked</span>
        </div>
        <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 3, width: `${result.cookedLevel}%`, background: tier.meterGrad, transition: "width 1s ease-out" }} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.04)", gap: 6 }}>
        <span style={{ fontFamily: FONTS.heading, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.2)", letterSpacing: 0.5 }}>get cooked →</span>
        <span style={{ fontFamily: FONTS.heading, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: tier.footerDomain }}>getcooked.app</span>
      </div>
    </div>
  );
}
