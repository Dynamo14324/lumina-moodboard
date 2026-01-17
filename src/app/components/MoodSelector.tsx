"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { cn } from "@/lib/utils";
import { Mood } from "@/lib/types";

export const MOODS: Mood[] = [
  { 
    id: "adrenaline", 
    emoji: "⚡", 
    label: "Adrenaline", 
    description: "High stakes. Fast pace.", 
    gradient: "from-orange-500 to-red-600",
    query_params: { with_genres: "28,53", sort_by: "popularity.desc" }
  },
  { 
    id: "ethereal", 
    emoji: "✨", 
    label: "Ethereal", 
    description: "Dreamlike. Otherworldly.", 
    gradient: "from-purple-500 to-indigo-600",
    query_params: { with_genres: "878,14", sort_by: "vote_average.desc" }
  },
  { 
    id: "melancholy", 
    emoji: "🌧️", 
    label: "Melancholy", 
    description: "Reflective. Deep.", 
    gradient: "from-blue-700 to-slate-800",
    query_params: { with_genres: "18", "vote_average.gte": 8 }
  },
  { 
    id: "wholesome", 
    emoji: "❤️", 
    label: "Wholesome", 
    description: "Feel good. Uplifting.", 
    gradient: "from-pink-400 to-rose-400",
    query_params: { with_genres: "10751,35", sort_by: "popularity.desc" }
  },
  {
    id: "cerebral",
    emoji: "🔬",
    label: "Cerebral",
    description: "Complex. Mind-bending.",
    gradient: "from-emerald-500 to-teal-700",
    query_params: { with_genres: "9648,878", sort_by: "vote_average.desc" }
  }
];

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
}

export const MoodSelector = memo(function MoodSelector({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-4 justify-center py-8">
      {MOODS.map((mood) => {
        const isSelected = selected === mood.id;
        return (
          <motion.button
            key={mood.id}
            onClick={() => onSelect(mood.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative overflow-hidden group p-6 rounded-2xl border transition-all duration-300 w-full sm:w-auto min-w-[160px]",
              isSelected 
                ? "border-transparent ring-2 ring-white/20" 
                : "border-white/5 hover:border-white/10 bg-white/5"
            )}
          >
             <div className={cn(
               "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br duration-500",
               mood.gradient,
               isSelected && "opacity-20"
             )} />
             
             <div className="relative z-10 flex flex-col items-center gap-2">
                <span className="text-4xl filter drop-shadow-lg mb-2">{mood.emoji}</span>
                <div className="text-center">
                  <h2 className="font-bold text-white/90 text-lg">{mood.label}</h2>
                  <p className="text-xs text-zinc-300 group-hover:text-zinc-200 transition-colors uppercase tracking-wider">{mood.description}</p>
                </div>
             </div>
          </motion.button>
        );
      })}
    </div>
  );
});
