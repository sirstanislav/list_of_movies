import { useCallback, useEffect } from "react";
import { TopRatedMoviesCard } from "../MoviesCard/TopRatedMoviesCard";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { upcomingSliceActions } from "../../redux/slices/upcomingMoviesSlice";

interface IUpcomingMoviesCardList {}

const UpcomingMoviesCardList: React.FC<IUpcomingMoviesCardList> = (props) => {
  const dispatch = useAppDispatch();
  const moviesSelector = useAppSelector((state) => state.upcomingSlice);

  const handleLoadMore = useCallback(() => {
    dispatch(upcomingSliceActions.setUpcomingMovies());
  }, [dispatch]);

  useEffect(() => {
    handleLoadMore();
  }, [handleLoadMore]);

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
        xs={2}
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
      >
        <Button onClick={handleLoadMore}>Load more</Button>
      </Col>
    </Container>
  );
};

export { UpcomingMoviesCardList };
