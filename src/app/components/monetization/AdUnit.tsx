"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { MonetizationConfig } from "@/lib/monetization";

interface AdUnitProps {
  slot: "footer" | "sidebar" | "feed" | "card";
  className?: string;
  testMode?: boolean;
  adClient?: string;
  adSlot?: string;
  format?: "auto" | "fluid" | "rectangle";
}

export function AdUnit({ 
    slot, 
    className = "", 
    testMode = false, 
    adClient = MonetizationConfig.adClient, 
    adSlot,
    format = "auto"
}: AdUnitProps) {
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const adFilled = useRef(false);

  // Auto-map slots using centralised config
  const effectiveAdSlot = adSlot || MonetizationConfig.slots[slot];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !testMode && adClient && effectiveAdSlot && !adFilled.current) {
        try {
            // @ts-expect-error Google Ads global is not typed
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adFilled.current = true;
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }
  }, [isVisible, testMode, adClient, effectiveAdSlot]);

  // Determine size based on slot to prevent CLS
  const getSizeClass = () => {
    switch (slot) {
      case "footer": return "h-[90px] w-full max-w-4xl";
      case "sidebar": return "h-[250px] w-[300px]";
      case "feed": return "h-[100px] w-full";
      case "card": return "w-full h-full aspect-[2/3]";
      default: return "h-[90px] w-full";
    }
  };

  // If no client ID provided and strict mode is off, show placeholder
  const showPlaceholder = testMode || !adClient || !effectiveAdSlot;

  return (
    <div 
      ref={adRef}
      className={`relative overflow-hidden bg-white/5 border border-white/5 rounded-xl ${getSizeClass()} ${className} flex items-center justify-center`}
    >
        {showPlaceholder && (
            <div className="absolute top-2 right-2 text-[10px] text-white/20 uppercase font-bold tracking-widest border border-white/10 px-1 rounded z-10">Sponsored</div>
        )}
        <AnimatePresence>
            {isVisible ? (
                (testMode || !adClient || !effectiveAdSlot) ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/50 border border-white/5 rounded-xl text-center p-4">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium mb-2">
                            Sponsored
                        </span>
                        <p className="text-zinc-500 text-sm">
                            Safe Ad Space ({slot})
                        </p>
                    </div>
                ) : (
                    <div className="w-full h-full">
                        {/* Real AdSense Unit */}
                        <ins className="adsbygoogle block w-full h-full"
                                data-ad-client={adClient}
                                data-ad-slot={effectiveAdSlot}
                                data-ad-format={format}
                                data-full-width-responsive="true">
                        </ins>
                    </div>
                )
            ) : (
                <div className="w-full h-full animate-pulse bg-white/5" />
            )}
        </AnimatePresence>
    </div>
  );
}
