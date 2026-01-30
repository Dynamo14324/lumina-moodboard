import { User } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CastListProps {
  cast: CastMember[];
  movieTitle: string;
}

export function CastList({ cast, movieTitle }: CastListProps) {
  if (!cast || cast.length === 0) return null;

  return (
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
            {cast.slice(0, 10).map((actor) => (
                <a 
                    key={actor.id} 
                    href={`https://www.google.com/search?q=watch+${encodeURIComponent(movieTitle)}+movie+${encodeURIComponent(actor.name)}+cast`}
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
  );
}
