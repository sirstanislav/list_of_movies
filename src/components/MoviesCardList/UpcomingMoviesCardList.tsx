import { useCallback, useEffect, useState } from "react";
import { TopRatedMoviesCard } from "../MoviesCard/TopRatedMoviesCard";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { upcomingSliceActions } from "../../redux/reducers/upcomingMoviesReducer";
import upcomingSlice from "../../redux/reducers/upcomingMoviesReducer";

interface IUpcomingMoviesCardList {}

const UpcomingMoviesCardList: React.FC<IUpcomingMoviesCardList> = (props) => {
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState(1);
  const movieSelector = useAppSelector((state) => state.upcomingSlice.results);

  const handleLoadMore = useCallback(() => {
    setCounter((prevCounter) => {
      dispatch(
        upcomingSliceActions.setUpcomingMovies({ counter: prevCounter })
      );
      return prevCounter + 1;
    });
  }, [dispatch]);

  useEffect(() => {
    handleLoadMore();
  }, [handleLoadMore]);

  return (
    <Container className="py-5">
      <Row
        xs={3}
        md={3}
        lg={5}
        className="g-4"
        style={{ paddingBottom: "100px" }}
      >
        {movieSelector.map((movie: any, index: any) => {
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
