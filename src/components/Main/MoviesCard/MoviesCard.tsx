import * as React from "react";
import { Card, Col } from "react-bootstrap";

interface IMoviesCardProps {
  movie: any;
}

const MoviesCard: React.FC<IMoviesCardProps> = ({ movie }) => {
  return (
    <Col>
      <Card>
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`${movie.title}`}
        />
        <Card.Body>
          <Card.Title>{`${movie.title}`}</Card.Title>
          <Card.Text>{`${movie.overview}`}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

// {`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}

export { MoviesCard };
