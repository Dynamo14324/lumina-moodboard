import { Movie } from "./types";

const INSIGHT_TEMPLATES = {
  adrenaline: [
    "High-octane pacing that refuses to let up.",
    "Visceral action sequences that redefine the genre.",
    "A masterclass in tension and release.",
    "Pure kinetic energy from start to finish.",
    "The stunt work here is absolutely legendary."
  ],
  ethereal: [
    "A dreamlike visual language that transcends reality.",
    "Soaked in atmosphere and haunting beauty.",
    "The score creates a floating, otherworldly experience.",
    "A visual poem that speaks to the subconscious.",
    "Stylistically daring and hypnotic."
  ],
  melancholy: [
    "A profound exploration of grief and longing.",
    "Quietly devastating performance from the lead.",
    "The color palette reflects a deep emotional weight.",
    "A beautiful meditation on the human condition.",
    "Poignant, raw, and deeply affecting."
  ],
  wholesome: [
    "Undeniably heartwarming and optimistic.",
    "A perfect remedy for a cynical world.",
    "Radiates pure joy and human connection.",
    "Charmingly executed with a brilliant ensemble.",
    "Guaranteed to leave you with a smile."
  ],
  cerebral: [
    "A mind-bending puzzle that demands attention.",
    "Philosophically rich and narratively complex.",
    "Challenges your perception of reality.",
    "A brilliant deconstruction of genre tropes.",
    "Intellectually stimulating narrative layers."
  ],
  hustle: [
    "A manual for those who crave power and success.",
    "Showcases the relentless drive for the top.",
    "A brutal look at the cost of ambition.",
    "High-stakes negotiation and corporate warfare.",
    "Inspiring for anyone building an empire."
  ],
  dark: [
    "Unrelenting psychological terror.",
    "A descent into madness and fear.",
    "Atmospheric horror that gets under your skin.",
    "Masterful use of shadow and suspense.",
    "Not for the faint of heart."
  ],
  romance: [
    "A chemistry that lights up the screen.",
    "Heart-wrenching and beautifully told.",
    "Captures the euphoria of falling in love.",
    "A timeless story of connection.",
    "Passion that transcends the screen."
  ],
  default: [
    "Critics praised the bold directorial choices.",
    "A standout entry in modern cinema.",
    "Visually stunning and narratively gripping.",
    "A perfect match for your current vibe.",
    "Cinematography that demands the big screen."
  ]
};

export function generateAIInsight(movie: Movie, moodId: string | null): string {
  const templates = INSIGHT_TEMPLATES[moodId as keyof typeof INSIGHT_TEMPLATES] || INSIGHT_TEMPLATES.default;
  // Deterministic-ish random based on movie ID to keep it stable for the same movie
  const index = movie.id % templates.length;
  return templates[index];
}
