import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMovieData } from '../../interface/IMovieData';
import { all, put, select, takeLatest } from 'redux-saga/effects';
import { MoviesApi } from '../../api/MoviesApi';
import {
  SET_FOUND_MOVIES,
  ADD_MORE_FOUND_MOVIES
} from "../constant"

const initialState: IMovieData = {
  results: [],
  value: "",
  page: 1
}

const foundMoviesSlice = createSlice({
  name: 'foundMoviesSlice',
  initialState,
  reducers: {
    firstLoad(state, action: PayloadAction<IMovieData>) {
      state.page = 1
      state.value = action.payload.value
      state.results = action.payload.results
      return state
    },
    addMore(state = initialState, action: PayloadAction<IMovieData>) {
      state.page = state.page + 1
      state.value = action.payload.value
      state.results = state.results.concat(action.payload.results.filter((item) => !state.results.includes(item)))
      return state
    },
  }
})

export const foundMoviesSliceAction = {
  firstLoad: (payload: { value: string }): { type: typeof SET_FOUND_MOVIES, payload: { value: string } } => {
    return {
      type: SET_FOUND_MOVIES,
      payload
    }
  },
  addMore: (payload: { value: string }): { type: typeof ADD_MORE_FOUND_MOVIES, payload: { value: string } } => {
    return {
      type: ADD_MORE_FOUND_MOVIES,
      payload
    }
  },
}

export function* foundMoviesSaga() {
  yield all([
    takeLatest(SET_FOUND_MOVIES, getFoundMovies),
    takeLatest(ADD_MORE_FOUND_MOVIES, addMoreFoundMovies)
  ])
}

export function* getFoundMovies(action: { type: string, payload: { value: string } }) {
  const { ...data }: IMovieData = yield MoviesApi.getSerchingMovies(action.payload.value, 1);
  yield put(foundMoviesSlice.actions.firstLoad({ ...data, ...action.payload }))
}

export function* addMoreFoundMovies(action: { type: string, payload: { value: string } }) {
  const page: number = yield select((state) => state.foundMoviesSlice.page)
  const data: IMovieData = yield MoviesApi.getSerchingMovies(action.payload.value, page + 1);
  yield put(foundMoviesSlice.actions.addMore({ ...data, ...action.payload }))
}

export default foundMoviesSlice