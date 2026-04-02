"use client";

import { useRef, useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScreenshotUploader from "@/components/upload/ScreenshotUploader";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import PersonalityCard from "@/components/results/PersonalityCard";
import ShareableCard from "@/components/results/ShareableCard";
import Button from "@/components/ui/Button";
import { useAnalyze } from "@/hooks/useAnalyze";
import { exportCardAsImage, shareCard, saveCardAsImage } from "@/lib/share";

export default function Home() {
  const { state, result, error, loadingMessage, analyze, reset } =
    useAnalyze();
  const cardRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Auto-scroll to results when analysis completes
  useEffect(() => {
    if (state === "done") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleUpload = (base64: string) => {
    analyze(base64);
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    setIsSharing(true);
    try {
      const blob = await exportCardAsImage(cardRef.current);
      const { fallback } = await shareCard(blob);
      if (fallback) {
        showToast("Image saved! Open Instagram and share from your camera roll.");
      }
    } catch (err) {
      console.error("Share failed:", err);
    } finally {
      setIsSharing(false);
    }
  };

  const handleSave = async () => {
    if (!cardRef.current) return;
    setIsSaving(true);
    try {
      await saveCardAsImage(cardRef.current);
      showToast("Image saved!");
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* IDLE — Upload screen */}
        {state === "idle" && (
          <div className="w-full max-w-md flex flex-col items-center gap-8 text-center">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-cooked-text-primary">
                how cooked are you?
              </h1>
              <p className="text-base text-cooked-text-secondary">
                Upload your screen time screenshot. AI exposes your digital
                sins.
              </p>
            </div>

            <ScreenshotUploader onUpload={handleUpload} />

            <div className="bg-cooked-surface border border-cooked-border rounded-[12px] p-4 w-full">
              <p className="text-xs text-cooked-text-muted leading-relaxed">
                <span className="text-cooked-text-secondary font-medium">
                  How to get your screenshot:
                </span>{" "}
                Settings &rarr; Screen Time &rarr; See All Activity &rarr;
                Screenshot &rarr; Upload here
              </p>
            </div>
          </div>
        )}

        {/* ANALYZING — Loading screen */}
        {state === "analyzing" && (
          <div className="w-full max-w-md flex flex-col items-center gap-8 text-center py-16">
            <LoadingSpinner />
            <p className="text-lg text-cooked-text-secondary animate-pulse">
              {loadingMessage}
            </p>
          </div>
        )}

        {/* DONE — Results */}
        {state === "done" && result && (
          <div
            ref={resultsRef}
            className="w-full max-w-md flex flex-col items-center gap-6"
          >
            <PersonalityCard result={result} />

            <div className="w-full flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 py-4"
                onClick={handleShare}
                disabled={isSharing}
              >
                {isSharing ? "Generating..." : "Share to Stories"}
              </Button>
              <Button
                variant="secondary"
                className="flex-1 py-4"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Image"}
              </Button>
            </div>

            <button
              onClick={reset}
              className="text-sm text-cooked-text-muted hover:text-cooked-text-secondary transition-colors cursor-pointer min-h-[44px] px-4"
            >
              Get Cooked Again
            </button>

            {/* Hidden shareable card for PNG export */}
            <ShareableCard ref={cardRef} result={result} />
          </div>
        )}

        {/* ERROR */}
        {state === "error" && (
          <div className="w-full max-w-md flex flex-col items-center gap-6 text-center py-16">
            <div className="text-5xl">x_x</div>
            <p className="text-lg text-cooked-red">{error}</p>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              <Button onClick={reset}>Try Again</Button>
            </div>
          </div>
        )}
      </main>
      <Footer />

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-4 right-4 z-50 flex justify-center">
          <div className="bg-cooked-surface border border-cooked-border rounded-[12px] px-5 py-3 shadow-lg max-w-sm">
            <p className="text-sm text-cooked-text-primary text-center">
              {toast}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
