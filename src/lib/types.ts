export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
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
