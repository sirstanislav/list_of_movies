import "./Main.scss";
import * as React from "react";
import { Container } from "react-bootstrap";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";

interface IMainProps {}

const Main: React.FunctionComponent<IMainProps> = (props) => {
  return (
    <Container className="py-5">
      <MoviesCardList />
    </Container>
  );
};

export { Main };
