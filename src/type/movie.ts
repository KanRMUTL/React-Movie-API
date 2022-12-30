export interface Movie {
  name: string;
  description: string;
  imageUrl: string;
}

export interface MovieResponse {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export interface MovieResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum MovieTypes {
  now_playing = "now_playing",
  popular = "popular",
  top_rated = "top_rated",
  upcoming = "upcoming",
}
