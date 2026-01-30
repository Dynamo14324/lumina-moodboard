import { Movie } from "./types";

/**
 * AI Curator - Generates "AI-like" insights for movies based on their mood and metadata.
 * In a full production v2, this could be connected to an actual LLM API.
 * For now, we use a deterministic template system to ensure high performance and zero latency.
 */

const INSIGHT_TEMPLATES = {
  adrenaline: [
    "High-octane pacing that refuses to let up.",
    "Visceral action sequences that redefine the genre.",
    "A masterclass in tension and release.",
    "Pure kinetic energy from start to finish.",
    "The stunt work here is absolutely legendary.",
    "Heart-pounding intensity that demands your full attention.",
    "A relentless thrill ride of cinematic proportions.",
    "Explosive, dynamic, and impossible to look away from."
  ],
  ethereal: [
    "A dreamlike visual language that transcends reality.",
    "Soaked in atmosphere and haunting beauty.",
    "The score creates a floating, otherworldly experience.",
    "A visual poem that speaks to the subconscious.",
    "Stylistically daring and hypnotic.",
    "Surreal imagery that lingers long after the credits roll.",
    "A delicate balance of light, shadow, and deep emotion.",
    "Cinematography that feels like a lucid dream."
  ],
  melancholy: [
    "A profound exploration of grief and longing.",
    "Quietly devastating performance from the lead.",
    "The color palette reflects a deep emotional weight.",
    "A beautiful meditation on the human condition.",
    "Poignant, raw, and deeply affecting.",
    "A story that finds beauty in sadness.",
    "Emotionally resonant and achingly real.",
    "A tender look at the fragility of life."
  ],
  wholesome: [
    "Undeniably heartwarming and optimistic.",
    "A perfect remedy for a cynical world.",
    "Radiates pure joy and human connection.",
    "Charmingly executed with a brilliant ensemble.",
    "Guaranteed to leave you with a smile.",
    "A feel-good masterpiece that lifts the spirit.",
    "Celebrating the best parts of humanity.",
    "Gentle, kind, and wonderfully life-affirming."
  ],
  cerebral: [
    "A mind-bending puzzle that demands attention.",
    "Philosophically rich and narratively complex.",
    "Challenges your perception of reality.",
    "A brilliant deconstruction of genre tropes.",
    "Intellectually stimulating narrative layers.",
    "A film that invites you to question everything.",
    "Intricate storytelling that rewards multiple viewings.",
    "A psychological deep dive into the unknown."
  ],
  hustle: [
    "A manual for those who crave power and success.",
    "Showcases the relentless drive for the top.",
    "A brutal look at the cost of ambition.",
    "High-stakes negotiation and corporate warfare.",
    "Inspiring for anyone building an empire.",
    "Gritty, determined, and unapologetically bold.",
    "The ultimate story of rising against the odds.",
    " fueled by pure grit and determination."
  ],
  dark: [
    "Unrelenting psychological terror.",
    "A descent into madness and fear.",
    "Atmospheric horror that gets under your skin.",
    "Masterful use of shadow and suspense.",
    "Not for the faint of heart.",
    "A chilling vision of darkness and dread.",
    "Disturbing, gripping, and visually striking.",
    "Explores the darkest corners of the human psyche."
  ],
  romance: [
    "A chemistry that lights up the screen.",
    "Heart-wrenching and beautifully told.",
    "Captures the euphoria of falling in love.",
    "A timeless story of connection.",
    "Passion that transcends the screen.",
    "An intimate portrayal of love in all its forms.",
    "Sweet, sincere, and deeply romantic.",
    "A love story that feels both modern and classic."
  ],
  default: [
    "Critics praised the bold directorial choices.",
    "A standout entry in modern cinema.",
    "Visually stunning and narratively gripping.",
    "A perfect match for your current vibe.",
    "Cinematography that demands the big screen.",
    "A compelling narrative with strong performances.",
    "A unique voice in a crowded landscape.",
    "Shows the true power of visual storytelling."
  ]
};

export function generateAIInsight(movie: Movie, moodId: string | null): string {
  const templates = INSIGHT_TEMPLATES[moodId as keyof typeof INSIGHT_TEMPLATES] || INSIGHT_TEMPLATES.default;
  // Deterministic-ish random based on movie ID to keep it stable for the same movie
  const index = movie.id % templates.length;
  return templates[index];
}
