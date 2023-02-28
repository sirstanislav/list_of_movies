import { combineReducers } from "@reduxjs/toolkit";
import topRatedSlice from "./topRatedMoviesSlice"
import upcomingSlice from "./upcomingMoviesSlice"
import foundMoviesSlice from "./foundMoviesSlice"
import exelSlice from "./excelSlice"

const reducer = combineReducers({
  [topRatedSlice.name]: topRatedSlice.reducer,
  [upcomingSlice.name]: upcomingSlice.reducer,
  [foundMoviesSlice.name]: foundMoviesSlice.reducer,
  [exelSlice.name]: exelSlice.reducer,
})

export default reducer