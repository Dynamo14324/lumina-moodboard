"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareButtonProps {
  moodId: string | null;
}

export function ShareButton({ moodId }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    
    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lumina | AI Cinematic Discovery',
          text: `Check out this ${moodId ? moodId + ' ' : ''}cinematic moodscape on Lumina.`,
          url: url
        });
        return;
      } catch (err) {
        // Fallback to clipboard if user cancelled or error
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`relative group flex items-center justify-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 backdrop-blur-md ${
        copied 
          ? "bg-green-500/20 border-green-500/50 text-green-400" 
          : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
      }`}
      aria-label="Share this mood"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Check size={16} />
            <span className="text-xs font-semibold">Copied</span>
          </motion.span>
        ) : (
          <motion.span
            key="share"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Share2 size={16} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Share Vibe</span>
          </motion.span>
        )}
      </AnimatePresence>
      
      {/* Shine effect for attention when not copied */}
      {!copied && (
        <span className="absolute inset-0 rounded-full overflow-hidden">
             <span className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shine" />
        </span>
      )}
    </button>
  );
}
