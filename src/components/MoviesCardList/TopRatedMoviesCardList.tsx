import { useCallback, useEffect, useState } from "react";
import { TopRatedMoviesCard } from "../MoviesCard/TopRatedMoviesCard";
import { MoviesApi } from "../../api/MoviesApi";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Preloader } from "../Preloader/Preloader";
import { useAppDispatch, useAppSelector } from "../../hooks";
import topRated from "../../redux/reducers/topRated";
import { getMoreMovies } from "../../redux/actions/actionCreator";

interface ITopRatedMoviesCardList {}

const TopRatedMoviesCardList: React.FC<ITopRatedMoviesCardList> = (props) => {
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const movieSelector = useAppSelector((state) => state.topRated);

  const handleLoadMore = useCallback(() => {
    setCounter((prevCounter) => {
      dispatch(getMoreMovies(prevCounter));
      return prevCounter + 1;
    });
  }, [dispatch]);

  // const handleUpcoming = () => {

  // }

  useEffect(() => {
    handleLoadMore();
  }, [handleLoadMore]);

  return (
    <Container className="py-5">
      <Row
        xs={1}
        md={2}
        lg={5}
        className="g-4"
        style={{ paddingBottom: "100px" }}
      >
        {movieSelector.result.map((movie: any, index: any) => {
          return <TopRatedMoviesCard key={index} movie={movie} />;
        })}
      </Row>
      <Col
        className="d-flex justify-content-center"
        style={{ paddingBottom: "300px" }}
      >
        <Button onClick={handleLoadMore}>Load more</Button>
        {/* <Button onClick={handleUpcoming}>Upcoming</Button> */}
      </Col>
    </Container>
  );
};

export { TopRatedMoviesCardList };
