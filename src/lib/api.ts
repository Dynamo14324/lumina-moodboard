import { Movie, TMDBResponse, MovieDetails, WatchProvider } from './types';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Synthetic Data for "God Mode" fallback
const SYNTHETIC_MOVIES: Movie[] = [
  { 
    id: 101, 
    title: "Blade Runner 2049", 
    overview: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.", 
    poster_path: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", 
    backdrop_path: "/ilRyASD87jdVqmJWPk59EScn0o0.jpg",
    release_date: "2017-10-04",
    vote_average: 8.2,
    genre_ids: [878, 18, 53]
  },
  { 
    id: 102, 
    title: "Interstellar", 
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.", 
    poster_path: "/gEU2QniL6E8ahDaNBADBzOLD9J4.jpg", 
    backdrop_path: "/pbrkL804c8yAv3zBZRJoSOBEanu.jpg",
    release_date: "2014-11-05",
    vote_average: 8.4,
    genre_ids: [12, 18, 878]
  },
  {
    id: 103,
    title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    release_date: "2024-02-27",
    vote_average: 8.3,
    genre_ids: [878, 12]
  },
  {
      id: 104,
      title: "Arrival",
      overview: "Taking place after alien crafts land around the world, an expert linguist is recruited by the military to determine whether they come in peace or are a threat.",
      poster_path: "/p1PT6UMYBPk3Tdd1G31q8d3F8dE.jpg",
      backdrop_path: "/yN5c8C1X64w4sWqK43J7d4p1I0.jpg",
      release_date: "2016-11-10",
      vote_average: 7.6,
      genre_ids: [18, 878, 9648]
  },
   {
      id: 105,
      title: "The Grand Budapest Hotel",
      overview: "The Grand Budapest Hotel tells of a legendary concierge at a famous European hotel between the wars and his friendship with a young employee who becomes his trusted protégé.",
      poster_path: "/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg",
      backdrop_path: "/q7fXcrDPJcf6t3rxDmrcp76Br5Z.jpg",
      release_date: "2014-02-26",
      vote_average: 8.0,
      genre_ids: [35, 18]
  }
];

export async function fetchMoviesByMood(endpoint: string, params: Record<string, string | number>): Promise<Movie[]> {
  if (!API_KEY) {
    console.warn("⚠️ API Key missing. Using Synthetic Data.");
    // Simulate delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));
    // Shuffle slightly to feel dynamic
    return [...SYNTHETIC_MOVIES].sort(() => Math.random() - 0.5);
  }

  try {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      language: params.language ? String(params.language) : 'en-US',
      region: params.region ? String(params.region) : 'US',
      include_adult: 'false',
      include_video: 'false',
      page: '1',
      ...Object.entries(params).reduce((acc, [k, v]) => ({ ...acc, [k]: String(v) }), {})
    });

    const res = await fetch(`${BASE_URL}${endpoint}?${searchParams.toString()}`, {
        next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
        throw new Error(`TMDB Error: ${res.statusText}`);
    }

    const data: TMDBResponse<Movie> = await res.json();
    return data.results.filter(m => m.backdrop_path); // Filter only high-quality assets
  } catch (error) {
    console.error("Fetch error:", error);
    return SYNTHETIC_MOVIES; // Fallback on error
  }
}

export async function fetchMovieDetails(id: number): Promise<MovieDetails | null> {
  if (!API_KEY) {
    // Return a synthetic detail object for God Mode
    const synthetic = SYNTHETIC_MOVIES.find(m => m.id === id);
    if (!synthetic) return null;
    return {
      ...synthetic,
      runtime: 120,
      videos: { results: [{ key: "dQw4w9WgXcQ", site: "YouTube", type: "Trailer", name: "Official Trailer", id: "1" }] },
      credits: { cast: [{ id: 1, name: "Ryan Gosling", character: "K", profile_path: null }] },
      genres: [{ id: 878, name: "Science Fiction" }]
    };
  }

  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) throw new Error(`TMDB Error: ${res.statusText}`);

    const data: MovieDetails = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch details error:", error);
    return null;
  }
}

export async function fetchWatchProviders(id: number, region: string = "US"): Promise<WatchProvider[] | null> {
  if (!API_KEY) return [];

  try {
    const res = await fetch(`${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`, {
       next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.results?.[region]?.flatrate || data.results?.[region]?.buy || null;
  } catch {
    return null;
  }
}
