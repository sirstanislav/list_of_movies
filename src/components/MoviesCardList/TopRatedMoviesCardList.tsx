import { Container, Row, Col } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { TopRatedMoviesCard } from "../MoviesCard/TopRatedMoviesCard";
import { topRatedSliceActions } from "../../redux/slices/topRatedMoviesSlice";

interface ITopRatedMoviesCardList {}

const TopRatedMoviesCardList: React.FC<ITopRatedMoviesCardList> = (props) => {
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState(1);
  const moviesSelector = useAppSelector((state) => state.topRatedSlice);

  const loadMore = useCallback(() => {
    setCounter((prevCounter) => {
      dispatch(
        topRatedSliceActions.setTopRatedMovies({ counter: prevCounter })
      );
      return prevCounter + 1;
    });
  }, [dispatch]);

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

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  if (!moviesSelector.results || moviesSelector.results.length === 0) {
    return moviesSelector.error ? (
      <Container className="py-5">
        <h2
          className="
          text-center
          text-uppercase
          fw-bold
          font-monospace
          text-warning"
        >
          {moviesSelector.error}
        </h2>
      </Container>
    ) : null;
  }

  return (
    <Container className="py-5">
      <Row
        xs={3}
        md={3}
        lg={5}
        className="g-4"
        style={{ paddingBottom: "100px" }}
      >
        {moviesSelector.results.map((movie: any, index: any) => {
          return <TopRatedMoviesCard key={index} movie={movie} />;
        })}
      </Row>
      <Col
        className="d-flex justify-content-center"
        style={{ paddingBottom: "300px" }}
      ></Col>
    </Container>
  );
};

export { TopRatedMoviesCardList };
