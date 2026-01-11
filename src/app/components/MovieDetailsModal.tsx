"use client";

import { useEffect, useState } from "react";
import { X, Play, User, Calendar, Star, Clock, Heart } from "lucide-react";
import { MovieDetails } from "@/lib/types";
import { fetchMovieDetails, fetchWatchProviders } from "@/lib/api";
import { WatchProvider } from "@/lib/types";
import { Share2, Globe } from "lucide-react";
import Image from "next/image";

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
    const posterUrl = details.poster_path ? (details.poster_path.startsWith('/') ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : details.poster_path) : '';
    const shareText = `🍿 Check out "${details.title}" on Lumina!\n\n"${details.overview}"\n\n${posterUrl ? `🖼️ Poster: ${posterUrl}\n\n` : ''}Discover more on Lumina Moodboard:\n`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Lumina | ${details.title}`,
          text: shareText,
          url: url,
        });
      } else {
        await navigator.clipboard.writeText(`${shareText}${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
        // Minimal fallback
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

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
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
               <Image 
                 src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`} 
                 alt={details.title}
                 fill
                 className="object-cover"
                 sizes="(max-width: 768px) 100vw, 80vw"
                 priority
               />
               <button 
                 onClick={onClose}
                 className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-white/20 rounded-full transition-colors text-white"
                 aria-label="Close details"
                 title="Close details"
               >
                 <X size={24} />
               </button>
               
               <button 
                 onClick={handleShare}
                 className="absolute top-4 right-16 z-20 p-2 bg-black/40 hover:bg-white/20 rounded-full transition-colors text-white flex items-center gap-2"
                 title="Copy Link"
                 aria-label="Share this movie"
               >
                 <Share2 size={24} />
                 {copied && <span className="text-xs font-semibold bg-green-500 px-2 py-1 rounded-full animate-bounce">Copied!</span>}
               </button>

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
                   className="absolute top-4 right-28 z-20 p-2 bg-black/40 hover:bg-white/20 rounded-full transition-all text-white group"
                   title={details && isInWatchlist(Number(details.id)) ? "Remove from Stash" : "Add to Stash"}
                   aria-label={details && isInWatchlist(Number(details.id)) ? "Remove from Stash" : "Add to Stash"}
                >
                   <Heart 
                      size={24} 
                      className={`transition-all duration-300 ${details && isInWatchlist(Number(details.id)) ? "fill-red-500 text-red-500 scale-110" : "text-white group-hover:text-red-400"}`} 
                   />
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



                {/* Watch Providers */}
                {providers && providers.length > 0 ? (
                   <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                           <Globe size={20} className="text-blue-400" /> Where to Watch
                       </h3>
                       <div className="flex flex-wrap gap-4">
                           {providers.map((p) => (
                               <a 
                                   key={p.provider_id} 
                                   href={`https://www.google.com/search?q=watch+${encodeURIComponent(details.title)}+on+${p.provider_name}`}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="flex flex-col items-center gap-2 group cursor-pointer"
                                   title={`Watch on ${p.provider_name}`}
                               >
                                   <div className="w-12 h-12 relative rounded-lg shadow-md overflow-hidden group-hover:scale-110 transition-transform bg-zinc-800">
                                       <Image 
                                         src={`https://image.tmdb.org/t/p/original${p.logo_path}`} 
                                         alt={p.provider_name}
                                         fill
                                         className="object-cover"
                                         sizes="48px"
                                       />
                                   </div>
                                   <span className="text-xs text-zinc-400 max-w-[60px] truncate text-center group-hover:text-white transition-colors">{p.provider_name}</span>
                               </a>
                           ))}
                       </div>
                   </div>
                ) : (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                           <Globe size={20} className="text-blue-400" /> Where to Watch
                       </h3>
                       <a 
                           href={`https://www.google.com/search?q=watch+${encodeURIComponent(details.title)}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
                       >
                           <div className="w-8 h-8 flex items-center justify-center bg-blue-500/20 rounded-full text-blue-400 group-hover:scale-110 transition-transform">
                               <Globe size={16} />
                           </div>
                               <div className="flex flex-col">
                               <span className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">Find &quot;{details.title}&quot; on Google</span>
                               <span className="text-xs text-zinc-500">Check availability</span>
                           </div>
                       </a>
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
                                <a 
                                    key={actor.id} 
                                    href={`https://www.google.com/search?q=watch+${encodeURIComponent(details.title)}+movie+${encodeURIComponent(actor.name)}+cast`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group block cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                    title={`Watch ${details.title} movie ${actor.name} cast`}
                                >
                                    <div className="aspect-[2/3] w-full rounded-md overflow-hidden bg-gray-800 mb-2">
                                        {actor.profile_path ? (
                                             <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                                                <Image 
                                                   src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                                                   alt={actor.name}
                                                   fill
                                                   className="object-cover"
                                                   sizes="(max-width: 768px) 50vw, 20vw"
                                                 />
                                             </div>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/20">
                                                <User size={32} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-white font-medium text-sm truncate group-hover:text-primary-400 transition-colors">{actor.name}</p>
                                        <p className="text-white/50 text-xs truncate">{actor.character}</p>
                                        <p className="text-[10px] text-zinc-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Search on Google ↗</p>
                                    </div>
                                </a>
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
