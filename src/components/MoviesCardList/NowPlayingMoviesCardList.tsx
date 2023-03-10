import { useCallback, useEffect, useState } from "react";
import { NowPlayingMoviesCard } from "../MoviesCard/NowPlayingMoviesCard";
import { MoviesApi } from "../../api/MoviesApi";
import { Container, Row } from "react-bootstrap";
import { Preloader } from "../Preloader/Preloader";

interface INowPlayingMoviesCardList {}

const NowPlayingMoviesCardList: React.FC<INowPlayingMoviesCardList> = (
  props
) => {
  type IResult = {
    results: never[];
  };

  const [movies, setMovies] = useState<IResult>({
    results: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(1);

  const loadMore = useCallback(() => {
    setIsLoading(true);
    setCounter((prevCounter) => {
      MoviesApi.getNowPlayingMovies(prevCounter)
        .then((res) => {
          setMovies((prevMovies) => {
            const array = prevMovies.results.concat(res.results);
            return { results: array };
          });
        })
        .catch((err) => console.log(`Movie download error: ${err}`))
        .finally(() => setIsLoading(false));

      return prevCounter + 1;
    });
  }, []);

  const windowScroll = useCallback(() => {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 2
    ) {
      loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", windowScroll, false);

    return () => {
      window.removeEventListener("scroll", windowScroll, false);
    };
  }, [windowScroll]);

  useEffect(() => loadMore(), [loadMore]);

  return isLoading ? (
    <Container className="py-5">
      <Row
        xs={2}
        md={2}
        lg={4}
        className="g-4"
        style={{ paddingBottom: "300px" }}
      >
        {movies.results.map((movie: any, index: any) => {
          return <NowPlayingMoviesCard key={index} movie={movie} />;
        })}
      </Row>
      <Preloader />
    </Container>
  ) : (
    <Container className="py-5">
      <Row
        xs={2}
        md={2}
        lg={4}
        className="g-4"
        style={{ paddingBottom: "300px" }}
      >
        {movies.results.map((movie: any, index: any) => {
          return <NowPlayingMoviesCard key={index} movie={movie} />;
        })}
      </Row>
    </Container>
  );
};

export { NowPlayingMoviesCardList };
