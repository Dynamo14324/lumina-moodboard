import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (!API_KEY) {
      // Synthetic providers
      return NextResponse.json([{ provider_id: 8, provider_name: "Netflix", logo_path: "/t2yyOvDNKLmqD78C9v40T6350f.jpg" }]);
  }

  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region") || "US";

  try {
    const res = await fetch(`${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`, {
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        return NextResponse.json({ error: `TMDB Error: ${res.statusText}` }, { status: res.status });
    }

    const data = await res.json();
    const providers = data.results?.[region]?.flatrate || data.results?.[region]?.buy || [];
    return NextResponse.json(providers);

  } catch (error) {
    console.error(`Providers API Error for ID ${id}:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
