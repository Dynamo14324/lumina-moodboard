"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    testMode = true, // Default to true until configured
    adClient = process.env.NEXT_PUBLIC_ADSENSE_ID, // Use env variable
    adSlot, // Specific slot ID from AdSense dashboard
    format = "auto"
}: AdUnitProps) {
  const [isVisible, setIsVisible] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const [adFilled, setAdFilled] = useState(false);

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
    if (isVisible && !testMode && adClient && adSlot && !adFilled) {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setAdFilled(true);
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }
  }, [isVisible, testMode, adClient, adSlot, adFilled]);

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
  const showPlaceholder = testMode || !adClient || !adSlot;

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
                showPlaceholder ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        <span className="text-zinc-500 text-xs font-medium">Safe Ad Space ({slot})</span>
                    </motion.div>
                ) : (
                    <div className="w-full h-full">
                        {/* Real AdSense Unit */}
                        <ins className="adsbygoogle block w-full h-full"
                             data-ad-client={adClient}
                             data-ad-slot={adSlot}
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
