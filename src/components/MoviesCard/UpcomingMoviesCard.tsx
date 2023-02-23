import "./MoviesCard.scss";
import * as React from "react";
import { Card, Col } from "react-bootstrap";

interface IUpcomingMoviesCard {
  movie: any;
}

const UpcomingMoviesCard: React.FC<IUpcomingMoviesCard> = ({ movie }) => {
  return (
    <Col>
      <Card>
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`${movie.title}`}
        />
        <Card.Body
          style={{ height: "200px" }}
          className="card__body overflow-auto"
        >
          <Card.Title>{`${movie.title}`}</Card.Title>
          <Card.Text>{`${movie.overview}`}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export { UpcomingMoviesCard };
