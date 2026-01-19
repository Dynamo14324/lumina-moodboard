"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function SupportButton() {
  return (
    <motion.a
      href="https://ko-fi.com" // Replace with actual donation link
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500/10 to-indigo-500/10 hover:from-pink-500/20 hover:to-indigo-500/20 border border-white/10 hover:border-white/20 rounded-full transition-all group backdrop-blur-md"
    >
      <Heart size={16} className="text-pink-500 group-hover:fill-pink-500 transition-colors" />
      <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
        Support the Architecture
      </span>
    </motion.a>
  );
}
