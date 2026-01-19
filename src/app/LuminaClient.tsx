"use client";

import { useEffect } from "react";
import { MoodSelector } from "./components/MoodSelector";
import { MOODS } from "@/lib/constants";
import { MovieGrid } from "./components/MovieGrid";
import { AudioAmbience } from "./components/AudioAmbience";
import { motion } from "framer-motion";
import { WatchlistDrawer } from "./components/WatchlistDrawer";
import { Heart } from "lucide-react";
import { MovieDetailsModal } from "./components/MovieDetailsModal";
import { SupportButton } from "./components/monetization/SupportButton";
import { AdUnit } from "./components/monetization/AdUnit";
import { useLumina } from "@/lib/hooks/useLumina";
import { logger } from "@/lib/logger";

export function LuminaClient() {
  const {
    selectedMood,
    movies,
    loading,
    selectedMovieId,
    watchlist,
    isDrawerOpen,
    setIsDrawerOpen,
    handleMoodSelect,
    handleMovieSelect,
    handleCloseModal,
    toggleWatchlist
  } = useLumina();

  // Lifecycle monitoring
  useEffect(() => {
    if (selectedMood) {
      logger.event("Mood Change", { mood: selectedMood });
    }
  }, [selectedMood]);

  // Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Lumina Home",
        "item": "https://lumina-moodboard.vercel.app"
      },
      ...MOODS.map((mood, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": mood.label,
        "item": `https://lumina-moodboard.vercel.app?mood=${mood.id}`
      }))
    ]
  };

  const discoveryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Cinematic Moods",
    "description": "Discover movies by emotional state",
    "itemListElement": MOODS.map((mood, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://lumina-moodboard.vercel.app?mood=${mood.id}`,
      "name": mood.label
    }))
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(discoveryJsonLd) }}
      />
      <AudioAmbience mood={selectedMood} shouldDuck={!!selectedMovieId} />
      <MovieDetailsModal movieId={selectedMovieId} onClose={handleCloseModal} />
      <WatchlistDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onSelectMovie={handleMovieSelect}
      />
      
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="fixed top-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-all group"
        aria-label="View My Stash"
        title="View My Stash"
      >
        <Heart size={18} className={watchlist.length > 0 ? "fill-red-500 text-red-500" : "text-white group-hover:text-red-400"} />
        <span className="text-sm font-medium hidden sm:inline">My Stash</span>
        {watchlist.length > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {watchlist.length}
            </span>
        )}
      </button>

      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505] -z-10" />
      
      <div className="container mx-auto max-w-7xl py-12 px-4 md:py-20">
        <header className="text-center mb-16 space-y-6">
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
          <MoodSelector selected={selectedMood || ""} onSelect={handleMoodSelect} />
        </motion.div>
        
        <div className="mt-16 min-h-[400px]">
           {!selectedMood && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex flex-col items-center justify-center text-zinc-300 h-64 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]"
             >
               <p className="text-sm uppercase tracking-widest text-zinc-300">Select a mood to begin</p>
             </motion.div>
           )}
           <MovieGrid 
             movies={movies} 
             loading={loading} 
             watchlist={watchlist}
             onToggleWatchlist={toggleWatchlist}
             onSelectMovie={handleMovieSelect}
           />
        </div>
      </div>
      
      <div className="container mx-auto max-w-7xl px-4 mb-12">
        <AdUnit slot="footer" className="mx-auto" />
      </div>

      <footer className="relative z-10 text-center py-12 text-zinc-300 text-sm border-t border-white/5 bg-[#050505]/50 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-6">
            <SupportButton />
            <div>
                <p>Expertly Architected by <span className="text-white">Yogesh Jadhav (Dynamo_14324)</span> ❤️</p>
                <p className="mt-2 text-xs text-zinc-400">Powered by TMDB API • Next.js 14 • Tailwind</p>
            </div>
        </div>
      </footer>
    </main>
  );
}
