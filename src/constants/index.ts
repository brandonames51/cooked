export const BRAND = {
  name: "Cooked",
  tagline: "how cooked are you?",
  url: "getcooked.app",
  description: "Upload your screen time screenshot. AI exposes your digital sins.",
};

export const FONTS = {
  heading: "'Space Grotesk', sans-serif" as const,
  body: "'DM Sans', -apple-system, sans-serif" as const,
};

export const COLORS = {
  bg: "#050505",
  surface: "#0d0d0d",
  surfaceLighter: "rgba(255,255,255,0.025)",
  border: "rgba(255,255,255,0.06)",
  borderSubtle: "rgba(255,255,255,0.04)",
  green: "#5ce030",
  greenDark: "#40b020",
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.7)",
  textMuted: "rgba(255,255,255,0.3)",
  textDim: "rgba(255,255,255,0.15)",
  textGhost: "rgba(255,255,255,0.1)",
};

export interface TierConfig {
  key: string;
  label: string;
  min: number;
  max: number;
  brainImage: string;
  scoreColor: string;
  pillBg: string;
  pillColor: string;
  pillBorder: string;
  damningBorder: string;
  damningLabel: string;
  accentColor: string;
  meterGrad: string;
  topGlow: string;
  footerDomain: string;
}

export const TIERS: TierConfig[] = [
  {
    key: "raw", label: "Raw", min: 0, max: 20,
    brainImage: "brain_1_fin.png",
    scoreColor: "rgba(255,255,255,0.85)",
    pillBg: "rgba(255,255,255,0.05)", pillColor: "rgba(255,255,255,0.4)", pillBorder: "rgba(255,255,255,0.08)",
    damningBorder: "rgba(255,255,255,0.2)", damningLabel: "rgba(255,255,255,0.3)",
    accentColor: "rgba(255,255,255,0.85)",
    meterGrad: "linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.3))",
    topGlow: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
    footerDomain: "rgba(255,255,255,0.5)",
  },
  {
    key: "medium", label: "Medium", min: 21, max: 40,
    brainImage: "brain_2_fin.png",
    scoreColor: "rgba(255,255,255,0.85)",
    pillBg: "rgba(255,255,255,0.05)", pillColor: "rgba(255,255,255,0.4)", pillBorder: "rgba(255,255,255,0.08)",
    damningBorder: "rgba(255,255,255,0.2)", damningLabel: "rgba(255,255,255,0.3)",
    accentColor: "rgba(255,255,255,0.85)",
    meterGrad: "linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.3))",
    topGlow: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
    footerDomain: "rgba(255,255,255,0.5)",
  },
  {
    key: "wellDone", label: "Well Done", min: 41, max: 60,
    brainImage: "brain_3_fin.png",
    scoreColor: "rgba(200,190,80,0.9)",
    pillBg: "rgba(200,190,80,0.08)", pillColor: "rgba(200,190,80,0.7)", pillBorder: "rgba(200,190,80,0.12)",
    damningBorder: "rgba(200,190,80,0.5)", damningLabel: "rgba(200,190,80,0.5)",
    accentColor: "rgba(200,190,80,0.9)",
    meterGrad: "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(200,190,80,0.4), rgba(200,190,80,0.7))",
    topGlow: "linear-gradient(90deg, transparent, rgba(200,190,80,0.2), transparent)",
    footerDomain: "rgba(200,190,80,0.6)",
  },
  {
    key: "burnt", label: "Burnt", min: 61, max: 80,
    brainImage: "brain_4_fin.png",
    scoreColor: "#5ce030",
    pillBg: "rgba(80,200,40,0.08)", pillColor: "rgba(120,230,60,0.7)", pillBorder: "rgba(80,200,40,0.12)",
    damningBorder: "#5ce030", damningLabel: "rgba(100,230,50,0.5)",
    accentColor: "#5ce030",
    meterGrad: "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(120,230,60,0.5), #5ce030)",
    topGlow: "linear-gradient(90deg, transparent, rgba(100,220,50,0.3), transparent)",
    footerDomain: "rgba(100,230,50,0.6)",
  },
  {
    key: "cooked", label: "Cooked", min: 81, max: 100,
    brainImage: "brain_5_fin.png",
    scoreColor: "#5ce030",
    pillBg: "rgba(80,200,40,0.08)", pillColor: "rgba(120,230,60,0.7)", pillBorder: "rgba(80,200,40,0.12)",
    damningBorder: "#5ce030", damningLabel: "rgba(100,230,50,0.5)",
    accentColor: "#5ce030",
    meterGrad: "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(120,230,60,0.5), #5ce030)",
    topGlow: "linear-gradient(90deg, transparent, rgba(100,220,50,0.3), transparent)",
    footerDomain: "rgba(100,230,50,0.6)",
  },
];

export function getTier(score: number): TierConfig {
  return TIERS.find((t) => score >= t.min && score <= t.max) || TIERS[0];
}

export const COOKED_LEVELS = {
  RAW: { min: 0, max: 20, label: "Raw", color: "#97C459" },
  MEDIUM_RARE: { min: 21, max: 40, label: "Medium", color: "#EF9F27" },
  MEDIUM: { min: 41, max: 60, label: "Well Done", color: "#FAC775" },
  WELL_DONE: { min: 61, max: 80, label: "Burnt", color: "#D85A30" },
  BURNT: { min: 81, max: 100, label: "Cooked", color: "#E24B4A" },
};

export const LOADING_MESSAGES = [
  "Reading your sins...",
  "Analyzing your poor life choices...",
  "Calculating brainrot levels...",
  "Your phone is testifying against you...",
  "Generating your digital autopsy...",
];
