import type { CookedResult } from "@/types";
import { COOKED_LEVELS } from "@/constants";

export default function PersonalityCard({ result }: { result: CookedResult }) {
  const level = Object.values(COOKED_LEVELS).find(
    (l) => result.cookedLevel >= l.min && result.cookedLevel <= l.max
  );

  return (
    <div className="w-full max-w-md mx-auto bg-cooked-surface border border-cooked-border rounded-[12px] p-6 flex flex-col gap-5">
      {/* Cooked level badge */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
          style={{
            backgroundColor: `${level?.color ?? "#EF9F27"}20`,
            color: level?.color ?? "#EF9F27",
          }}
        >
          {level?.label ?? "Cooked"}
        </span>
        <span
          className="font-mono text-2xl font-bold"
          style={{ color: level?.color }}
        >
          {result.cookedLevel}/100
        </span>
      </div>

      {/* Personality type */}
      <h2 className="text-2xl font-bold text-cooked-text-primary">
        {result.personalityType}
      </h2>

      {/* Roast text */}
      <p className="text-sm text-cooked-text-secondary leading-relaxed">
        {result.roastText}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-cooked-surface-light rounded-[8px] p-3">
          <p className="text-xs text-cooked-text-muted">Total Screen Time</p>
          <p className="font-mono text-lg font-semibold text-cooked-text-primary">
            {result.totalScreenTime}
          </p>
        </div>
        <div className="bg-cooked-surface-light rounded-[8px] p-3">
          <p className="text-xs text-cooked-text-muted">Top App</p>
          <p className="font-mono text-lg font-semibold text-cooked-amber">
            {result.topApp}
          </p>
          <p className="text-xs text-cooked-text-muted">{result.topAppTime}</p>
        </div>
      </div>

      {/* Cooked meter */}
      <div>
        <div className="h-2 rounded-full bg-cooked-surface-light overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${result.cookedLevel}%`,
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
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-cooked-text-muted">raw</span>
          <span className="text-[10px] text-cooked-text-muted">well done</span>
          <span className="text-[10px] text-cooked-text-muted">burnt</span>
        </div>
      </div>

      {/* Most damning stat */}
      <div className="bg-cooked-surface-light rounded-[8px] p-3 border-l-[3px] border-cooked-amber">
        <p className="text-xs text-cooked-text-muted">Most Damning</p>
        <p className="text-sm text-cooked-amber font-medium">
          {result.stats.mostDamning}
        </p>
      </div>
    </div>
  );
}
