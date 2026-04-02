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
  primary: "#e89632",
  primaryDark: "#d07820",
  green: "#e89632",
  greenDark: "#d07820",
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
    scoreColor: "#48d2b4",
    pillBg: "rgba(72,210,180,0.08)", pillColor: "rgba(72,210,180,0.75)", pillBorder: "rgba(72,210,180,0.18)",
    damningBorder: "rgba(72,210,180,0.4)", damningLabel: "rgba(72,210,180,0.5)",
    accentColor: "#48d2b4",
    meterGrad: "linear-gradient(90deg, #48d2b4, rgba(72,210,180,0.4))",
    topGlow: "linear-gradient(90deg, transparent, rgba(72,210,180,0.15), transparent)",
    footerDomain: "rgba(72,210,180,0.6)",
  },
  {
    key: "medium", label: "Medium", min: 21, max: 40,
    brainImage: "brain_2_fin.png",
    scoreColor: "#e6c850",
    pillBg: "rgba(230,200,80,0.08)", pillColor: "rgba(230,200,80,0.75)", pillBorder: "rgba(230,200,80,0.18)",
    damningBorder: "rgba(230,200,80,0.4)", damningLabel: "rgba(230,200,80,0.5)",
    accentColor: "#e6c850",
    meterGrad: "linear-gradient(90deg, #48d2b4, #e6c850)",
    topGlow: "linear-gradient(90deg, transparent, rgba(230,200,80,0.15), transparent)",
    footerDomain: "rgba(230,200,80,0.6)",
  },
  {
    key: "wellDone", label: "Well Done", min: 41, max: 60,
    brainImage: "brain_3_fin.png",
    scoreColor: "#e89632",
    pillBg: "rgba(232,150,50,0.08)", pillColor: "rgba(232,150,50,0.75)", pillBorder: "rgba(232,150,50,0.18)",
    damningBorder: "rgba(232,150,50,0.4)", damningLabel: "rgba(232,150,50,0.5)",
    accentColor: "#e89632",
    meterGrad: "linear-gradient(90deg, #e6c850, #e89632)",
    topGlow: "linear-gradient(90deg, transparent, rgba(232,150,50,0.2), transparent)",
    footerDomain: "rgba(232,150,50,0.6)",
  },
  {
    key: "burnt", label: "Burnt", min: 61, max: 80,
    brainImage: "brain_4_fin.png",
    scoreColor: "#dc462d",
    pillBg: "rgba(220,70,45,0.08)", pillColor: "rgba(220,70,45,0.75)", pillBorder: "rgba(220,70,45,0.18)",
    damningBorder: "rgba(220,70,45,0.5)", damningLabel: "rgba(220,70,45,0.5)",
    accentColor: "#dc462d",
    meterGrad: "linear-gradient(90deg, #e89632, #dc462d)",
    topGlow: "linear-gradient(90deg, transparent, rgba(220,70,45,0.2), transparent)",
    footerDomain: "rgba(220,70,45,0.6)",
  },
  {
    key: "cooked", label: "Cooked", min: 81, max: 100,
    brainImage: "brain_5_fin.png",
    scoreColor: "#be1e28",
    pillBg: "rgba(190,30,40,0.1)", pillColor: "rgba(190,30,40,0.8)", pillBorder: "rgba(190,30,40,0.22)",
    damningBorder: "#be1e28", damningLabel: "rgba(190,30,40,0.6)",
    accentColor: "#be1e28",
    meterGrad: "linear-gradient(90deg, #dc462d, #be1e28)",
    topGlow: "linear-gradient(90deg, transparent, rgba(190,30,40,0.25), transparent)",
    footerDomain: "rgba(190,30,40,0.7)",
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
