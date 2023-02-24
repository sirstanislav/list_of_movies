import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMovieData } from '../../interface/IMovieData';
import { all, put, takeLatest } from 'redux-saga/effects';
import { MoviesApi } from '../../api/MoviesApi';
import {
  SET_TOP_RATED_MOVIES,
  SET_FOUND_MOVIES
} from "../constant"

type TopRatedState = {
  results: Array<{}>
  error: string
}

const initialState: TopRatedState = {
  results: [],
  error: ''
}

const topRatedSlice = createSlice({
  name: 'topRatedSlice',
  initialState,
  reducers: {
    setStateTopRatedMovies(state = initialState, action: PayloadAction<IMovieData>) {
      state.results = state.results.concat(action.payload.results)
      return state
    },
    setError(state = initialState, action: PayloadAction<TopRatedState>) {
      state.error = action.payload.error
      return state
    },
  }
})

export const topRatedSliceActions = {
  setTopRatedMovies: (payload: { counter: number }) => {
    return {
      type: SET_TOP_RATED_MOVIES,
      payload
    }
  },
  setSearchMovies: (payload: { name: string, page: number }) => {
    return {
      type: SET_FOUND_MOVIES,
      payload
    }
  },
}

export function* getTopRatedMovies(action: { type: string, payload: { counter: number } }) {
  try {
    const data: IMovieData = yield MoviesApi.getTopRatedMovies(action.payload.counter);
    yield put(topRatedSlice.actions.setStateTopRatedMovies(data))
  } catch (error) {
    yield put(topRatedSlice.actions.setError({ results: [], error: 'Error fetch' }))
  }
}

export function* topRatedSaga() {
  yield all([
    takeLatest(SET_TOP_RATED_MOVIES, getTopRatedMovies),
  ])
}

export default topRatedSlice