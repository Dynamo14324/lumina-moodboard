"use client";

import Script from "next/script";

interface GoogleAdSenseProps {
  publisherId: string;
}

export function GoogleAdSense({ publisherId }: GoogleAdSenseProps) {
  if (!publisherId) return null;

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
      onLoad={() => console.log(`[Lumina Ads] AdSense Script Loaded: ${publisherId}`)}
    />
  );
}
