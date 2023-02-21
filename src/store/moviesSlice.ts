import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MovieData } from "../interface/MovieData"

type MoviesState = {
  list: MovieData[]
}

const initialState: MoviesState = {
  list: []
}

const MoviesSlice = createSlice({
  name: 'getMoives',
  initialState,
  reducers: {
    MovieList(state, action: PayloadAction<[]>) {
      state.list = action.payload
    }
  }
})

export const { MovieList } = MoviesSlice.actions
export default MoviesSlice.reducer