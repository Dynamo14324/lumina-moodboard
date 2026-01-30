import { ShoppingBag, Search } from "lucide-react";
import { motion } from "framer-motion";
import { MonetizationConfig } from "@/lib/monetization";

interface MerchSectionProps {
  movieTitle: string;
}

export function MerchSection({ movieTitle }: MerchSectionProps) {
  const amazonTag = MonetizationConfig.affiliate.amazonTag;

  return (
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
                href={`https://www.amazon.com/s?k=${encodeURIComponent(movieTitle + " 4k uhd blu ray")}&tag=${amazonTag}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 bg-zinc-800 hover:bg-zinc-700 border border-white/10 rounded-xl transition-all group flex-1 sm:flex-none justify-center"
            >
                <span className="p-2 bg-pink-500/10 rounded-lg text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                    <ShoppingBag size={18} />
                </span>
                <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white">Buy Physical Media</span>
                    <span className="text-[10px] text-zinc-400">{movieTitle} 4K & Blu-ray</span>
                </div>
            </a>
             <a 
                href={`https://www.amazon.com/s?k=${encodeURIComponent(movieTitle + " movie poster")}&tag=${amazonTag}`}
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
  );
}
