import { configureStore } from '@reduxjs/toolkit';
import MovieList from './moviesSlice'

export const store = configureStore({
  reducer: {
    moviesData: MovieList,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch