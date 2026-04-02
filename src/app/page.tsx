"use client";

import { useState, useRef, useEffect } from "react";
import { useAnalyze } from "@/hooks/useAnalyze";
import ScreenshotUploader from "@/components/upload/ScreenshotUploader";
import PersonalityCard from "@/components/results/PersonalityCard";
import ShareableCard from "@/components/results/ShareableCard";
import { FONTS, COLORS, LOADING_MESSAGES } from "@/constants";
import { exportCardAsImage, shareCard, saveCardAsImage } from "@/lib/share";

export default function Home() {
  const { state, result, error, analyze, reset } = useAnalyze();
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [scanCount, setScanCount] = useState(0);

  // Social proof counter
  useEffect(() => {
    const base = 14847;
    const variation = Math.floor(Math.random() * 200);
    const launchDate = new Date("2026-04-01");
    const daysSinceLaunch = Math.max(0, Math.floor((Date.now() - launchDate.getTime()) / (1000 * 60 * 60 * 24)));
    const growth = daysSinceLaunch * 150;
    setScanCount(base + variation + growth);
  }, []);

  // Rotate loading messages
  useEffect(() => {
    if (state !== "analyzing") return;
    setLoadingMsgIdx(0);
    const interval = setInterval(() => {
      setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [state]);

  // Auto-scroll to top on results
  useEffect(() => {
    if (state === "done") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  async function handleShare() {
    if (!shareCardRef.current) return;
    setIsSharing(true);
    try {
      const blob = await exportCardAsImage(shareCardRef.current);
      const { fallback } = await shareCard(blob);
      if (fallback) {
        showToast("Image saved! Open Instagram and share from your camera roll.");
      }
    } catch (e) {
      console.error("Share failed:", e);
    } finally {
      setIsSharing(false);
    }
  }

  async function handleSave() {
    if (!shareCardRef.current) return;
    setIsSaving(true);
    try {
      await saveCardAsImage(shareCardRef.current);
      showToast("Image saved!");
    } catch (e) {
      console.error("Save failed:", e);
    } finally {
      setIsSaving(false);
    }
  }

  // ── IDLE ──
  if (state === "idle") {
    return (
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px", minHeight: "100vh", fontFamily: FONTS.body }}>
        <div style={{ fontFamily: FONTS.heading, fontSize: 20, fontWeight: 700, letterSpacing: 8, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 48 }}>Rotted</div>
        <h1 style={{ fontFamily: FONTS.heading, fontSize: 36, fontWeight: 700, color: "#fff", textAlign: "center", lineHeight: 1.15, letterSpacing: -1, marginBottom: 12 }}>how rotted are you?</h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.35)", textAlign: "center", maxWidth: 320, lineHeight: 1.5, marginBottom: 24 }}>Your screen time is about to snitch on you.</p>

        {/* 3-step visual */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 32, width: "100%", maxWidth: 340 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            </div>
            <span style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>screenshot</span>
          </div>
          <div style={{ width: 32, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <svg width="24" height="8" viewBox="0 0 24 8" fill="none"><path d="M0 4h20M16 1l4 3-4 3" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <span style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>upload</span>
          </div>
          <div style={{ width: 32, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <svg width="24" height="8" viewBox="0 0 24 8" fill="none"><path d="M0 4h20M16 1l4 3-4 3" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M7 13L5 22l7-3 7 3-2-9"/></svg>
            </div>
            <span style={{ fontFamily: FONTS.heading, fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>get rotted</span>
          </div>
        </div>

        <div style={{ width: "100%", maxWidth: 340 }}>
          <ScreenshotUploader onUpload={analyze} />
        </div>

        {/* Social proof counter */}
        <div style={{ marginTop: 20, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: "#48d2b4", animation: "pulse 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: FONTS.heading, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.2)", letterSpacing: 0.5 }}>
            {scanCount.toLocaleString()} brains scanned
          </span>
        </div>

        <div style={{ marginTop: 8, padding: "14px 18px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 14, maxWidth: 340, width: "100%" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", lineHeight: 1.6, textAlign: "center" }}>
Settings → Screen Time → See All Activity → Screenshot → Upload it here and pray
          </p>
        </div>
        <footer style={{ marginTop: "auto", paddingTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="/" style={{ fontSize: 12, color: "rgba(255,255,255,0.15)", textDecoration: "none" }}>Home</a>
            <a href="/privacy" style={{ fontSize: 12, color: "rgba(255,255,255,0.15)", textDecoration: "none" }}>Privacy</a>
          </div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.1)" }}>© 2026 rotted.app</span>
        </footer>
      </main>
    );
  }

  // ── LOADING ──
  if (state === "analyzing") {
    return (
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 40, fontFamily: FONTS.body }}>
        <div style={{ width: 48, height: 48, border: "2px solid rgba(255,255,255,0.06)", borderTop: `2px solid ${COLORS.green}`, borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: 28 }} />
        <p style={{ fontFamily: FONTS.heading, fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.6)", textAlign: "center", letterSpacing: 0.5 }}>{LOADING_MESSAGES[loadingMsgIdx]}</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }`}</style>
      </main>
    );
  }

  // ── ERROR ──
  if (state === "error") {
    return (
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 40, fontFamily: FONTS.body }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>x_x</div>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", textAlign: "center", marginBottom: 24, maxWidth: 300, lineHeight: 1.5 }}>{error || "it broke. the rot was too powerful."}</p>
        <button onClick={reset} style={{
          padding: "14px 32px", borderRadius: 14,
          background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`,
          border: "none", cursor: "pointer",
          fontFamily: FONTS.heading, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#050505",
        }}>Try Again</button>
      </main>
    );
  }

  // ── RESULTS ──
  if (state === "done" && result) {
    return (
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px 60px", minHeight: "100vh", fontFamily: FONTS.body }}>
        <div style={{ fontFamily: FONTS.heading, fontSize: 16, fontWeight: 700, letterSpacing: 6, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 24 }}>Rotted</div>
        <div style={{ fontFamily: FONTS.heading, fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 8 }}>the diagnosis is in</div>

        <PersonalityCard result={result} />
        <ShareableCard ref={shareCardRef} result={result} />

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24, width: "100%", maxWidth: 340 }}>
          <button onClick={handleShare} disabled={isSharing} style={{
            width: "100%", padding: "16px 0", borderRadius: 14,
            background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`,
            border: "none", cursor: "pointer",
            fontFamily: FONTS.heading, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#050505",
            opacity: isSharing ? 0.6 : 1,
          }}>{isSharing ? "Generating..." : "Post the L"}</button>
          <button onClick={handleSave} disabled={isSaving} style={{
            width: "100%", padding: "14px 0", borderRadius: 14,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
            cursor: "pointer",
            fontFamily: FONTS.heading, fontSize: 14, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
            opacity: isSaving ? 0.6 : 1,
          }}>{isSaving ? "Saving..." : "Save the Evidence"}</button>
        </div>

        <button onClick={reset} style={{ marginTop: 20, background: "none", border: "none", cursor: "pointer", fontFamily: FONTS.heading, fontSize: 13, fontWeight: 600, letterSpacing: 1, color: "rgba(255,255,255,0.2)", padding: "12px 24px" }}>← run it back</button>

        <footer style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="/" style={{ fontSize: 12, color: "rgba(255,255,255,0.15)", textDecoration: "none" }}>Home</a>
            <a href="/privacy" style={{ fontSize: 12, color: "rgba(255,255,255,0.15)", textDecoration: "none" }}>Privacy</a>
          </div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.1)" }}>© 2026 rotted.app</span>
        </footer>

        {/* Toast */}
        {toast && (
          <div style={{ position: "fixed", bottom: 24, left: 16, right: 16, zIndex: 50, display: "flex", justifyContent: "center" }}>
            <div style={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 20px", maxWidth: 340 }}>
              <p style={{ fontSize: 14, color: "#fff", textAlign: "center" }}>{toast}</p>
            </div>
          </div>
        )}
      </main>
    );
  }

  return null;
}
