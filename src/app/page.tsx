"use client";
import { useState, useEffect } from "react";
import { MoodSelector, MOODS } from "./components/MoodSelector";
import { MovieGrid } from "./components/MovieGrid";
import { fetchMoviesByMood } from "@/lib/api";
import { Movie } from "@/lib/types";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedMood) {
      const mood = MOODS.find(m => m.id === selectedMood);
      if (mood) {
        setLoading(true);
        fetchMoviesByMood('/discover/movie', mood.query_params)
          .then(setMovies)
          .finally(() => setLoading(false));
      }
    }
  }, [selectedMood]);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505] -z-10" />
      
      <div className="container mx-auto max-w-7xl py-12 px-4 md:py-20">
        <header className="text-center mb-16 space-y-6">
           {/* Badge */}
           <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-indigo-300"
           >
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
             </span>
             AI-Powered Cinematic Discovery
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.3, type: "spring" }}
             className="text-6xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40"
           >
             Lumina
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
           >
             Stop searching. Start feeling. <br className="hidden md:block"/>
             Select a mood to generate a curated cinematic soundscape.
           </motion.p>
        </header>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
        >
          <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
        </motion.div>
        
        <div className="mt-16 min-h-[400px]">
           {!selectedMood && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex flex-col items-center justify-center text-zinc-600 h-64 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]"
             >
               <p className="text-sm uppercase tracking-widest">Select a mood to begin</p>
             </motion.div>
           )}
           <MovieGrid movies={movies} loading={loading} />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center py-12 text-zinc-600 text-sm">
        <p>Expertly Architected by Architect-Zero.</p>
        <p className="mt-2 text-xs opacity-50">Powered by TMDB API • Next.js 14 • Tailwind</p>
      </footer>
    </main>
  );
}
