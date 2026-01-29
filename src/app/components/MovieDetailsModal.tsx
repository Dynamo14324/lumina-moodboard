"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, User, Calendar, Star, Clock, Heart, ShoppingBag, Search } from "lucide-react";
import { MovieDetails } from "@/lib/types";
import { fetchMovieDetails, fetchWatchProviders } from "@/lib/api";
import { WatchProvider } from "@/lib/types";
import { Share2, Globe } from "lucide-react";
import Image from "next/image";
import { getAmazonAffiliateUrl } from "@/lib/affiliate";

interface MovieDetailsModalProps {
  movieId: number | null;
  onClose: () => void;
}

import { useWatchlist } from "@/lib/useWatchlist";

export function MovieDetailsModal({ movieId, onClose }: MovieDetailsModalProps) {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState<WatchProvider[] | null>(null);
  const [copied, setCopied] = useState(false);
  
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

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

  const handleShare = async () => {
    if (!details) return;
    
    const url = `${window.location.origin}?movie=${movieId}`;
    // Enticing, high-conversion share text with emojis and clear CTA
    const shareTitle = `Lumina | ${details.title}`;
    const shareText = `� Found your next watch on Lumina!\n\n🍿 *${details.title}*\n"${details.overview.substring(0, 100)}..."\n\n✨ Experience the mood here:\n`;

    try {
      if (navigator.share) {
        // Sharing the title, text, and URL together 
        // Platforms will use the URL to generate the "Eye Boggling" large preview card
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: url,
        });
      } else {
        // Fallback for desktop: Copy the enticing message to clipboard
        await navigator.clipboard.writeText(`${shareText}${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const trailer = details?.videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

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
                   
                   {/* Share Button */}
                   <button 
                     onClick={handleShare}
                     className="absolute top-4 right-16 z-20 p-2 bg-black/40 hover:bg-white/20 rounded-full transition-all text-white backdrop-blur-md border border-white/10 flex items-center gap-2"
                     aria-label="Share movie"
                   >
                     <Share2 size={24} />
                     <AnimatePresence>
                       {copied && (
                         <motion.span 
                            initial={{ opacity: 0, scale: 0.5, x: 10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="text-xs font-bold bg-green-500 px-2 py-1 rounded-full whitespace-nowrap"
                         >
                           Copied!
                         </motion.span>
                       )}
                     </AnimatePresence>
                   </button>
    
                    {/* Watchlist Button */}
                    <button
                       onClick={(e) => {
                           e.stopPropagation();
                           if (!details) return;
                           const currentId = Number(details.id);
                           if (isInWatchlist(currentId)) {
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
                       }}
                       className="absolute top-4 right-28 z-20 p-2 bg-black/40 hover:bg-white/20 rounded-full transition-all text-white backdrop-blur-md border border-white/10 group"
                       aria-label={isInWatchlist(Number(details.id)) ? "Remove from Stash" : "Add to Stash"}
                    >
                       <Heart 
                          size={24} 
                          className={`transition-all duration-300 ${isInWatchlist(Number(details.id)) ? "fill-red-500 text-red-500 scale-110" : "text-white group-hover:text-red-400"}`} 
                       />
                    </button>
                   
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
                    {/* Overview & content */}
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-zinc-300 leading-relaxed font-light first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-indigo-400"
                    >
                        {details.overview}
                    </motion.p>
    
                    {/* Trailer */}
                    {trailer && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Play size={20} className="fill-indigo-500 text-indigo-500" /> Official Trailer
                            </h3>
                            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                                <iframe 
                                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&modestbranding=1&rel=0`} 
                                    title="Trailer"
                                    className="w-full h-full"
                                    allowFullScreen
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                />
                            </div>
                        </motion.div>
                    )}
    
                    {/* Watch Providers */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                         <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Globe size={20} className="text-indigo-400" /> Availability & Platforms
                        </h3>
                        {providers && providers.length > 0 ? (
                           <div className="flex flex-wrap gap-6">
                               {providers.map((p) => (
                                   <a 
                                       key={p.provider_id} 
                                       href={`https://www.google.com/search?q=watch+${encodeURIComponent(details.title)}+on+${p.provider_name}`}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       className="flex flex-col items-center gap-3 group"
                                   >
                                       <div className="w-14 h-14 relative rounded-2xl shadow-xl overflow-hidden group-hover:scale-110 group-hover:ring-2 group-hover:ring-indigo-500/50 transition-all duration-300 bg-zinc-800">
                                           <Image 
                                             src={`https://image.tmdb.org/t/p/original${p.logo_path}`} 
                                             alt={p.provider_name}
                                             fill
                                             className="object-cover"
                                             sizes="56px"
                                           />
                                       </div>
                                       <span className="text-[10px] uppercase font-bold text-zinc-500 max-w-[70px] truncate text-center group-hover:text-white transition-colors tracking-tighter">{p.provider_name}</span>
                                   </a>
                               ))}
                           {/* Ethical Monetization Section - Prime Video Upsell */}
                               <a 
                                   href={getAmazonAffiliateUrl(details.title)}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="flex flex-col items-center gap-3 group relative overflow-hidden rounded-2xl p-1"
                                   aria-label={`Watch ${details.title} on Prime Video`}
                               >
                                   <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                   
                                   <div className="w-14 h-14 relative rounded-xl shadow-xl overflow-hidden group-hover:scale-105 group-hover:ring-2 group-hover:ring-yellow-400 transition-all duration-300 bg-[#00A8E1] flex items-center justify-center">
                                       {/* Prime Video Icon / Play Arrow */}
                                       <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                                   </div>
                                   <span className="text-[10px] uppercase font-bold text-yellow-500 max-w-[70px] truncate text-center group-hover:text-yellow-400 transition-colors tracking-tighter">Prime Video</span>
                               </a>
                           </div>
                        ) : (
                           <a 
                               href={`https://www.google.com/search?q=watch+${encodeURIComponent(details.title)}`}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="inline-flex items-center gap-3 px-6 py-4 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-2xl transition-all group"
                           >
                               <div className="w-10 h-10 flex items-center justify-center bg-indigo-500/20 rounded-full text-indigo-400 group-hover:scale-110 transition-transform">
                                   <Globe size={20} />
                               </div>
                               <div className="flex flex-col text-left">
                                   <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">Find on Google Search</span>
                                   <span className="text-xs text-indigo-300/60">Check theater and streaming availability</span>
                               </div>
                           </a>
                        )}
                    </motion.div>

                {/* Monetization: Affiliate / Merch Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4 pt-4 border-t border-white/5"
                >
                     <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <ShoppingBag size={20} className="text-pink-500" /> Collection & Merch
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        <a 
                            href={`https://www.amazon.com/s?k=${encodeURIComponent(details.title + " 4k uhd blu ray")}&tag=lumina-20`} // Example affiliate tag
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-5 py-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-xl transition-all group flex-1 sm:flex-none justify-center"
                        >
                            <span className="p-2 bg-pink-500/10 rounded-lg text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                                <ShoppingBag size={18} />
                            </span>
                            <div className="flex flex-col text-left">
                                <span className="text-sm font-bold text-white">Buy Physical Media</span>
                                <span className="text-[10px] text-zinc-400">{details.title} 4K & Blu-ray</span>
                            </div>
                        </a>
                         <a 
                            href={`https://www.amazon.com/s?k=${encodeURIComponent(details.title + " movie poster")}&tag=lumina-20`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-5 py-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-xl transition-all group flex-1 sm:flex-none justify-center"
                        >
                            <span className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                <Search size={18} />
                            </span>
                             <div className="flex flex-col text-left">
                                <span className="text-sm font-bold text-white">Find Posters</span>
                                <span className="text-[10px] text-zinc-400">Original artwork & prints</span>
                            </div>
                        </a>
                    </div>
                </motion.div>
    
                    {/* Cast */}
                    {details.credits?.cast?.length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                             <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <User size={20} className="text-indigo-400" /> Leading Cast
                            </h3>
                            <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar snap-x">
                                {details.credits.cast.slice(0, 10).map((actor) => (
                                    <a 
                                        key={actor.id} 
                                        href={`https://www.google.com/search?q=watch+${encodeURIComponent(details.title)}+movie+${encodeURIComponent(actor.name)}+cast`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all group flex-shrink-0 w-40 snap-start"
                                        title={`Search ${actor.name}`}
                                    >
                                        <div className="aspect-[2/3] w-full rounded-xl overflow-hidden bg-zinc-800 mb-3 shadow-lg">
                                            {actor.profile_path ? (
                                                 <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700">
                                                    <Image 
                                                       src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                                                       alt={actor.name}
                                                       fill
                                                       className="object-cover"
                                                       sizes="160px"
                                                     />
                                                 </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-700">
                                                    <User size={48} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-white font-bold text-sm truncate group-hover:text-indigo-400 transition-colors">{actor.name}</p>
                                            <p className="text-zinc-500 text-xs truncate uppercase tracking-tighter mb-2">{actor.character}</p>
                                            <p className="text-[10px] text-zinc-300 opacity-60 flex items-center gap-1">Search ↗</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
