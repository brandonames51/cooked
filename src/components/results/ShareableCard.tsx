import { forwardRef } from "react";
import { CookedResult } from "@/types";

// ─── ShareableCard tier config ──────────────────────────────────
// Self-contained color system for the PNG export card.
// Uses inline styles only (html2canvas requirement).

interface ShareTierConfig {
  label: string;
  accent: string;
  accentDim: string;
  accentBg: string;
  accentBorder: string;
  meterGrad: string;
  topGlow: string;
  brainImage: string;
  tierIndex: number;
}

const SHARE_TIERS: ShareTierConfig[] = [
  {
    label: "NPC",
    accent: "rgba(255,255,255,0.65)",
    accentDim: "rgba(255,255,255,0.25)",
    accentBg: "rgba(255,255,255,0.05)",
    accentBorder: "rgba(255,255,255,0.10)",
    meterGrad: "linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.35))",
    topGlow: "rgba(255,255,255,0.10)",
    brainImage: "/images/brain_1_fin.png",
    tierIndex: 0,
  },
  {
    label: "Safe",
    accent: "#3ab577",
    accentDim: "rgba(58,181,119,0.45)",
    accentBg: "rgba(58,181,119,0.07)",
    accentBorder: "rgba(58,181,119,0.14)",
    meterGrad: "linear-gradient(90deg, rgba(255,255,255,0.08), #3ab577)",
    topGlow: "rgba(58,181,119,0.3)",
    brainImage: "/images/brain_2_fin.png",
    tierIndex: 1,
  },
  {
    label: "Cooked",
    accent: "#c4b840",
    accentDim: "rgba(196,184,64,0.45)",
    accentBg: "rgba(196,184,64,0.07)",
    accentBorder: "rgba(196,184,64,0.14)",
    meterGrad: "linear-gradient(90deg, #3ab577, #c4b840)",
    topGlow: "rgba(196,184,64,0.3)",
    brainImage: "/images/brain_3_fin.png",
    tierIndex: 2,
  },
  {
    label: "Fried",
    accent: "#e0873a",
    accentDim: "rgba(224,135,58,0.45)",
    accentBg: "rgba(224,135,58,0.07)",
    accentBorder: "rgba(224,135,58,0.14)",
    meterGrad: "linear-gradient(90deg, #3ab577, #c4b840, #e0873a)",
    topGlow: "rgba(224,135,58,0.3)",
    brainImage: "/images/brain_4_fin.png",
    tierIndex: 3,
  },
  {
    label: "Rotted",
    accent: "#e24b4a",
    accentDim: "rgba(226,75,74,0.45)",
    accentBg: "rgba(226,75,74,0.07)",
    accentBorder: "rgba(226,75,74,0.14)",
    meterGrad: "linear-gradient(90deg, #3ab577, #c4b840, #e0873a, #e24b4a)",
    topGlow: "rgba(226,75,74,0.3)",
    brainImage: "/images/brain_5_fin.png",
    tierIndex: 4,
  },
];

function getShareTier(score: number): ShareTierConfig {
  if (score <= 20) return SHARE_TIERS[0];
  if (score <= 40) return SHARE_TIERS[1];
  if (score <= 60) return SHARE_TIERS[2];
  if (score <= 80) return SHARE_TIERS[3];
  return SHARE_TIERS[4];
}

const SPACE = "'Space Grotesk', system-ui, sans-serif";
const DM = "'DM Sans', system-ui, sans-serif";

interface ShareableCardProps {
  result: CookedResult;
}

