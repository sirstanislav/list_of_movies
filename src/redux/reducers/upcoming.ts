export const upcoming = async (page: number) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=3046e4e04c3ba6240edd1d3c6eb2d4ad&language=en-US&page=${page}`)
  return await res.json()
}