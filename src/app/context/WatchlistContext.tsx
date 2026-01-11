"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Movie } from "@/lib/types";

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem("lumina_watchlist");
    
    // We defer updates to avoid the synchronous setState warning in React 19 / Next 16
    Promise.resolve().then(() => {
        if (saved) {
            try {
                setWatchlist(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse watchlist", e);
            }
        }
        setIsInitialized(true);
    });
  }, []);

  useEffect(() => {
    // Persist to local storage whenever watchlist changes, 
    // but only after initialization to avoid overwriting with empty array on mount
    if (isInitialized) {
      localStorage.setItem("lumina_watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist, isInitialized]);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((m) => m.id === movieId);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlistContext() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlistContext must be used within a WatchlistProvider");
  }
  return context;
}
