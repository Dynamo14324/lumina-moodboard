"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { getAmazonSearchUrl } from "@/lib/affiliate";

interface ShopUnitProps {
  query?: string;
  affiliateLink?: string;
  moodLabel: string;
  className?: string;
}

export function ShopUnit({ query, affiliateLink, moodLabel, className = "" }: ShopUnitProps) {
  const url = affiliateLink || (query ? getAmazonSearchUrl(query) : "#");
  
  if (!url || url === "#") return null;

  const handleClick = () => {
    // Lazy import or global reference would be better, but for now we rely on the browser console/Vercel
    // We can interact with window.va (Vercel Analytics) if available, or just console log
    console.log(`[Lumina Analytics] Shop Click: ${moodLabel} - ${query}`);
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative block w-full h-full overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={handleClick}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-xl group-hover:shadow-indigo-500/20">
          <ShoppingBag size={28} className="text-indigo-400 group-hover:text-white" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Shop the Vibe</span>
          <h3 className="text-xl font-bold text-white leading-tight">
            {moodLabel} Collection
          </h3>
          <p className="text-xs text-zinc-400 max-w-[200px] mx-auto pt-2">
            Curated gear, books, and collectibles for this mood.
          </p>
        </div>

        <div className="pt-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-xs font-bold text-white transition-all group-hover:border-indigo-500/30">
                Browse on Amazon <ArrowUpRight size={12} />
            </span>
        </div>
      </div>
      
      {/* Decorative Shine */}
      <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-shine" />
    </motion.a>
  );
}
