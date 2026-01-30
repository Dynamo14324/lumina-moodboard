import { Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useShare } from "@/lib/hooks/useShare";

interface ShareButtonProps {
  movieTitle: string;
  movieOverview: string;
  movieId: number;
}

export function ShareButton({ movieTitle, movieOverview, movieId }: ShareButtonProps) {
  const { share, copied } = useShare();

  const handleShare = () => {
    const url = `${window.location.origin}?movie=${movieId}`;
    const shareTitle = `Lumina | ${movieTitle}`;
    const shareText = ` Found your next watch on Lumina!\n\n🍿 *${movieTitle}*\n"${movieOverview.substring(0, 100)}..."\n\n✨ Experience the mood here:\n`;
    
    share({
      title: shareTitle,
      text: shareText,
      url,
    });
  };

  return (
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
  );
}
