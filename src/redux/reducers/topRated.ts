import { SET_MORE_MOVIES } from "../constant";
import { IMovieData } from '../../interface/IMovieData';
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  result: []
}

const topRated = (state = initialState, { type, payload }: { type: string; payload: []; }) => {
  switch (type) {
    case SET_MORE_MOVIES:
      return {
        ...state,
        result: [...state.result, ...payload]
      };
    default: return state
  };
}

export default topRated;











// import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { IMovieData } from '../../interface/IMovieData';

// type TopRatedState = {
//   results: Array<{}>
// }

// const initialState: TopRatedState = {
//   results: []
// }

// const TopRatedSlice = createSlice({
//   name: 'getMoives',
//   initialState,
//   reducers: {
//     topRated(state = initialState, action: PayloadAction<IMovieData>) {
//       state.results = state.results.concat(action.payload.results)
//       return state
//     },
//   }
// })


// export const { topRated } = TopRatedSlice.actions
// export default TopRatedSlice.reducer