class Api {
  nowPlayingMovies: string;
  topRatedMovies: string;
  upcomingMovies: string;
  headers: string;
  pageNumber: string;

  constructor({ nowPlayingMovies, topRatedMovies, upcomingMovies, headers, pageNumber }: any) {
    this.nowPlayingMovies = nowPlayingMovies;
    this.topRatedMovies = topRatedMovies;
    this.upcomingMovies = upcomingMovies;
    this.headers = headers;
    this.pageNumber = pageNumber;
  }

  async getNowPlayingMovies(pageNumber: number) {
    const res = await fetch(this.nowPlayingMovies + pageNumber, {
      headers: {
        ...this.headers as {},
      },
    });
    return await (res.ok ? res.json() : Promise.reject(res.status));
  }

  async getTopRatedMovies(pageNumber: number) {
    const res = await fetch(this.topRatedMovies + pageNumber, {
      headers: {
        ...this.headers as {},
      },
    });
    return await (res.ok ? res.json() : Promise.reject(res.status));
  }

  async getUpcomingMovies(pageNumber: number) {
    const res = await fetch(this.upcomingMovies + pageNumber, {
      headers: {
        ...this.headers as {},
      },
    });
    return await (res.ok ? res.json() : Promise.reject(res.status));
  }
}

export const MoviesApi = new Api({
  nowPlayingMovies: 'https://api.themoviedb.org/3/movie/now_playing?api_key=3046e4e04c3ba6240edd1d3c6eb2d4ad&language=en-US&page=',
  topRatedMovies: 'https://api.themoviedb.org/3/movie/top_rated?api_key=3046e4e04c3ba6240edd1d3c6eb2d4ad&language=en-US&page=',
  upcomingMovies: 'https://api.themoviedb.org/3/movie/upcoming?api_key=3046e4e04c3ba6240edd1d3c6eb2d4ad&language=en-US&page=',
  headers: {
    "Content-Type": "application/json",
  }
})