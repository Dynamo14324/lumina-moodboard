export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  ai_insight?: string;
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieDetails extends Movie {
  runtime: number;
  videos: {
    results: MovieVideo[];
  };
  credits: {
    cast: CastMember[];
  };
  // We might get genres as objects in details endpoint, distinct from genre_ids
  genres: { id: number; name: string }[];
}

export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface Mood {
  id: string;
  emoji: string;
  label: string;
  description: string;
  gradient: string;
  query_params: Record<string, string | number>;
}

export interface TMDBResponse<T> {
  results: T[];
  page: number;
  total_results: number;
  total_pages: number;
}
