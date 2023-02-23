import { all } from "redux-saga/effects";
import { topRatedSaga } from "../reducers/topRatedMoviesReducer";
import { upcomingSaga } from "../reducers/upcomingMoviesReducer";

export function* rootSaga() {
  yield all([topRatedSaga(), upcomingSaga()]);
}
