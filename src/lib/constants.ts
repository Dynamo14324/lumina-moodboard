import { Mood } from "./types";

export const MOODS: Mood[] = [
  { 
    id: "adrenaline", 
    emoji: "⚡", 
    label: "Adrenaline", 
    description: "High stakes. Fast pace.", 
    gradient: "from-orange-500 to-red-600",
    query_params: { with_genres: "28,53", sort_by: "popularity.desc" }
  },
  { 
    id: "ethereal", 
    emoji: "✨", 
    label: "Ethereal", 
    description: "Dreamlike. Otherworldly.", 
    gradient: "from-purple-500 to-indigo-600",
    query_params: { with_genres: "878,14", sort_by: "vote_average.desc" }
  },
  { 
    id: "melancholy", 
    emoji: "🌧️", 
    label: "Melancholy", 
    description: "Reflective. Deep.", 
    gradient: "from-blue-700 to-slate-800",
    query_params: { with_genres: "18", "vote_average.gte": 8 }
  },
  { 
    id: "wholesome", 
    emoji: "❤️", 
    label: "Wholesome", 
    description: "Feel good. Uplifting.", 
    gradient: "from-pink-400 to-rose-400",
    query_params: { with_genres: "10751,35", sort_by: "popularity.desc" }
  },
  {
    id: "cerebral",
    emoji: "🔬",
    label: "Cerebral",
    description: "Complex. Mind-bending.",
    gradient: "from-emerald-500 to-teal-700",
    query_params: { with_genres: "9648,878", sort_by: "vote_average.desc" }
  }
];
