"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, RefreshCw } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center space-y-8 max-w-md mx-auto"
      >
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
            <span className="text-6xl">📽️</span>
            <div className="absolute inset-0 border-t-2 border-indigo-500 rounded-full animate-spin duration-[3000ms]" />
        </div>

        <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                Scene Not Found
            </h1>
            <p className="text-zinc-400">
                The cinematic moment you are looking for has been cut from the final edit or never existed.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-500/20"
            >
                <Home size={18} />
                Return Home
            </Link>
            <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl transition-all border border-white/5"
            >
                <RefreshCw size={18} />
                Try Again
            </button>
        </div>
      </motion.div>
    </div>
  );
}
