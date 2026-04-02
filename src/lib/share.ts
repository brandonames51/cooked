import html2canvas from "html2canvas";

/**
 * Export a DOM element as a high-quality PNG blob.
 * Renders at 2x scale for retina quality (540x960 -> 1080x1920).
 */
export async function exportCardAsImage(element: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#050505",
    useCORS: true,
    logging: false,
    width: 540,
    height: 960,
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to create image"));
      },
      "image/png",
      1.0
    );
  });
}

/**
 * Check if the native Web Share API with file support is available.
 * Requires HTTPS (secure context) and browser support.
 */
function canNativeShareFiles(): boolean {
  if (!window.isSecureContext) return false;
  if (!navigator.share || !navigator.canShare) return false;
  const testFile = new File(["test"], "test.png", { type: "image/png" });
  return navigator.canShare({ files: [testFile] });
}

/**
 * Share the card image using Web Share API (HTTPS) or save with guidance (HTTP fallback).
 */
export async function shareCard(blob: Blob): Promise<{ fallback: boolean }> {
  const file = new File([blob], "rotted.png", { type: "image/png" });

  if (canNativeShareFiles()) {
    try {
      await navigator.share({
        title: "i'm cooked lol",
        text: "how rotted are you? \u{1F9E0} rotted.app",
        files: [file],
      });
      return { fallback: false };
    } catch (err) {
      if ((err as Error).name === "AbortError") return { fallback: false };
    }
  }

  downloadImage(blob);
  return { fallback: true };
}

/**
 * Download the image as a file.
 */
export function downloadImage(blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "rotted.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Save image only (no share sheet, just download).
 */
export async function saveCardAsImage(element: HTMLElement): Promise<void> {
  const blob = await exportCardAsImage(element);
  downloadImage(blob);
}
