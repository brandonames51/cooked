import { forwardRef } from "react";
import type { CookedResult } from "@/types";
import { COOKED_LEVELS } from "@/constants";

interface ShareableCardProps {
  result: CookedResult;
}

function getLevelColor(score: number): string {
  const level = Object.values(COOKED_LEVELS).find(
    (l) => score >= l.min && score <= l.max
  );
  return level?.color ?? "#EF9F27";
}

function getLevelLabel(score: number): string {
  const level = Object.values(COOKED_LEVELS).find(
    (l) => score >= l.min && score <= l.max
  );
  return level?.label ?? "Cooked";
}

const ShareableCard = forwardRef<HTMLDivElement, ShareableCardProps>(
  ({ result }, ref) => {
    const levelColor = getLevelColor(result.cookedLevel);
    const levelLabel = getLevelLabel(result.cookedLevel);
    const typeLength = result.personalityType.length;
    const typeFontSize = typeLength > 30 ? 20 : typeLength > 22 ? 22 : 26;

    return (
      <div
        ref={ref}
        style={{
          width: 540,
          height: 960,
          backgroundColor: "#0F0F0F",
          padding: "28px 28px 24px",
          fontFamily: "'Inter', system-ui, sans-serif",
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          left: "-9999px",
          top: 0,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Clock icon as SVG */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EF9F27"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span
              style={{
                color: "#EF9F27",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase" as const,
              }}
            >
              COOKED
            </span>
          </div>
          <span style={{ color: "#666666", fontSize: 11 }}>getcooked.app</span>
        </div>

        {/* Diagnosis label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <div
            style={{ flex: 1, height: 1, backgroundColor: "#333333" }}
          />
          <span
            style={{
              color: "#AAAAAA",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase" as const,
            }}
          >
            YOUR DIAGNOSIS
          </span>
          <div
            style={{ flex: 1, height: 1, backgroundColor: "#333333" }}
          />
        </div>

        {/* Personality type */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: typeFontSize,
            fontWeight: 700,
            lineHeight: 1.2,
            textAlign: "center" as const,
            marginBottom: 18,
            padding: "0 8px",
          }}
        >
          {result.personalityType}
        </div>

        {/* Roast text card */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              color: "#CCCCCC",
              fontSize: 13,
              lineHeight: 1.55,
            }}
          >
            {result.roastText}
          </div>
        </div>

        {/* Three stat boxes */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 16,
          }}
        >
          {/* Total Screen Time */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#1A1A1A",
              borderRadius: 10,
              padding: "10px 12px",
            }}
          >
            <div
              style={{
                color: "#888888",
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase" as const,
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              Total
            </div>
            <div
              style={{
                color: "#EF9F27",
                fontSize: 19,
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {result.totalScreenTime}
            </div>
          </div>

          {/* Cooked Level */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#1A1A1A",
              borderRadius: 10,
              padding: "10px 12px",
            }}
          >
            <div
              style={{
                color: "#888888",
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase" as const,
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              Cooked
            </div>
            <div
              style={{
                color: levelColor,
                fontSize: 19,
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {result.cookedLevel}/100
            </div>
          </div>

          {/* Top App */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#1A1A1A",
              borderRadius: 10,
              padding: "10px 12px",
            }}
          >
            <div
              style={{
                color: "#888888",
                fontSize: 10,
                fontWeight: 500,
                textTransform: "uppercase" as const,
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              Top App
            </div>
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 1,
              }}
            >
              {result.topApp}
            </div>
            <div style={{ color: "#888888", fontSize: 10 }}>
              {result.topAppTime}
            </div>
          </div>
        </div>

        {/* Cooked meter */}
        <div style={{ marginBottom: 16, padding: "0 2px" }}>
          <div
            style={{
              height: 12,
              borderRadius: 6,
              backgroundColor: "#1A1A1A",
              overflow: "hidden",
              position: "relative" as const,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${result.cookedLevel}%`,
                borderRadius: 6,
                background:
                  result.cookedLevel <= 30
                    ? "#97C459"
                    : result.cookedLevel <= 60
                      ? "linear-gradient(90deg, #97C459, #EF9F27)"
                      : result.cookedLevel <= 80
                        ? "linear-gradient(90deg, #97C459, #EF9F27, #D85A30)"
                        : "linear-gradient(90deg, #97C459, #EF9F27, #D85A30, #E24B4A)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <span style={{ color: "#888888", fontSize: 10 }}>raw</span>
            <span style={{ color: "#888888", fontSize: 10 }}>well done</span>
            <span style={{ color: "#888888", fontSize: 10 }}>burnt</span>
          </div>
        </div>

        {/* Most damning stat */}
        <div
          style={{
            backgroundColor: "#1E1410",
            borderRadius: 10,
            padding: "12px 14px",
            borderLeft: "3px solid #EF9F27",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              color: "#888888",
              fontSize: 10,
              fontWeight: 500,
              textTransform: "uppercase" as const,
              letterSpacing: 0.5,
              marginBottom: 4,
            }}
          >
            Most damning
          </div>
          <div
            style={{
              color: "#EF9F27",
              fontSize: 13,
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            {result.stats.mostDamning}
          </div>
        </div>

        {/* Footer CTA */}
        <div
          style={{
            borderTop: "1px solid #333333",
            paddingTop: 16,
            textAlign: "center" as const,
          }}
        >
          <div
            style={{
              color: "#EF9F27",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            how cooked are you?
          </div>
          <div style={{ color: "#666666", fontSize: 12 }}>getcooked.app</div>
        </div>
      </div>
    );
  }
);

ShareableCard.displayName = "ShareableCard";
export default ShareableCard;
