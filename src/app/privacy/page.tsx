import type { Metadata } from "next";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Privacy Policy — Cooked",
  description: "How Cooked handles your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1, padding: "0 24px 48px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: "#5ce030" }}>
            Privacy Policy
          </h1>

          <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "#fff" }}>What We Collect</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
              Cooked processes screenshots you upload to generate comedy content. We do not require an account, and we do not store your screenshots or personal data. Once your result is generated, the image is discarded.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "#fff" }}>How Screenshots Are Processed</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
              Your screenshot is sent to Anthropic&apos;s Claude API for analysis. The image is processed in real-time and is not stored on our servers or by Anthropic after processing.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "#fff" }}>Cookies &amp; Analytics</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
              We use Vercel&apos;s built-in analytics to understand aggregate traffic. No tracking cookies are used.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "#fff" }}>Third-Party Services</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
              Cooked uses Anthropic (Claude API) for AI analysis and Vercel for hosting. Each service has its own privacy policy.
            </p>
          </section>

          <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "#fff" }}>Contact</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
              Questions? Reach out at{" "}
              <a href="mailto:hello@getcooked.app" style={{ color: "#5ce030", textDecoration: "none" }}>hello@getcooked.app</a>
            </p>
          </section>

          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Last updated: April 2026</p>
        </div>
      </main>
    </>
  );
}
