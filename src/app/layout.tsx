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
  title: "Lumina | AI-Powered Cinematic Discovery",
  description: "Stop searching. Start feeling. Discover movies based on your emotional state with Lumina's AI-powered mood selector.",
  keywords: ["movies", "mood", "ai", "discovery", "cinema", "recommendation"],
  authors: [{ name: "Architect-Zero" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
