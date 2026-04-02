import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  title: "Rotted — how rotted are you?",
  description:
    "Upload your screen time screenshot. AI exposes your digital sins. Share your results.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "Rotted — how rotted are you?",
    description:
      "Upload your screen time screenshot. Get roasted by AI. Share your results.",
    url: "https://rotted.app",
    siteName: "Rotted",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Rotted — how rotted are you?",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotted — how rotted are you?",
    description:
      "Upload your screen time screenshot. Get roasted by AI.",
    images: ["/images/og-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