const ShareableCard = forwardRef<HTMLDivElement, ShareableCardProps>(
  ({ result }, ref) => {
    const tier = getShareTier(result.cookedLevel);
    const score = result.cookedLevel;

    return (
      <div
        ref={ref}
        style={{
          width: 360,
          height: 640,
          backgroundColor: "#050505",
          position: "absolute",
          left: "-9999px",
          top: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top accent glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent 5%, ${tier.topGlow} 30%, ${tier.topGlow} 70%, transparent 95%)`,
          }}
        />

        {/* Header: logo + tier pill */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 20px 0",
          }}
        >
          <div
            style={{
              fontFamily: SPACE,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 5,
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Rotted
          </div>
          <span
            style={{
              fontFamily: SPACE,
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase" as const,
              padding: "3px 10px",
              borderRadius: 100,
              background: tier.accentBg,
              color: tier.accent,
              border: `1px solid ${tier.accentBorder}`,
            }}
          >
            {tier.label}
          </span>
        </div>

        {/* Hero: brain image + score */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: "10px 20px 4px",
          }}
        >
          <img
            src={tier.brainImage}
            alt=""
            style={{ width: 96, height: "auto" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                fontFamily: SPACE,
                fontSize: 72,
                fontWeight: 700,
                lineHeight: 0.85,
                letterSpacing: -3,
                color: tier.accent,
              }}
            >
              {score}
            </div>
            <div
              style={{
                fontFamily: SPACE,
                fontSize: 14,
                fontWeight: 500,
                color: "rgba(255,255,255,0.20)",
                marginTop: 2,
                marginLeft: 3,
              }}
            >
              / 100
            </div>
          </div>
        </div>

        {/* Personality type name */}
        <div
          style={{
            fontFamily: SPACE,
            fontSize: 19,
            fontWeight: 700,
            color: "#fff",
            textAlign: "center" as const,
            lineHeight: 1.15,
            padding: "0 20px",
            letterSpacing: -0.3,
          }}
        >
          {result.personalityType}
        </div>

        {/* Most Damning callout */}
        <div
          style={{
            margin: "10px 20px",
            padding: "9px 13px",
            borderLeft: `2px solid ${tier.accentDim}`,
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div
            style={{
              fontFamily: SPACE,
              fontSize: 8,
              fontWeight: 600,
              letterSpacing: 2.5,
              textTransform: "uppercase" as const,
              color: tier.accentDim,
              marginBottom: 4,
            }}
          >
            most damning
          </div>
          <div
            style={{
              fontFamily: DM,
              fontSize: 12,
              fontWeight: 500,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.45,
            }}
          >
            {result.stats.mostDamning}
          </div>
        </div>

        {/* Roast paragraph */}
        <div
          style={{
            fontFamily: DM,
            fontSize: 11,
            fontWeight: 400,
            color: "rgba(255,255,255,0.40)",
            lineHeight: 1.5,
            padding: "0 20px",
          }}
        >
          {result.roastText}
        </div>

        {/* Brain progression scale */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            padding: "10px 20px 2px",
          }}
        >
          {SHARE_TIERS.map((t) => {
            const isActive = t.tierIndex === tier.tierIndex;
            return (
              <div
                key={t.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  width: 48,
                }}
              >
                <img
                  src={t.brainImage}
                  alt=""
                  style={{
                    width: 28,
                    height: "auto",
                    opacity: isActive ? 1 : 0.25,
                  }}
                />
                <span
                  style={{
                    fontFamily: SPACE,
                    fontSize: 6,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: "uppercase" as const,
                    color: isActive
                      ? tier.accentDim
                      : "rgba(255,255,255,0.15)",
                  }}
                >
                  {t.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 8,
            padding: "0 20px",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 10,
              padding: "10px 12px",
            }}
          >
            <div
              style={{
                fontFamily: SPACE,
                fontSize: 8,
                fontWeight: 600,
                color: "rgba(255,255,255,0.30)",
                textTransform: "uppercase" as const,
                letterSpacing: 2,
              }}
            >
              screen time
            </div>
            <div
              style={{
                fontFamily: SPACE,
                fontSize: 16,
                fontWeight: 700,
                color: "rgba(255,255,255,0.90)",
                marginTop: 3,
              }}
            >
              {result.totalScreenTime}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 10,
              padding: "10px 12px",
            }}
          >
            <div
              style={{
                fontFamily: SPACE,
                fontSize: 8,
                fontWeight: 600,
                color: "rgba(255,255,255,0.30)",
                textTransform: "uppercase" as const,
                letterSpacing: 2,
              }}
            >
              top app
            </div>
            <div
              style={{
                fontFamily: SPACE,
                fontSize: 16,
                fontWeight: 700,
                color: tier.accent,
                marginTop: 3,
              }}
            >
              {result.topApp}
            </div>
            <div
              style={{
                fontFamily: DM,
                fontSize: 10,
                color: "rgba(255,255,255,0.30)",
                fontWeight: 500,
                marginTop: 1,
              }}
            >
              {result.topAppTime}
            </div>
          </div>
        </div>

        {/* Rot meter bar */}
        <div style={{ padding: "10px 20px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontFamily: SPACE,
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.22)",
              }}
            >
              NPC
            </span>
            <span
              style={{
                fontFamily: SPACE,
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.22)",
              }}
            >
              Rotted
            </span>
          </div>
          <div
            style={{
              height: 5,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${score}%`,
                borderRadius: 3,
                background: tier.meterGrad,
              }}
            />
          </div>
        </div>

        {/* Footer CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            padding: "10px 20px 14px",
          }}
        >
          <span
            style={{
              fontFamily: DM,
              fontSize: 11,
              fontWeight: 500,
              color: "rgba(255,255,255,0.28)",
            }}
          >
            how rotted are you? →
          </span>
          <span
            style={{
              fontFamily: SPACE,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.3,
              color: tier.accentDim,
            }}
          >
            rotted.app
          </span>
        </div>
      </div>
    );
  }
);

ShareableCard.displayName = "ShareableCard";
export default ShareableCard;
