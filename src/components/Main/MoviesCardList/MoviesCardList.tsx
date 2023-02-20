import * as React from "react";
import { useEffect, useState } from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { MoviesApi } from "../../../Api/MoviesApi";
import { Row } from "react-bootstrap";
import { Preloader } from "../../../Preloader/Preloader";
import { MoviesData } from "../../../interface/MoviesData";

interface IMoviesCardListProps {
  url: string;
}

const MoviesCardList: React.FC<IMoviesCardListProps> = ({ url }) => {
  const [movies, setMovies] = useState<MoviesData>({
    page: "",
    result: [],
    dates: {
      maximum: "",
      minimum: "",
    },
    total_pages: 1,
    total_results: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(2);

  const getMovies = (numberPage: string) => {
    MoviesApi.getMovies(numberPage, url)
      .then((res) => {
        setMovies({ page: "", result: res.results });
        setIsLoading(true);
      })
      .catch((err) => console.log(`Movie download error: ${err}`));
  };

  useEffect(() => getMovies(String(1)), [url]);

  window.onscroll = function (_e) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      MoviesApi.getMovies(String(counter), url)
        .then((res) => {
          const array = movies.result.concat(res.results);
          setMovies({ page: "", result: array });
          setCounter(counter + 1);
        })
        .catch((err) => console.log(`Movie download error: ${err}`));
    }
  };

  return isLoading ? (
    <Row xs={1} md={2} lg={4} className="g-5">
      {movies.result.map((movie: any, index: any) => {
        return <MoviesCard key={index} movie={movie} />;
      })}
    </Row>
  ) : (
    <Preloader />
  );
};

export { MoviesCardList };
