import { combineReducers } from "@reduxjs/toolkit";
import topRatedSlice from "./topRatedMoviesSlice"
import upcomingSlice from "./upcomingMoviesSlice"
import foundMoviesSlice from "./foundMoviesSlice"

const reducer = combineReducers({
  [topRatedSlice.name]: topRatedSlice.reducer,
  [upcomingSlice.name]: upcomingSlice.reducer,
  [foundMoviesSlice.name]: foundMoviesSlice.reducer
})

export default reducer