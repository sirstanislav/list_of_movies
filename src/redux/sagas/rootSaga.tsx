import { takeEvery, put, call } from "redux-saga/effects";
import { MoviesApi } from "../../api/MoviesApi";
import { setMoreMovies } from "../actions/actionCreator";

type data = {
  results: [];
  counter: number;
  type: string;
};

export function* handleLoadMore({ counter }: data) {
  const { results }: data = yield MoviesApi.getTopRatedMovies(counter);
  yield put(setMoreMovies(results));
}

export function* watchClickSaga() {
  yield takeEvery("GET_MORE_MOVIES", handleLoadMore);
}

export function* rootSaga() {
  yield watchClickSaga();
}

// take
// takeEvery
// takeLatest
// takeLeading
// select
