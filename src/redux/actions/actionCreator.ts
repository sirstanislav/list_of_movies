import { GET_MORE_MOVIES, SET_MORE_MOVIES, UPCOMING_MOVIES } from "../constant"

export const getMoreMovies = (counter: number) => ({
  type: GET_MORE_MOVIES,
  counter
})

export const setMoreMovies = (payload: any) => ({
  type: SET_MORE_MOVIES,
  payload
})

export const Upcoming = (payload: any) => ({
  type: UPCOMING_MOVIES,
  payload
})