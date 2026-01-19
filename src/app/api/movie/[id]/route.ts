import { NextRequest, NextResponse } from "next/server";
import { MovieDetails } from "@/lib/types";

const API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Simplified synthetic data for details (matching the discovery one + extra fields)
const SYNTHETIC_DETAILS_MAP: Record<number, MovieDetails> = {
  101: {
      id: 101, 
      title: "Blade Runner 2049", 
      overview: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.", 
      poster_path: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", 
      backdrop_path: "/ilRyASD87jdVqmJWPk59EScn0o0.jpg",
      release_date: "2017-10-04",
      vote_average: 8.2,
      genre_ids: [878, 18],
      genres: [{ id: 878, name: "Science Fiction" }, { id: 18, name: "Drama" }],
      runtime: 164,
      videos: { results: [{ id: "v1", name: "Trailer 1", key: "gCcx85zbxz4", site: "YouTube", type: "Trailer" }] },
      credits: { 
        cast: [{ id: 1, name: "Ryan Gosling", character: "K", profile_path: null }],
        crew: [{ id: 2, name: "Denis Villeneuve", job: "Director", department: "Directing" }]
      }
  },
  102: {
    id: 102, 
    title: "Interstellar", 
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.", 
    poster_path: "/gEU2QniL6E8ahDaNBADBzOLD9J4.jpg", 
    backdrop_path: "/pbrkL804c8yAv3zBZRJoSOBEanu.jpg",
    release_date: "2014-11-05",
    vote_average: 8.4,
    genre_ids: [12, 18, 878],
    genres: [{ id: 12, name: "Adventure" }, { id: 18, name: "Drama" }, { id: 878, name: "Science Fiction" }],
    runtime: 169,
    videos: { results: [{ id: "v2", name: "Trailer 1", key: "zSWdZVtXT7E", site: "YouTube", type: "Trailer" }] },
    credits: { 
        cast: [{ id: 3, name: "Matthew McConaughey", character: "Cooper", profile_path: null }],
        crew: [{ id: 4, name: "Christopher Nolan", job: "Director", department: "Directing" }]
      }
  }
  // Add others if needed or generic fallback
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movieId = Number(id);

  if (!API_KEY) {
      const synthetic = SYNTHETIC_DETAILS_MAP[movieId] || SYNTHETIC_DETAILS_MAP[101]; // Default to one
      return NextResponse.json(synthetic);
  }

  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`, {
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        if (res.status === 404) return NextResponse.json({ error: "Movie not found" }, { status: 404 });
        return NextResponse.json({ error: `TMDB Error: ${res.statusText}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Details API Error for ID ${id}:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
