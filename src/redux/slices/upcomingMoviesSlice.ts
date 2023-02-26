import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMovieData } from '../../interface/IMovieData';
import { all, put, takeLatest, select } from 'redux-saga/effects';
import { MoviesApi } from '../../api/MoviesApi';
import {
  SET_UPCOMING_MOVIES,
} from "../constant"

type UpcomingState = {
  results: Array<{}>
  error: string
  page: number
}

const initialState: UpcomingState = {
  results: [],
  error: '',
  page: 1,
}

const upcomingSlice = createSlice({
  name: 'upcomingSlice',
  initialState,
  reducers: {
    upcoming(state = initialState, action: PayloadAction<IMovieData>) {
      state.page = state.page + 1
      state.results = state.results.concat(action.payload.results)
      return state
    },
    setError(state = initialState, action: PayloadAction<UpcomingState>) {
      state.error = action.payload.error
      return state
    },
  }
})

export const upcomingSliceActions = {
  setUpcomingMovies: () => {
    return {
      type: SET_UPCOMING_MOVIES,
    }
  },
}

export function* getUpcomingMovies(action: { type: string }) {
  try {
    const page: number = yield select((state) => state.upcomingSlice.page)
    const data: IMovieData = yield MoviesApi.getUpcomingMovies(page);
    yield put(upcomingSlice.actions.upcoming(data))
  } catch (error) {
    yield put(upcomingSlice.actions.setError({
      error: 'Error fetch',
      results: [],
      page: 0
    }))
  }

}

export function* upcomingSaga() {
  yield all([
    takeLatest(SET_UPCOMING_MOVIES, getUpcomingMovies)
  ])
}

export default upcomingSlice