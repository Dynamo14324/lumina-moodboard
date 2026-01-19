import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const BASE_URL = 'https://api.themoviedb.org/3';

// Full Synthetic Data (moved from client)
const SYNTHETIC_MOVIES = [
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

// Validation Schema for Query params
const querySchema = z.object({
  language: z.string().optional().default("en-US"),
  region: z.string().optional().default("US"),
  sort_by: z.string().optional(),
  with_genres: z.string().optional(),
  "vote_average.gte": z.string().optional(),
  page: z.string().optional().default("1"),
});

export async function GET(request: NextRequest) {
  const API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const { searchParams } = new URL(request.url);
  const rawParams = Object.fromEntries(searchParams.entries());

  // Validate Input
  const result = querySchema.safeParse(rawParams);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid parameters", details: result.error.flatten() }, { status: 400 });
  }

  const params = result.data;

  // Fallback if no API Key
  if (!API_KEY) {
     // Simulate network delay
     await new Promise(resolve => setTimeout(resolve, 500));
     // Return shuffled synthetic data
     const shuffled = [...SYNTHETIC_MOVIES].sort(() => Math.random() - 0.5);
     return NextResponse.json({ results: shuffled });
  }

  try {
    const tmdbParams = new URLSearchParams({
      api_key: API_KEY,
      include_adult: 'false',
      include_video: 'false',
      ...params
    });

    const res = await fetch(`${BASE_URL}/discover/movie?${tmdbParams.toString()}`, {
        next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
        return NextResponse.json({ error: `TMDB Error: ${res.statusText}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Discovery API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
