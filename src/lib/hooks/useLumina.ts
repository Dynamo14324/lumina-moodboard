"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Movie, Mood } from "@/lib/types";
import { MOODS } from "@/lib/constants";
import { fetchMoviesByMood } from "@/lib/api";
import { generateAIInsight } from "@/lib/ai-curator";
import { useWatchlist } from "@/lib/useWatchlist";

export function useLumina() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  // Sync state from URL
  useEffect(() => {
    const moodParam = searchParams.get("mood");
    const movieParam = searchParams.get("movie");

    if (moodParam !== selectedMood) {
      setSelectedMood(moodParam);
    }
    
    const movieIdParam = movieParam ? Number(movieParam) : null;
    if (movieIdParam !== selectedMovieId) {
      setSelectedMovieId(movieIdParam);
    }
  }, [searchParams, selectedMood, selectedMovieId]);

  // Fetch movies when mood changes
  useEffect(() => {
    if (!selectedMood) return;

    const mood = MOODS.find(m => m.id === selectedMood);
    if (!mood) return;

    const controller = new AbortController();
    
    const loadMovies = async () => {
        setLoading(true);
        try {
            const data = await fetchMoviesByMood('/discover/movie', mood.query_params, controller.signal);
            if (controller.signal.aborted) return;
            
            const enriched = data.map(m => ({
               ...m,
               ai_insight: generateAIInsight(m, selectedMood)
            }));
            setMovies(enriched);
        } catch (err) {
            if ((err as Error).name !== 'AbortError') {
                 console.error("Error fetching movies:", err);
            }
        } finally {
            if (!controller.signal.aborted) setLoading(false);
        }
    };

    loadMovies();

    return () => { 
        controller.abort();
    };
  }, [selectedMood]);

  const handleMoodSelect = useCallback((moodId: string) => {
    setSelectedMood(moodId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("mood", moodId);
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const handleMovieSelect = useCallback((movieId: number) => {
    setSelectedMovieId(movieId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("movie", String(movieId));
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const handleCloseModal = useCallback(() => {
    setSelectedMovieId(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("movie");
    router.push(`?${params.toString()}`);
  }, [router, searchParams]);

  const toggleWatchlist = useCallback((movie: Movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }, [isInWatchlist, removeFromWatchlist, addToWatchlist]);

  return {
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
  };
}
