import * as React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <Nav activeKey="/home" className=" justify-content-center gap-5 pt-5">
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/")}>Now playing</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/top")}>Top rated</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export { Header };
