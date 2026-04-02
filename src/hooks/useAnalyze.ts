"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { CookedResult } from "@/types";

type AnalyzeState = "idle" | "analyzing" | "done" | "error";

const LOADING_MESSAGES = [
  "Reading your sins...",
  "Analyzing your poor life choices...",
  "Calculating brain rot levels...",
  "Your phone is testifying against you...",
  "Generating your digital autopsy...",
  "Consulting the screen time gods...",
  "Measuring your doomscroll velocity...",
];

interface UseAnalyzeReturn {
  state: AnalyzeState;
  result: CookedResult | null;
  error: string | null;
  loadingMessage: string;
  analyze: (imageBase64: string) => Promise<void>;
  reset: () => void;
}

export function useAnalyze(): UseAnalyzeReturn {
  const [state, setState] = useState<AnalyzeState>("idle");
  const [result, setResult] = useState<CookedResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Rotate loading messages while analyzing
  useEffect(() => {
    if (state === "analyzing") {
      let idx = 0;
      intervalRef.current = setInterval(() => {
        idx = (idx + 1) % LOADING_MESSAGES.length;
        setLoadingMessage(LOADING_MESSAGES[idx]);
      }, 2500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state]);

  const analyze = useCallback(async (imageBase64: string) => {
    setState("analyzing");
    setError(null);
    setResult(null);
    setLoadingMessage(LOADING_MESSAGES[0]);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      });

      const data = await response.json();

      if (!data.success) {
        setState("error");
        setError(data.error || "Analysis failed");
        return;
      }

      setResult(data.data);
      setState("done");
    } catch (err) {
      setState("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }, []);

  const reset = useCallback(() => {
    setState("idle");
    setResult(null);
    setError(null);
  }, []);

  return { state, result, error, loadingMessage, analyze, reset };
}
