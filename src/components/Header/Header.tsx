import * as React from "react";
import { Nav } from "react-bootstrap";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <div className="header">
      <Nav
        activeKey="/home"
        className=" justify-content-center gap-5 pt-5"
      >
        <Nav.Item>
          <Nav.Link href="#">Now playing</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Upcoming</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export { Header };
