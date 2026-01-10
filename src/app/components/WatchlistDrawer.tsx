"use client";

import { X, Trash2, Heart } from "lucide-react";
import { Movie } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: Movie[];
  onRemove: (id: number) => void;
}

export function WatchlistDrawer({ isOpen, onClose, watchlist, onRemove }: WatchlistDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-zinc-900 border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Heart className="fill-red-500 text-red-500" /> My Stash
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                  <X size={24} />
                </button>
              </div>

              {watchlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
                    <Heart size={48} className="mb-4 opacity-20" />
                    <p>Your stash is empty.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {watchlist.map((movie) => (
                    <div key={movie.id} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors group">
                        <div className="w-16 h-24 flex-shrink-0 bg-black rounded-lg overflow-hidden">
                             {movie.poster_path && <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium truncate">{movie.title}</h3>
                            <p className="text-zinc-400 text-sm">{movie.release_date.split('-')[0]}</p>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs px-2 py-0.5 bg-yellow-400/10 text-yellow-400 rounded">★ {movie.vote_average.toFixed(1)}</span>
                            </div>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); onRemove(movie.id); }}
                            className="text-zinc-500 hover:text-red-400 p-2 transition-colors self-start"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
