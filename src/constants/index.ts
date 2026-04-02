export const BRAND = {
  name: "Cooked",
  tagline: "how cooked are you?",
  url: "getcooked.app",
  description:
    "Upload your screen time screenshot. AI exposes your digital sins.",
};

export const COLORS = {
  bg: "#0F0F0F",
  surface: "#1A1A1A",
  surfaceLighter: "#252525",
  border: "#333333",
  amber: "#EF9F27",
  amberLight: "#FAC775",
  amberDark: "#BA7517",
  red: "#E24B4A",
  redLight: "#F09595",
  textPrimary: "#FFFFFF",
  textSecondary: "#AAAAAA",
  textMuted: "#666666",
};

export const COOKED_LEVELS = {
  RAW: { min: 0, max: 20, label: "Raw", color: "#97C459" },
  MEDIUM_RARE: { min: 21, max: 40, label: "Medium rare", color: "#EF9F27" },
  MEDIUM: { min: 41, max: 60, label: "Medium", color: "#FAC775" },
  WELL_DONE: { min: 61, max: 80, label: "Well done", color: "#D85A30" },
  BURNT: { min: 81, max: 100, label: "Burnt to a crisp", color: "#E24B4A" },
} as const;
