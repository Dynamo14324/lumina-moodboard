import { Mood } from "./types";

export const MOODS: Mood[] = [
  { 
    id: "adrenaline", 
    emoji: "⚡", 
    label: "Adrenaline", 
    description: "High stakes. Fast pace.", 
    gradient: "from-orange-500 to-red-600",
    query_params: { with_genres: "28,53", sort_by: "popularity.desc" },
    shop_query: "action movie collectibles"
  },
  { 
    id: "ethereal", 
    emoji: "✨", 
    label: "Ethereal", 
    description: "Dreamlike. Otherworldly.", 
    gradient: "from-purple-500 to-indigo-600",
    query_params: { with_genres: "878,14", sort_by: "vote_average.desc" },
    shop_query: "ambient lighting projector"
  },
  { 
    id: "melancholy", 
    emoji: "🌧️", 
    label: "Melancholy", 
    description: "Reflective. Deep.", 
    gradient: "from-blue-700 to-slate-800",
    query_params: { with_genres: "18", "vote_average.gte": 8 },
    shop_query: "comfort blanket tea set"
  },
  { 
    id: "wholesome", 
    emoji: "❤️", 
    label: "Wholesome", 
    description: "Feel good. Uplifting.", 
    gradient: "from-pink-400 to-rose-400",
    query_params: { with_genres: "10751,35", sort_by: "popularity.desc" },
    shop_query: "Movie Night Snacks",
    affiliate_link: "https://www.amazon.in/alm/storefront?almBrandId=ctnow&linkCode=ll2&tag=yogeshjadha09-21&linkId=221ca9222f6e3d2ff54926d86d94de94&language=en_IN&ref_=as_li_ss_tl"
  },
  {
    id: "cerebral",
    emoji: "🔬",
    label: "Cerebral",
    description: "Complex. Mind-bending.",
    gradient: "from-emerald-500 to-teal-700",
    query_params: { with_genres: "9648,878", sort_by: "vote_average.desc" },
    shop_query: "puzzle box strategy games"
  },
  {
    id: "hustle",
    emoji: "💰",
    label: "Hustle",
    description: "Ambition. Power. Success.",
    gradient: "from-green-600 to-emerald-900",
    query_params: { with_keywords: "10714,12985", sort_by: "revenue.desc" },
    shop_query: "business strategy books biography" 
  },
  {
    id: "dark",
    emoji: "🌑",
    label: "Dark",
    description: "Tense. Terrifying.",
    gradient: "from-zinc-900 to-black",
    query_params: { with_genres: "27,53", sort_by: "popularity.desc" },
    shop_query: "horror movie posters led lights"
  },
  {
    id: "romance",
    emoji: "🌹",
    label: "Romance",
    description: "Passion. Connection.",
    gradient: "from-red-500 to-pink-600",
    query_params: { with_genres: "10749", sort_by: "popularity.desc" },
    shop_query: "date nights games and candles"
  }
];
