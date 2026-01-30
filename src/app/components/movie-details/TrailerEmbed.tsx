import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface Video {
  key: string;
  site: string;
  type: string;
}

interface TrailerEmbedProps {
  videos?: { results: Video[] };
}

export function TrailerEmbed({ videos }: TrailerEmbedProps) {
  const trailer = videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  if (!trailer) return null;

  return (
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
  );
}
