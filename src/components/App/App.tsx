import "./App.scss";
import { NowPlayingMoviesCardList } from "../MoviesCardList/NowPlayingMoviesCardList";
import { TopRatedMoviesCardList } from "../MoviesCardList/TopRatedMoviesCardList";
import { UpcomingMoviesCardList } from "../MoviesCardList/UpcomingMoviesCardList";
import { Header } from "../Header/Header";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <NowPlayingMoviesCardList />
      </>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/top",
    element: (
      <>
        <Header />
        <TopRatedMoviesCardList />
      </>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/upcoming",
    element: (
      <>
        <Header />
        <UpcomingMoviesCardList />
      </>
    ),
    errorElement: <NotFoundPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
