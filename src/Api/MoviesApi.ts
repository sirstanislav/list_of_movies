class Api {
  nowPlayingMovies: string;
  topRatedMovies: string;
  upcomingMovies: string;
  headers: string;
  page: string;

  constructor({ headers, page, upcomingMovies, topRatedMovies, nowPlayingMovies }: any) {
    this.headers = headers;
    this.page = page;
    this.upcomingMovies = upcomingMovies;
    this.topRatedMovies = topRatedMovies;
    this.nowPlayingMovies = nowPlayingMovies;
  }

  async getNowPlayingMovies(page: number) {
    const res = await fetch(this.nowPlayingMovies + page, {
      headers: {
        ...this.headers as {},
      },
    });
    return await (res.ok ? res.json() : Promise.reject(res.status));
  }

  async getTopRatedMovies(page: number) {
    const res = await fetch(this.topRatedMovies + page, {
      headers: {
        ...this.headers as {},
      },
    });
    return await (res.ok ? res.json() : Promise.reject(res.status));
  }

  async getUpcomingMovies(page: number) {
    const res = await fetch(this.upcomingMovies + page, {
      headers: {
        ...this.headers as {},
      },
    });
    return await (res.ok ? res.json() : Promise.reject(res.status));
  }

  async getSerchingMovies(value: string, page: number) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3046e4e04c3ba6240edd1d3c6eb2d4ad&language=en-US&query=${value}&page=${page}&include_adult=true`, {
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