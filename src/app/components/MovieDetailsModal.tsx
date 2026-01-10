"use client";

import { useEffect, useState } from "react";
import { X, Play, User, Calendar, Star, Clock } from "lucide-react";
import { MovieDetails } from "@/lib/types";
import { fetchMovieDetails } from "@/lib/api";
import { cn } from "@/lib/utils";

interface MovieDetailsModalProps {
  movieId: number | null;
  onClose: () => void;
}

export function MovieDetailsModal({ movieId, onClose }: MovieDetailsModalProps) {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movieId) {
      setLoading(true);
      fetchMovieDetails(movieId).then((data) => {
        setDetails(data);
        setLoading(false);
      });
    } else {
      setDetails(null);
    }
  }, [movieId]);

  if (!movieId) return null;

  // Find the first trailer
  const trailer = details?.videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900/90 border border-white/10 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300 custom-scrollbar">
        {loading ? (
          <div className="h-96 flex items-center justify-center text-white/50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : details ? (
          <>
            {/* Backdrop Header */}
            <div className="relative h-64 sm:h-96 w-full overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
               <img 
                 src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`} 
                 alt={details.title}
                 className="w-full h-full object-cover"
               />
               <button 
                 onClick={onClose}
                 className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-white/20 rounded-full transition-colors text-white"
               >
                 <X size={24} />
               </button>
               
               <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                 <h2 className="text-3xl sm:text-5xl font-bold text-white mb-2 text-shadow-lg tracking-tight">
                   {details.title}
                 </h2>
                 <div className="flex flex-wrap gap-4 text-sm font-medium text-white/80 items-center">
                    <span className="flex items-center gap-1"><Star size={16} className="text-yellow-400 fill-yellow-400" /> {details.vote_average.toFixed(1)}</span>
                    <span className="flex items-center gap-1"><Calendar size={16} /> {new Date(details.release_date).getFullYear()}</span>
                    <span className="flex items-center gap-1"><Clock size={16} /> {details.runtime} min</span>
                    <div className="flex gap-2 ml-2">
                        {details.genres.map(g => (
                            <span key={g.id} className="px-2 py-0.5 bg-white/10 rounded-full text-xs border border-white/10">
                                {g.name}
                            </span>
                        ))}
                    </div>
                 </div>
               </div>
            </div>

            <div className="p-6 space-y-8">
                {/* Overview & content */}
                <p className="text-lg text-white/90 leading-relaxed font-light">
                    {details.overview}
                </p>

                {/* Trailer */}
                {trailer && (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Play size={20} className="text-primary-400" /> Official Trailer
                        </h3>
                        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-white/5 bg-black/50">
                            <iframe 
                                src={`https://www.youtube.com/embed/${trailer.key}`} 
                                title="Trailer"
                                className="w-full h-full"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </div>
                    </div>
                )}

                {/* Cast */}
                {details.credits?.cast?.length > 0 && (
                    <div className="space-y-4">
                         <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <User size={20} /> Top Cast
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {details.credits.cast.slice(0, 10).map((actor) => (
                                <div key={actor.id} className="bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="aspect-[2/3] w-full rounded-md overflow-hidden bg-gray-800 mb-2">
                                        {actor.profile_path ? (
                                             <img 
                                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                                                alt={actor.name}
                                                className="w-full h-full object-cover"
                                              />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/20">
                                                <User size={32} />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-white font-medium text-sm truncate">{actor.name}</p>
                                    <p className="text-white/50 text-xs truncate">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
