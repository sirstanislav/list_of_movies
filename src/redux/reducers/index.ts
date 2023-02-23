import { combineReducers } from "@reduxjs/toolkit";
import topRatedSlice from "../reducers/topRatedMoviesReducer"
import upcomingSlice from "../reducers/upcomingMoviesReducer"

const reducer = combineReducers({
  [topRatedSlice.name]: topRatedSlice.reducer,
  [upcomingSlice.name]: upcomingSlice.reducer,
})

export default reducer