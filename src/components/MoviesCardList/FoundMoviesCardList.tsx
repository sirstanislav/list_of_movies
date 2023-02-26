import { TopRatedMoviesCard } from "../MoviesCard/TopRatedMoviesCard";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { foundMoviesSliceAction } from "../../redux/slices/foundMoviesSlice";

interface IUpcomingMoviesCardList {}

const FoundMoviesCardList: React.FC<IUpcomingMoviesCardList> = (props) => {
  const dispatch = useAppDispatch();
  const movieSelector = useAppSelector(
    (state) => state.foundMoviesSlice.results
  );
  const inputValue: string = useAppSelector(
    (state) => state.foundMoviesSlice.value
  );

  const handleLoadMore = () => {
    dispatch(foundMoviesSliceAction.addMore({ value: inputValue }));
  };

  return (
    <Container className="py-5">
      <Row
        xs={2}
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

export { FoundMoviesCardList };
