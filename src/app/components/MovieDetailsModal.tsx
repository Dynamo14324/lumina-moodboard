"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Calendar, Clock } from "lucide-react";
import { MovieDetails, WatchProvider } from "@/lib/types";
import { fetchMovieDetails, fetchWatchProviders } from "@/lib/api";
import Image from "next/image";

// Modular Components
import { TrailerEmbed } from "./movie-details/TrailerEmbed";
import { WatchProviderList } from "./movie-details/WatchProviderList";
import { MerchSection } from "./movie-details/MerchSection";
import { CastList } from "./movie-details/CastList";
import { ShareButton } from "./movie-details/ShareButton";
import { WatchlistButton } from "./movie-details/WatchlistButton";

interface MovieDetailsModalProps {
  movieId: number | null;
  onClose: () => void;
}

export function MovieDetailsModal({ movieId, onClose }: MovieDetailsModalProps) {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<WatchProvider[] | null>(null);

  useEffect(() => {
    if (!movieId) return;

    let isMounted = true;
    
    const fetchData = async () => {
        setLoading(true);
        try {
            const [data, providersData] = await Promise.all([
                fetchMovieDetails(movieId),
                fetchWatchProviders(movieId)
            ]);
            if (isMounted) {
                setDetails(data);
                setProviders(providersData);
            }
        } catch (error) {
            console.error("Error fetching movie details:", error);
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }
    };

    fetchData();

    return () => { isMounted = false; };
  }, [movieId]);

  return (
    <AnimatePresence mode="wait">
      {movieId && (
        <div key={movieId} className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl custom-scrollbar z-10"
          >
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-96 flex flex-col items-center justify-center text-white/50 space-y-4"
              >
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                <p className="text-sm font-medium animate-pulse">Syncing cinematic data...</p>
              </motion.div>
            ) : details ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                {/* Backdrop Header */}
                <div className="relative h-64 sm:h-96 w-full overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent z-10" />
                   <Image 
                     src={`https://image.tmdb.org/t/p/original${details.backdrop_path || details.poster_path}`} 
                     alt={details.title}
                     fill
                     className="object-cover"
                     sizes="(max-width: 768px) 100vw, 80vw"
                     priority
                   />
                   
                   {/* Close Button */}
                   <button 
                     onClick={onClose}
                     className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-white/20 rounded-full transition-all text-white backdrop-blur-md border border-white/10"
                     aria-label="Close details"
                   >
                     <X size={24} />
                   </button>
                   
                   <ShareButton 
                      movieTitle={details.title} 
                      movieOverview={details.overview} 
                      movieId={Number(details.id)} 
                   />
    
                   <WatchlistButton details={details} />
                   
                   <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                     <motion.h2 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl sm:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-2xl"
                     >
                       {details.title}
                     </motion.h2>
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4 text-sm font-medium text-white/80 items-center"
                     >
                        <span className="flex items-center gap-1"><Star size={16} className="text-yellow-400 fill-yellow-400" /> {details.vote_average.toFixed(1)}</span>
                        <span className="flex items-center gap-1"><Calendar size={16} /> {new Date(details.release_date).getFullYear()}</span>
                        <span className="flex items-center gap-1"><Clock size={16} /> {details.runtime} min</span>
                        <div className="flex flex-wrap gap-2">
                            {details.genres.map(g => (
                                <span key={g.id} className="px-2 py-0.5 bg-indigo-500/20 text-indigo-200 rounded-full text-[10px] border border-indigo-500/30 font-semibold uppercase tracking-wider backdrop-blur-sm">
                                    {g.name}
                                </span>
                            ))}
                        </div>
                     </motion.div>
                   </div>
                </div>
    
                <div className="p-6 space-y-8">
                    {/* Overview */}
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-zinc-300 leading-relaxed font-light first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-indigo-400"
                    >
                        {details.overview}
                    </motion.p>
    
                    <TrailerEmbed videos={details.videos} />
    
                    <WatchProviderList providers={providers} movieTitle={details.title} />

                    <MerchSection movieTitle={details.title} />
    
                    <CastList cast={details.credits?.cast} movieTitle={details.title} />
                </div>
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
