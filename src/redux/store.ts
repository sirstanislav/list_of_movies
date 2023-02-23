import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import topRated from './reducers/topRated'
import nowPlaying from './reducers/nowPlayingSlice'
import { rootSaga } from './sagas/rootSaga'
import reducer from "./reducers/index"

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]
// Mount it on the Store
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
})
// Then run the saga
sagaMiddleware.run(rootSaga)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch





// import { configureStore} from '@reduxjs/toolkit';
// import topRated from './topRatedSlice'
// import nowPlaying from './nowPlayingSlice'


// export const store = configureStore({
//   reducer: {
//     topRated: topRated,
//     nowPlaying: nowPlaying,
//   },
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch