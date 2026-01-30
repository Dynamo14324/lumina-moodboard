
import { ImageResponse } from 'next/og';
import { MOODS } from '@/lib/constants';

import { styles } from './styles';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const moodId = searchParams.get('mood');
  const mood = MOODS.find(m => m.id === moodId);

  // Default config if no mood selected
  const label = mood ? mood.label : 'Lumina';
  const emoji = mood ? mood.emoji : '✨';
  const description = mood ? mood.description : 'AI-Powered Cinematic Discovery';
  
  // Dynamic gradient based on mood (Tailwind classes don't work here, need raw CSS or style objects)
  // Mapping Tailwind gradients to hex approximations
  const gradients: Record<string, string> = {
    adrenaline: 'linear-gradient(to bottom right, #f97316, #dc2626)', // orange-500 to red-600
    ethereal: 'linear-gradient(to bottom right, #a855f7, #4f46e5)', // purple-500 to indigo-600
    melancholy: 'linear-gradient(to bottom right, #1d4ed8, #1e293b)', // blue-700 to slate-800
    wholesome: 'linear-gradient(to bottom right, #f472b6, #fb7185)', // pink-400 to rose-400
    cerebral: 'linear-gradient(to bottom right, #10b981, #0f766e)', // emerald-500 to teal-700
    hustle: 'linear-gradient(to bottom right, #16a34a, #064e3b)', // green-600 to emerald-900
    dark: 'linear-gradient(to bottom right, #18181b, #000000)', // zinc-900 to black
    romance: 'linear-gradient(to bottom right, #ef4444, #db2777)', // red-500 to pink-600
  };

  const gradient = (mood && gradients[mood.id]) ? gradients[mood.id] : 'linear-gradient(to bottom right, #6366f1, #a855f7)';

  return new ImageResponse(
    (
      <div style={styles.container}>
        {/* Background Gradient Mesh */}
        <div style={styles.getBackgroundStyle(gradient)} />

        <div style={styles.contentWrapper}>
            {/* dynamic emoji */}
            <div style={styles.emojiContainer}>
                {emoji}
            </div>
            <h1 style={styles.title}>
                {label}
            </h1>
        </div>

        <p style={styles.description}>
            {description}
        </p>

        {mood && (
             <div style={styles.footer}>
             <span>Popcorn ready?</span>
             <span style={styles.url}>lumina-moodboard.vercel.app</span>
         </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}


