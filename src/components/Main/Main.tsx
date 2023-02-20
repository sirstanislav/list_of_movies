import "./Main.scss";
import * as React from "react";
import { Container } from "react-bootstrap";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";

interface IMainProps {
  url: string;
}

const Main: React.FunctionComponent<IMainProps> = (props) => {
  const { url } = props;

  return (
    <Container className="py-5">
      <MoviesCardList url={url}/>
    </Container>
  );
};

export { Main };
