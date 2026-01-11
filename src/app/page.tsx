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
      const imageUrl = details.backdrop_path 
        ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
        : details.poster_path 
          ? `https://image.tmdb.org/t/p/w780${details.poster_path}`
          : 'https://lumina-moodboard.vercel.app/og-image.jpg';

      return {
        title: `${details.title} | Lumina AI`,
        description: `🎬 Watch "${details.title}" - Discover why this movie matches your current mood on Lumina.`,
        openGraph: {
          title: `🍿 Must Watch: ${details.title}`,
          description: details.overview,
          images: [
            { 
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: details.title 
            }
          ],
          url: `https://lumina-moodboard.vercel.app/?movie=${movieId}`,
          type: 'video.movie',
          siteName: 'Lumina | AI-Powered Cinematic Discovery',
          locale: 'en_US',
        },
        twitter: {
          card: 'summary_large_image',
          title: details.title,
          description: details.overview,
          images: [imageUrl],
          creator: '@ArchitectZero',
        },
        other: {
          'apple-mobile-web-app-title': 'Lumina',
        }
      };
    }
  }

  return {
    title: "Lumina | AI-Powered Cinematic Discovery",
    description: "Stop searching. Start feeling. Discover movies based on your emotional state with Lumina's AI mood curator.",
    openGraph: {
        title: "Lumina",
        description: "AI-Powered Cinematic Discovery",
        images: ["https://lumina-moodboard.vercel.app/og-image.jpg"], // Ensure this exists or use a default
    }
  };
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <LuminaClient />
    </Suspense>
  );
}
