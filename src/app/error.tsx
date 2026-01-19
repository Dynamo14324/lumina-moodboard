"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { logger } from "@/lib/logger";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to centralized monitoring
    logger.error("Global Catch-All Error", error, { digest: error.digest });
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
       <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl text-center space-y-6 shadow-2xl"
      >
        <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center text-red-500 border border-red-500/20">
            <AlertCircle size={32} />
        </div>
        
        <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Production Error</h2>
            <p className="text-zinc-400 text-sm">
                Something went wrong while rendering this scene. Our projectionists have been notified.
            </p>
        </div>

        <div className="p-4 bg-black/40 rounded-lg text-left overflow-hidden">
            <p className="text-xs text-red-400 font-mono break-all line-clamp-4">
                {error.message || "Unknown error occurred"}
            </p>
            {error.digest && (
                <p className="text-[10px] text-zinc-600 mt-2 font-mono">
                    Ref: {error.digest}
                </p>
            )}
        </div>

        <button
          onClick={reset}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black hover:bg-zinc-200 font-bold rounded-xl transition-colors"
        >
          <RotateCcw size={18} />
          Reload Scene
        </button>
      </motion.div>
    </div>
  );
}
