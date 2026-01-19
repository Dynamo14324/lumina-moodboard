import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.2.0",
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    features: {
      apiProxy: true,
      syntheticData: true,
      tmdbConnection: !!(process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY)
    }
  });
}
