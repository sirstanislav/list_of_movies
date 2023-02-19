class Api {
  baseUrl: string;
  headers: string;
  pageNumber: string;

  constructor({ baseUrl, headers, pageNumber }: any) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.pageNumber = pageNumber;
  }

  getMovies(pageNumber: string) {
    // console.log("getMOvies:", this.baseUrl + pageNumber)
    return fetch(this.baseUrl + pageNumber, {
      headers: {
        ...this.headers as {},
      },
    }).then((res) => res.ok ? res.json() : Promise.reject(res.status))
  }
}

export const MoviesApi = new Api({
  baseUrl: 'https://api.themoviedb.org/3/movie/now_playing?api_key=3046e4e04c3ba6240edd1d3c6eb2d4ad&language=en-US&page=',
  headers: {
    "Content-Type": "application/json",
  }
})