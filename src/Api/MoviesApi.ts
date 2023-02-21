class Api {
  nowPlaying: string;
  topRated: string;
  headers: string;
  pageNumber: string;

  constructor({ nowPlaying, topRated, headers, pageNumber }: any) {
    this.nowPlaying = nowPlaying;
    this.topRated = topRated;
    this.headers = headers;
    this.pageNumber = pageNumber;
  }

  getNowPlayingMovies(pageNumber: number) {
    return fetch(this.nowPlaying + pageNumber, {
      headers: {
        ...this.headers as {},
      },
    }).then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }

  getTopRatedMovies(pageNumber: number) {
    return fetch(this.topRated + pageNumber, {
      headers: {
        ...this.headers as {},
      },
    }).then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }
}

export const MoviesApi = new Api({
  nowPlaying: 'https://api.themoviedb.org/3/movie/now_playing?api_key=3046e4e04c3ba6240edd1d3c6eb2d4ad&language=en-US&page=',
  topRated: 'https://api.themoviedb.org/3/movie/top_rated?api_key=3046e4e04c3ba6240edd1d3c6eb2d4ad&language=en-US&page=',
  headers: {
    "Content-Type": "application/json",
  }
})