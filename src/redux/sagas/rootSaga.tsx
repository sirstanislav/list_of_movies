import { all } from "redux-saga/effects";
import { topRatedSaga } from "../slices/topRatedMoviesSlice";
import { upcomingSaga } from "../slices/upcomingMoviesSlice";
import { foundMoviesSaga } from "../slices/foundMoviesSlice";
import { exelSaga } from "../slices/excelSlice";

export function* rootSaga() {
  yield all([topRatedSaga(), upcomingSaga(), foundMoviesSaga(), exelSaga()]);
}
