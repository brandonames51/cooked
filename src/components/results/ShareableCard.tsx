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
 * 360px wide, exported at 3x = 1080px wide retina PNG.
 *
 * RULES (html2canvas):
 * - ALL styles inline (no Tailwind)
 * - <img> tags only (not next/image)
 * - No emojis
 * - No objectFit (html2canvas unreliable) — use explicit width+height matching actual aspect ratio
 *
 * Brain images are 677x369 (landscape ~1.83:1). NEVER force them into a square.
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
        paddingTop: 48,
        paddingBottom: 100,
        paddingLeft: 22,
        paddingRight: 22,
      }}>
        {/* Top glow accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: tier.topGlow }} />

        {/* ═══ HEADER: brand left + tier pill right ═══ */}
        {/* Fixed 28px row height. Both sides use display:flex + alignItems:center
            so brand text and pill text sit on the same visual baseline. */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          height: 28,
          marginBottom: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, height: 28 }}>
            <span style={{
              fontFamily: SPACE, fontSize: 13, fontWeight: 700,
              letterSpacing: 4, textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.45)",
              lineHeight: "28px",
            }}>Rotted</span>
            <span style={{ fontFamily: DM, fontSize: 10, color: "rgba(255,255,255,0.2)", lineHeight: "28px" }}>·</span>
            <span style={{
              fontFamily: DM, fontSize: 10, fontWeight: 600,
              color: tier.footerDomain, letterSpacing: 0.3,
              lineHeight: "28px",
            }}>rotted.app</span>
          </div>
          {/* Pill: fixed 26px height, flex-centered text, no padding-top/bottom tricks */}
          <div style={{
            fontFamily: SPACE, fontSize: 9, fontWeight: 700,
            letterSpacing: 2.5, textTransform: "uppercase" as const,
            height: 26, lineHeight: "26px",
            paddingLeft: 14, paddingRight: 14,
            minWidth: 70, textAlign: "center" as const,
            borderRadius: 50,
            background: tier.pillBg, color: tier.pillColor,
            border: `1px solid ${tier.pillBorder}`,
          }}>{tier.label}</div>
        </div>

        {/* ═══ BRAIN + SCORE — two equal-height boxes, contents centered ═══ */}
        {/* Both boxes are 110px tall. Brain and score each center within their box.
            This guarantees vertical alignment regardless of brain graphic or score. */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 12,
          marginBottom: 18,
        }}>
          {/* Brain box — 160x110, brain centered inside */}
          <div style={{
            width: 160, height: 110,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <img
              src={`/images/${tier.brainImage}`}
              alt=""
              style={{ width: 150, height: 82 }}
              crossOrigin="anonymous"
            />
          </div>

          {/* Score box — same 110px height, score+/100 centered inside */}
          <div style={{
            height: 110,
            display: "flex", flexDirection: "column" as const,
            alignItems: "flex-start", justifyContent: "center",
            flexShrink: 0,
          }}>
            <div style={{
              fontFamily: SPACE, fontSize: 64, fontWeight: 700,
              lineHeight: "64px", height: 64,
              letterSpacing: -2,
              color: tier.scoreColor,
              overflow: "visible",
            }}>{result.cookedLevel}</div>
            <div style={{
              fontFamily: SPACE, fontSize: 15, fontWeight: 500,
              color: "rgba(255,255,255,0.25)",
              marginTop: 10, height: 18, lineHeight: "18px",
            }}>/ 100</div>
          </div>
        </div>

        {/* ═══ PERSONALITY TYPE ═══ */}
        <div style={{
          fontFamily: SPACE, fontSize: 22, fontWeight: 700,
          color: "#fff", lineHeight: 1.2,
          textAlign: "center" as const,
          marginBottom: 14, letterSpacing: -0.3,
        }}>{result.personalityType}</div>

        {/* ═══ MOST DAMNING ═══ */}
        <div style={{
          background: "rgba(255,255,255,0.035)",
          borderLeft: `2px solid ${tier.damningBorder}`,
          padding: "12px 16px",
          marginBottom: 14,
        }}>
          <div style={{
            fontFamily: SPACE, fontSize: 9, fontWeight: 600,
            textTransform: "uppercase" as const, letterSpacing: 2.5,
            marginBottom: 6, color: tier.damningLabel,
          }}>Most damning</div>
          <div style={{
            fontSize: 13.5, color: "rgba(255,255,255,0.8)",
            lineHeight: 1.5, fontWeight: 500,
          }}>{result.stats.mostDamning}</div>
        </div>

        {/* ═══ ROAST TEXT ═══ */}
        <div style={{
          fontSize: 12.5, color: "rgba(255,255,255,0.45)",
          lineHeight: 1.55, marginBottom: 18, fontWeight: 400,
        }}>{result.roastText}</div>

        {/* ═══ STAT BOXES — compact height, positioned above vignette ═══ */}
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{
            flex: 1,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "10px 12px",
          }}>
            <div style={{
              fontFamily: SPACE, fontSize: 9, fontWeight: 600,
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase" as const, letterSpacing: 2,
              marginBottom: 4,
            }}>Screen time</div>
            <div style={{
              fontFamily: SPACE, fontSize: 17, fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              lineHeight: "1.1",
            }}>{result.totalScreenTime}</div>
          </div>
          <div style={{
            flex: 1,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "10px 12px",
          }}>
            <div style={{
              fontFamily: SPACE, fontSize: 9, fontWeight: 600,
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase" as const, letterSpacing: 2,
              marginBottom: 4,
            }}>Top app</div>
            <div style={{
              fontFamily: SPACE, fontSize: 17, fontWeight: 700,
              color: tier.accentColor,
              lineHeight: "1.1",
              marginBottom: 2,
            }}>{result.topApp}</div>
            <div style={{
              fontSize: 11, color: "rgba(255,255,255,0.35)",
              fontWeight: 500,
            }}>{result.topAppTime}</div>
          </div>
        </div>

        {/* Bottom vignette — starts BELOW stat boxes thanks to paddingBottom: 100 */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 70,
          background: "linear-gradient(to bottom, rgba(13,13,13,0), #0d0d0d)",
          pointerEvents: "none" as const,
        }} />
      </div>
    );
  }
);

ShareableCard.displayName = "ShareableCard";
export default ShareableCard;
