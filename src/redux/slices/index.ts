import { combineReducers } from "@reduxjs/toolkit";
import topRatedSlice from "./topRatedMoviesSlice"
import upcomingSlice from "./upcomingMoviesSlice"
import foundMoviesSlice from "./foundMoviesSlice"
import exelSlice from "./excelSlice"

const rootReducer = combineReducers({
  topRatedSlice: topRatedSlice.reducer,
  upcomingSlice: upcomingSlice.reducer,
  foundMoviesSlice: foundMoviesSlice.reducer,
  exelSlice: exelSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer