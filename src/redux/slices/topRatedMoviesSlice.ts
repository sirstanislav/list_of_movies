import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMovieData } from '../../interface/IMovieData';
import { all, put, takeLatest, select } from 'redux-saga/effects';
import { MoviesApi } from '../../api/MoviesApi';
import {
  SET_TOP_RATED_MOVIES,
} from "../constant"

type TopRatedState = {
  results: Array<{}>
  error: string
  page: number
}

const initialState: TopRatedState = {
  results: [],
  error: '',
  page: 1,
}

const topRatedSlice = createSlice({
  name: 'topRatedSlice',
  initialState,
  reducers: {
    setStateTopRatedMovies(state = initialState, action: PayloadAction<IMovieData>) {
      state.results = state.results.concat(action.payload.results)
      state.page = state.page + 1
      return state
    },
    setError(state = initialState, action: PayloadAction<TopRatedState>) {
      state.error = action.payload.error
      return state
    },
  }
})

export const topRatedSliceActions = {
  setTopRatedMovies: () => {
    return {
      type: SET_TOP_RATED_MOVIES,
    }
  }
}

export function* getTopRatedMovies(action: { type: string }) {
  try {
    const page: number = yield select((state) => state.topRatedSlice.page)
    const data: IMovieData = yield MoviesApi.getTopRatedMovies(page);
    yield put(topRatedSlice.actions.setStateTopRatedMovies(data))
  } catch (error) {
    yield put(topRatedSlice.actions.setError({
      error: 'Error fetch',
      results: [],
      page: 0
    }))
  }
}

export function* topRatedSaga() {
  yield all([
    takeLatest(SET_TOP_RATED_MOVIES, getTopRatedMovies),
  ])
}

export default topRatedSlice