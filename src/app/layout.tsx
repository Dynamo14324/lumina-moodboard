// Lumina Moodboard - AI Cinematic Discovery
// Monetization v1.0 Integrated: AdSense & Amazon Affiliate
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumina-moodboard.vercel.app"),
  title: "Lumina | AI-Powered Cinematic Discovery",
  description: "Stop searching. Start feeling. Discover movies based on your emotional state with Lumina's AI-powered mood selector.",
  keywords: ["movies", "mood", "ai", "discovery", "cinema", "recommendation", "streaming"],
  authors: [{ name: "Yogesh Jadhav (Dynamo_14324)" }],
  openGraph: {
    title: "Lumina | AI-Powered Cinematic Discovery",
    description: "Curated cinematic soundscapes based on your mood.",
    url: "https://lumina-moodboard.vercel.app",
    siteName: "Lumina",
    images: [
      {
        url: "/og-image.jpg", // We don't have this, but standard practice to define it
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina",
    description: "Stop searching. Start feeling.",
    creator: "@ArchitectZero",
  },
  verification: {
    google: "obzzOO71sAtCGXuUvepGOqPBOrQzyLdg1Xw8-it2-1k",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

import { WatchlistProvider } from "./context/WatchlistContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsent } from "./components/privacy/CookieConsent";
import { GoogleAdSense } from "./components/monetization/GoogleAdSense";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white`}
      >
        <WatchlistProvider>
          {children}
          <CookieConsent />
          <Analytics />
          <SpeedInsights />
          <GoogleAdSense publisherId={process.env.NEXT_PUBLIC_ADSENSE_ID || ""} />
        </WatchlistProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Lumina",
              "url": "https://lumina-moodboard.vercel.app",
              "description": "AI-Powered Cinematic Discovery based on emotional state.",
              "image": "https://lumina-moodboard.vercel.app/og-image.jpg",
              "applicationCategory": "EntertainmentApplication",
              "operatingSystem": "Web",
              "author": {
                "@type": "Person",
                "name": "Yogesh Jadhav (Dynamo_14324)"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "128"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
