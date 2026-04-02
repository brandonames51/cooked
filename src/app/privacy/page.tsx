import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Cooked",
  description: "How Cooked handles your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          <h1 className="text-3xl font-bold text-cooked-amber">
            Privacy Policy
          </h1>

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-cooked-text-primary">
              What We Collect
            </h2>
            <p className="text-sm text-cooked-text-secondary leading-relaxed">
              Cooked processes screenshots you upload to generate comedy
              content. We do not require an account, and we do not store your
              screenshots or personal data. Once your result is generated, the
              image is discarded.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-cooked-text-primary">
              How Screenshots Are Processed
            </h2>
            <p className="text-sm text-cooked-text-secondary leading-relaxed">
              Your screenshot is sent to Anthropic&apos;s Claude API for
              analysis. The image is processed in real-time and is not stored on
              our servers or by Anthropic after processing.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-cooked-text-primary">
              Cookies &amp; Analytics
            </h2>
            <p className="text-sm text-cooked-text-secondary leading-relaxed">
              We use Vercel&apos;s built-in analytics to understand aggregate
              traffic. No tracking cookies are used.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-cooked-text-primary">
              Third-Party Services
            </h2>
            <p className="text-sm text-cooked-text-secondary leading-relaxed">
              Cooked uses Anthropic (Claude API) for AI analysis and Vercel for
              hosting. Each service has its own privacy policy.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-cooked-text-primary">
              Contact
            </h2>
            <p className="text-sm text-cooked-text-secondary leading-relaxed">
              Questions? Reach out at{" "}
              <a
                href="mailto:hello@getcooked.app"
                className="text-cooked-amber hover:underline"
              >
                hello@getcooked.app
              </a>
            </p>
          </section>

          <p className="text-xs text-cooked-text-muted">
            Last updated: April 2026
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
