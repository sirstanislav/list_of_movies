export type IMovieData = {
  page?: string,
  results: ResultOfIMoviesData[]
  dates?: DatesOfIResultOfIMoviesData
  total_pages?: number;
  total_results?: number;
}

type ResultOfIMoviesData = {
  poster_path?: string,
  adult: boolean,
  overview: string,
  release_date: string,
  genre_ids: number[];
  id: number;
  original_title: string,
  original_language: string,
  title: string,
  backdrop_path?: string,
  popularity: number,
  vote_count: number,
  video: boolean,
  vote_average: number,
}

type DatesOfIResultOfIMoviesData = {
  maximum: string,
  minimum: string,
}