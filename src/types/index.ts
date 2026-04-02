export interface ScreenTimeApp {
  name: string;
  duration: string; // e.g. "4h 12m"
  durationMinutes: number; // total minutes for calculations
}

export interface ScreenTimeData {
  apps: ScreenTimeApp[];
  totalScreenTime: string;
  totalMinutes: number;
  date: string; // The date from the screenshot
}

export interface CookedResult {
  personalityType: string;
  roastText: string;
  cookedLevel: number; // 0-100
  totalScreenTime: string;
  topApp: string;
  topAppTime: string;
  stats: {
    appsAnalyzed: number;
    mostDamning: string; // The most roast-worthy stat
  };
}

export interface AnalyzeRequest {
  image: string; // base64 encoded
}

export interface AnalyzeResponse {
  success: boolean;
  data?: CookedResult;
  error?: string;
}
