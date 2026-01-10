"use client";

import { useState, useEffect } from "react";
import { Movie } from "./types";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem("lumina_watchlist");
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse watchlist", e);
      }
    }
  }, []);

  const addToWatchlist = (movie: Movie) => {
    const updated = [...watchlist, movie];
    setWatchlist(updated);
    localStorage.setItem("lumina_watchlist", JSON.stringify(updated));
  };

  const removeFromWatchlist = (movieId: number) => {
    const updated = watchlist.filter(m => m.id !== movieId);
    setWatchlist(updated);
    localStorage.setItem("lumina_watchlist", JSON.stringify(updated));
  };

  const isInWatchlist = (movieId: number) => watchlist.some(m => m.id === movieId);

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
}
