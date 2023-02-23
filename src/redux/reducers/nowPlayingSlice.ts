import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IMovieData } from '../../interface/IMovieData';

type nowPlayingState = {
  results: Array<{}>
}

const initialState: nowPlayingState = {
  results: []
}

const nowPlayingSlice = createSlice({
  name: 'getMoives',
  initialState,
  reducers: {
    nowPlaying(state, action: PayloadAction<IMovieData>) {
      state.results = state.results.concat(action.payload.results)
    }
  }
})

export const { nowPlaying } = nowPlayingSlice.actions
export default nowPlayingSlice.reducer