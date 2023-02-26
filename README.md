# List of movies

![Preview](https://github.com/sirstanislav/list_of_movies/blob/main/src/images/main.png?raw=true)

## About

In this practice project i learn how [Saga effects](https://github.com/redux-saga/redux-saga) works. The principle of the saga is to cause different operations in one action that are called effects.

```ts
export function* addMoreFoundMovies(action: {
  type: string;
  payload: { value: string };
}) {
  const page: number = yield select((state) => state.foundMoviesSlice.page);
  const data: IMovieData = yield MoviesApi.getSerchingMovies(
    action.payload.value,
    page + 1
  );
  yield put(foundMoviesSlice.actions.addMore({ ...data, ...action.payload }));
}
```

Here in one action we take state value, making API request and put to reducer who write data into the store.

Thanks a [Bootstrap](https://getbootstrap.com/) its work very fine on the different breakpoints

![Preview](https://github.com/sirstanislav/list_of_movies/blob/main/src/images/breackpoint.png?raw=true)

## Running

To see the changes when you edit scss styles you need run compiler who transform scss format to css

```json
"compile_sass": "sass --watch scss:src/style/css"
```

```js
npm run compile_sass
```

And then run the project

```js
npm run start
```
