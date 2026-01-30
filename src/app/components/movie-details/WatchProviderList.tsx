import { WatchProvider } from "@/lib/types";
import { Globe } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getAmazonAffiliateUrl } from "@/lib/affiliate";

interface WatchProviderListProps {
  providers: WatchProvider[] | null;
  movieTitle: string;
}

export function WatchProviderList({ providers, movieTitle }: WatchProviderListProps) {
  return (
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
                       href={`https://www.google.com/search?q=watch+${encodeURIComponent(movieTitle)}+on+${p.provider_name}`}
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
                   href={getAmazonAffiliateUrl(movieTitle)}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex flex-col items-center gap-3 group relative overflow-hidden rounded-2xl p-1"
                   aria-label={`Watch ${movieTitle} on Prime Video`}
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
               href={`https://www.google.com/search?q=watch+${encodeURIComponent(movieTitle)}`}
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
  );
}
