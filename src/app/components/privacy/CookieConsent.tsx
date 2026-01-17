"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage for consent
    const consent = localStorage.getItem('lumina-cookie-consent');
    if (!consent) {
        // Small delay to not overwhelm the user immediately on load
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lumina-cookie-consent', 'true');
    setIsVisible(false);
    // Initialize analytics/ads scripts here if needed
  };

  const handleDecline = () => {
    localStorage.setItem('lumina-cookie-consent', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 p-6 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
        >
            <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                    <ShieldCheck size={24} />
                </div>
                <div className="flex-1 space-y-3">
                    <h3 className="font-bold text-white text-base">Privacy & Transparency</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        We use cookies to enhance your experience and analyze mood data anonymously. No personal tracking.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        <button 
                            onClick={handleAccept}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
                        >
                            Accept & Continue
                        </button>
                         <button 
                            onClick={handleDecline}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium rounded-lg transition-colors border border-white/5"
                        >
                            Necessary Only
                        </button>
                    </div>
                </div>
                <button 
                    onClick={handleDecline} 
                    className="text-zinc-500 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <X size={18} />
                </button>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
