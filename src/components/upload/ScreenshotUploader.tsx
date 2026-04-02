"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";

interface ScreenshotUploaderProps {
  onUpload: (dataUrl: string) => void;
  isLoading?: boolean;
}

export default function ScreenshotUploader({
  onUpload,
  isLoading = false,
}: ScreenshotUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  if (preview) {
    return (
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div style={{
          width: "100%",
          borderRadius: "12px",
          border: "2px solid #333",
          overflow: "hidden",
          backgroundColor: "#1A1A1A",
        }}>
          <img
            src={preview}
            alt="Screenshot preview"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
        <div style={{ display: "flex", gap: "12px", width: "100%" }}>
          <Button variant="secondary" className="flex-1" onClick={handleClear}>
            Clear
          </Button>
          <Button
            className="flex-1"
            onClick={() => onUpload(preview)}
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Get Cooked"}
          </Button>
        </div>
        <button
          onClick={handleClear}
          style={{
            background: "none",
            border: "none",
            color: "#666",
            fontSize: "13px",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          Choose different image
        </button>
      </div>
    );
  }

  return (
    <label style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      minHeight: "300px",
      border: "2px dashed #333",
      borderRadius: "12px",
      cursor: "pointer",
      padding: "40px 20px",
      textAlign: "center",
      backgroundColor: "#1A1A1A",
    }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px", pointerEvents: "none" }}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      <p style={{ color: "#AAA", fontSize: "16px", margin: "0 0 8px", pointerEvents: "none" }}>
        Tap to upload your screenshot
      </p>
      <p style={{ color: "#666", fontSize: "14px", margin: 0, pointerEvents: "none" }}>
        PNG, JPG, or WEBP
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      />
    </label>
  );
}
