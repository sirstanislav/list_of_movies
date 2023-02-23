import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMovieData } from '../../interface/IMovieData';
import { all, put, takeLatest } from 'redux-saga/effects';
import { MoviesApi } from '../../api/MoviesApi';
import {
  SET_UPCOMING_MOVIES,
} from "../constant"

type UpcomingState = {
  results: Array<{}>
}

const initialState: UpcomingState = {
  results: []
}

const upcomingSlice = createSlice({
  name: 'upcomingSlice',
  initialState,
  reducers: {
    upcoming(state = initialState, action: PayloadAction<IMovieData>) {
      state.results = state.results.concat(action.payload.results)
      return state
    },
  }
})

export const upcomingSliceActions = {
  setUpcomingMovies: (payload: { counter: number }) => {
    return {
      type: SET_UPCOMING_MOVIES,
      payload
    }
  },
}

export function* getUpcomingMovies(action: { type: string, payload: { counter: number } }) {
  const data: IMovieData = yield MoviesApi.getUpcomingMovies(action.payload.counter);
  yield put(upcomingSlice.actions.upcoming(data))
}

export function* upcomingSaga() {
  yield all([
    takeLatest(SET_UPCOMING_MOVIES, getUpcomingMovies)
  ])
}

export default upcomingSlice