"use client";
import { motion, AnimatePresence } from "framer-motion";

import { Movie } from "@/lib/types";
import { Heart, Play } from "lucide-react";
import Image from "next/image";

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  watchlist: Movie[];
  onToggleWatchlist: (movie: Movie) => void;
  onSelectMovie: (id: number) => void;
}

export function MovieGrid({ movies, loading, watchlist, onToggleWatchlist, onSelectMovie }: MovieGridProps) {

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 animate-pulse">
        {[...Array(8)].map((_, i) => (
           <div key={i} className="aspect-[2/3] bg-white/5 rounded-xl border border-white/5" />
        ))}
      </div>
    );
  }

  return (
    <>
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
      >
      <AnimatePresence mode="popLayout">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="group relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-950 border border-white/5 hover:border-white/20 transition-colors cursor-pointer"
            onClick={() => onSelectMovie(movie.id)}
          >
             <a 
                href={`https://www.google.com/search?q=watch+${encodeURIComponent(movie.title)}+details`}
                target="_blank"
                rel="noopener noreferrer"
                className="sr-only"
                onClick={(e) => e.stopPropagation()}
             >
                Watch {movie.title} details and cast
             </a>
             <button
                onClick={(e) => { e.stopPropagation(); onToggleWatchlist(movie); }}
                className="absolute top-2 right-2 z-30 p-2 rounded-full bg-black/40 hover:bg-white/20 text-white transition-colors opacity-0 group-hover:opacity-100"
                aria-label={watchlist.some(w => w.id === movie.id) ? "Remove from watchlist" : "Add to watchlist"}
                title={watchlist.some(w => w.id === movie.id) ? "Remove from watchlist" : "Add to watchlist"}
             >
                <Heart size={20} className={watchlist.some(w => w.id === movie.id) ? "fill-red-500 text-red-500" : ""} />
             </button>
             {movie.poster_path ? (
               <Image 
                 src={movie.poster_path.startsWith('/') ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movie.poster_path} 
                 alt={movie.title}
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-110"
                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
               />
             ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700 bg-zinc-900 p-4 text-center">
                  <span className="text-4xl mb-2">🎬</span>
                  <span className="text-sm font-medium">{movie.title}</span>
                </div>
             )}
             
             <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 select-none">
                <h4 className="text-xl font-bold text-white mb-1 leading-tight">{movie.title}</h4>
                {movie.ai_insight && (
                  <div className="mb-2 px-2 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded text-[10px] text-indigo-300 font-medium inline-block backdrop-blur-sm">
                     ✨ AI Insight: {movie.ai_insight}
                  </div>
                )}
                <div className="flex items-center gap-2 text-yellow-400 text-sm mb-3 font-medium">
                  <span>★ {movie.vote_average.toFixed(1)}</span>
                  <span className="text-zinc-400">• {movie.release_date.split('-')[0]}</span>
                </div>
                
                <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed mb-4">{movie.overview}</p>
                
                <div className="flex items-center gap-2 mt-auto">
                    <a 
                        href={`https://www.google.com/search?q=watch+${encodeURIComponent(movie.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-semibold text-center transition-all flex items-center justify-center gap-2 group/btn"
                    >
                        <Play size={14} className="fill-white" />
                        Watch Now
                    </a>
                </div>
             </div>
          </motion.div>
        ))}
      </AnimatePresence>
      </motion.div>
    </>
  );
}
