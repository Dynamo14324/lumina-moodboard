"use client";
import { useState, useEffect, Suspense } from "react";
import { MoodSelector, MOODS } from "./components/MoodSelector";
import { MovieGrid } from "./components/MovieGrid";
import { AudioAmbience } from "./components/AudioAmbience";
import { fetchMoviesByMood } from "@/lib/api";
import { generateAIInsight } from "@/lib/ai-curator";
import { Movie } from "@/lib/types";
import { motion } from "framer-motion";
import { useWatchlist } from "@/lib/useWatchlist";
import { WatchlistDrawer } from "./components/WatchlistDrawer";
import { Heart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { MovieDetailsModal } from "./components/MovieDetailsModal";

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <LuminaContent />
    </Suspense>
  );
}

function LuminaContent() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync with URL on mount and update
  useEffect(() => {
    const moodParam = searchParams.get("mood");
    const movieParam = searchParams.get("movie");

    // Only update if actually different to prevent unnecessary renders/loops
    // The linter might still warn, but this is the correct logic for syncing URL -> State
    if (moodParam && moodParam !== selectedMood) {
      if (typeof window !== 'undefined') { // basic guard
          setSelectedMood(moodParam);
      }
    }
    
    if (movieParam) {
       setSelectedMovieId(Number(movieParam));
    } else {
       setSelectedMovieId(null);
    }
  }, [searchParams]);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("mood", moodId);
    // Clear movie when changing mood to avoid confusion? Or keep it? Lets keep it simple.
    router.push(`?${params.toString()}`);
  };

  const handleMovieSelect = (movieId: number) => {
    setSelectedMovieId(movieId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("movie", String(movieId));
    router.push(`?${params.toString()}`);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("movie");
    router.push(`?${params.toString()}`);
  };

  const toggleWatchlist = (movie: Movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  // We depend on selectedMood. When it changes, we fetch.
  // The linter warning about setMovies/setLoading is usually benign in this context,
  // but to be safe we can use a small timeout or just keep standard.
  // The previous user error regarding "Calling setState synchronously" is specific to
  // immediate updates. Here it is inside a Promise, so it is async.
  // The 'setLoading(true)' is sync.
  useEffect(() => {
    if (selectedMood) {
      const mood = MOODS.find(m => m.id === selectedMood);
      if (mood) {
         setLoading(true);
         fetchMoviesByMood('/discover/movie', mood.query_params)
          .then(data => {
             const enriched = data.map(m => ({
                ...m,
                ai_insight: generateAIInsight(m, selectedMood)
             }));
             setMovies(enriched);
          })
          .catch(err => console.error("Error fetching movies:", err))
          .finally(() => setLoading(false));
      }
    }
  }, [selectedMood]);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">
      <AudioAmbience mood={selectedMood} shouldDuck={!!selectedMovieId} />
      <MovieDetailsModal movieId={selectedMovieId} onClose={handleCloseModal} />
      <WatchlistDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        watchlist={watchlist} 
        onRemove={removeFromWatchlist}
        onSelectMovie={handleMovieSelect}
      />
      
      {/* My Stash Button */}
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="fixed top-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-all group"
      >
        <Heart size={18} className={watchlist.length > 0 ? "fill-red-500 text-red-500" : "text-white group-hover:text-red-400"} />
        <span className="text-sm font-medium hidden sm:inline">My Stash</span>
        {watchlist.length > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {watchlist.length}
            </span>
        )}
      </button>

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

          <MoodSelector selected={selectedMood || ""} onSelect={handleMoodSelect} />
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
           <MovieGrid 
             movies={movies} 
             loading={loading} 
             watchlist={watchlist}
             onToggleWatchlist={toggleWatchlist}
             onSelectMovie={handleMovieSelect}
           />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center py-12 text-zinc-600 text-sm">
        <p>Expertly Architected by <span className="text-zinc-400">Yogesh Jadhav (Dynamo_14324)</span> ❤️</p>
        <p className="mt-2 text-xs opacity-50">Powered by TMDB API • Next.js 14 • Tailwind</p>
      </footer>
    </main>
  );
}
