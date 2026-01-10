"use client";

import { useWatchlistContext } from "@/app/context/WatchlistContext";

export function useWatchlist() {
  return useWatchlistContext();
}
