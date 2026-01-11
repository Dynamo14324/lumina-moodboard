import { Metadata } from 'next';
import { fetchMovieDetails } from '@/lib/api';
import { LuminaClient } from './LuminaClient';
import { Suspense } from 'react';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const movieId = params.movie ? Number(params.movie) : null;

  if (movieId) {
    const details = await fetchMovieDetails(movieId);
    if (details) {
      const posterUrl = details.poster_path 
        ? (details.poster_path.startsWith('/') ? `https://image.tmdb.org/t/p/w780${details.poster_path}` : details.poster_path)
        : 'https://lumina-moodboard.vercel.app/og-image.jpg';

      return {
        title: `${details.title} | Lumina Discovery`,
        description: details.overview,
        openGraph: {
          title: details.title,
          description: details.overview,
          images: [{ url: posterUrl }],
          url: `https://lumina-moodboard.vercel.app/?movie=${movieId}`,
          type: 'video.movie',
        },
        twitter: {
          card: 'summary_large_image',
          title: details.title,
          description: details.overview,
          images: [posterUrl],
        }
      };
    }
  }

  return {
    title: "Lumina | AI-Powered Cinematic Discovery",
    description: "Stop searching. Start feeling. Discover movies based on your emotional state.",
  };
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <LuminaClient />
    </Suspense>
  );
}
