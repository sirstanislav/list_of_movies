import { combineReducers } from "@reduxjs/toolkit";
import topRated from "./topRated";
import { upcoming } from "./upcoming";

const reducer = combineReducers({
  topRated,
  upcoming
})

export default reducer