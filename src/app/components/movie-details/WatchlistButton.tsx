import { Heart } from "lucide-react";
import { useWatchlist } from "@/lib/useWatchlist";
import { MovieDetails } from "@/lib/types";

interface WatchlistButtonProps {
  details: MovieDetails;
}

export function WatchlistButton({ details }: WatchlistButtonProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const currentId = Number(details.id);
  const inWatchlist = isInWatchlist(currentId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(currentId);
    } else {
      addToWatchlist({
        id: currentId,
        title: details.title,
        poster_path: details.poster_path, 
        backdrop_path: details.backdrop_path,
        overview: details.overview,
        release_date: details.release_date,
        vote_average: details.vote_average,
        genre_ids: details.genres?.map(g => g.id) || [],
        ai_insight: "" 
      });
    }
  };

  return (
    <button
        onClick={handleClick}
        className="absolute top-4 right-28 z-20 p-2 bg-black/40 hover:bg-white/20 rounded-full transition-all text-white backdrop-blur-md border border-white/10 group"
        aria-label={inWatchlist ? "Remove from Stash" : "Add to Stash"}
    >
        <Heart 
            size={24} 
            className={`transition-all duration-300 ${inWatchlist ? "fill-red-500 text-red-500 scale-110" : "text-white group-hover:text-red-400"}`} 
        />
    </button>
  );
}
