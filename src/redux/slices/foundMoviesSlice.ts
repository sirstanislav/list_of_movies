import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMovieData } from '../../interface/IMovieData';
import { all, put, takeLatest } from 'redux-saga/effects';
import { MoviesApi } from '../../api/MoviesApi';
import {
  SET_FOUND_MOVIES,
  ADD_MORE_FOUND_MOVIES
} from "../constant"

type foundMovies = {
  results: Array<{}>
  value: string
}

const initialState: IMovieData = {
  results: [],
  value: ""
}

const foundMoviesSlice = createSlice({
  name: 'foundMoviesSlice',
  initialState,
  reducers: {
    firstLoad(state = initialState, action: PayloadAction<IMovieData>) {
      state.results = state.results.concat(action.payload.results.filter((item) => !state.results.includes(item)))
      state.value = action.payload.value!
      return state
    },
    // addMore(state = initialState, action: PayloadAction<IMovieData>) {
    //   state.results = state.results.filter(item => !action.payload.results.includes(item))
    //   return state
    // },
  }
})

export const foundMoviesSliceAction = {
  firstLoad: (payload: { value: string, counter: number }) => {
    return {
      type: SET_FOUND_MOVIES,
      payload
    }
  },
  addMore: (payload: { value: string, counter: number }) => {
    return {
      type: ADD_MORE_FOUND_MOVIES,
      payload
    }
  },
}

export function* foundMoviesSaga() {
  yield all([
    takeLatest(SET_FOUND_MOVIES, getFoundMovies),
    // takeLatest(ADD_MORE_FOUND_MOVIES, addMoreFoundMovies)
  ])

}

export function* getFoundMovies(action: { type: string, payload: { value: string, counter: number } }) {
  const { ...data }: IMovieData = yield MoviesApi.getSerchingMovies(action.payload.value, action.payload.counter);
  yield put(foundMoviesSlice.actions.firstLoad({ ...data, ...action.payload }))
}

// export function* addMoreFoundMovies(action: { type: string, payload: { value: string, counter: number } }) {
//   const data: IMovieData = yield MoviesApi.getSerchingMovies(action.payload.value, action.payload.counter);
//   yield put(foundMoviesSlice.actions.addMore(data))
// }

export default foundMoviesSlice