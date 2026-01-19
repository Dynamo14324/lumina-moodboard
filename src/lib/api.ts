import { Movie, TMDBResponse, MovieDetails, WatchProvider } from './types';

const API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IS_SERVER = typeof window === 'undefined';

// Helper to construct URL based on environment
const getUrl = (path: string, tmdbEndpoint: string, params: Record<string, string> = {}) => {
  if (IS_SERVER) {
    // Server: Call TMDB directly
    const searchParams = new URLSearchParams({
      api_key: API_KEY || '',
      ...params
    });
    return `${BASE_URL}${tmdbEndpoint}?${searchParams.toString()}`;
  } else {
    // Client: Call local API proxy
    const searchParams = new URLSearchParams(params);
    return `/api${path}?${searchParams.toString()}`;
  }
};

export async function fetchMoviesByMood(endpoint: string, params: Record<string, string | number>, signal?: AbortSignal): Promise<Movie[]> {
  try {
    const stringParams = Object.entries(params).reduce((acc, [k, v]) => ({ ...acc, [k]: String(v) }), {} as Record<string, string>);
    
    // For discover, we map the generic endpoint to our /discover route
    const url = getUrl('/discover', endpoint, stringParams);

    const res = await fetch(url, {
        next: { revalidate: 3600 },
        signal
    });

    if (!res.ok) {
        throw new Error(`Fetch Error: ${res.statusText}`);
    }

    const data: TMDBResponse<Movie> | { results: Movie[] } = await res.json();
    return data.results.filter(m => m.backdrop_path);
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
       console.error("Fetch error:", error);
    }
    return [];
  }
}

export async function fetchMovieDetails(id: number): Promise<MovieDetails | null> {
  try {
    const url = getUrl(`/movie/${id}`, `/movie/${id}`, { append_to_response: 'videos,credits' });
    
    const res = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) throw new Error(`Fetch Error: ${res.statusText}`);

    const data: MovieDetails = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch details error:", error);
    return null;
  }
}

export async function fetchWatchProviders(id: number, region: string = "US"): Promise<WatchProvider[] | null> {
  try {
    if (IS_SERVER) {
        const url = getUrl('', `/movie/${id}/watch/providers`);
        const res = await fetch(url, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        const data = await res.json();
        return data.results?.[region]?.flatrate || data.results?.[region]?.buy || null;
    } else {
        // Client proxy simplifies the response to just the array
        const url = getUrl(`/movie/${id}/providers`, '', { region });
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.json();
    }
  } catch {
    return null;
  }
}
