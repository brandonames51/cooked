"use client";

import { useState, useRef, useCallback } from "react";
import { FONTS, COLORS } from "@/constants";

interface ScreenshotUploaderProps {
  onUpload: (dataUrl: string) => void;
  isLoading?: boolean;
}

export default function ScreenshotUploader({
  onUpload,
  isLoading = false,
}: ScreenshotUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleGetCooked = () => {
    if (preview) onUpload(preview);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
        style={{
          width: "100%",
          minHeight: preview ? "auto" : 220,
          border: `1px dashed ${dragOver ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 20,
          background: dragOver ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          cursor: "pointer", padding: 24,
          transition: "all 0.2s ease",
          position: "relative",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {preview ? (
          <div style={{ width: "100%", position: "relative" }}>
            <img src={preview} alt="Screenshot preview" style={{ width: "100%", borderRadius: 12, display: "block" }} />
            <button onClick={handleClear} style={{
              position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: 14,
              background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)", fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
            }}>✕</button>
          </div>
        ) : (
          <>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <div style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Tap to upload your screenshot</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.15)" }}>PNG, JPG, or WEBP</div>
          </>
        )}
      </div>

      {preview && (
        <button onClick={handleGetCooked} disabled={isLoading} style={{
          width: "100%", padding: "16px 0", borderRadius: 14,
          background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`,
          border: "none", cursor: "pointer",
          fontFamily: FONTS.heading, fontSize: 16, fontWeight: 700, letterSpacing: 2,
          textTransform: "uppercase" as const, color: COLORS.bg,
          opacity: isLoading ? 0.6 : 1,
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}>
          {isLoading ? "Analyzing..." : "Get Cooked"}
        </button>
      )}
    </div>
  );
}
