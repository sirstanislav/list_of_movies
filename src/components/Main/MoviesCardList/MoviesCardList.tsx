import * as React from "react";
import { useEffect, useState } from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { MoviesApi } from "../../../Api/MoviesApi";
import { Row } from "react-bootstrap";
import { Preloader } from "../../../Preloader/Preloader";

interface IMoviesCardListProps {}

const MoviesCardList: React.FC<IMoviesCardListProps> = (props) => {
  const [movies, setMovies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(2);

  const getMovies = (numberPage: string) => {
    MoviesApi.getMovies(numberPage)
      .then((res) => {
        setMovies(res.results);
        setIsLoading(true);
      })
      .catch((err) => console.log(`Movie download error: ${err}`));
  };

  useEffect(() => getMovies(String(1)), []);

  window.onscroll = function (_e) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      MoviesApi.getMovies(String(counter))
        .then((res) => {
          console.log("movies:", movies)
          console.log("res.results:", res.results)
          const array = movies.concat(res.results);
          setMovies(array);
          setCounter(counter + 1);
        })
        .catch((err) => console.log(`Movie download error: ${err}`));
    }
  };

  return isLoading ? (
    <Row xs={1} md={2} lg={4} className="g-4">
      {movies.map((movie: any, index: any) => {
        return <MoviesCard key={index} movie={movie} />;
      })}
    </Row>
  ) : (
    <Preloader />
  );
};

export { MoviesCardList };
