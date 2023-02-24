import * as React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { foundMoviesSliceAction } from "../../redux/slices/foundMoviesSlice";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");
  const [onShowState, setonShowState] = useState("");

  const onSubmit = (value: string) => {
    navigate("/found");
    dispatch(foundMoviesSliceAction.firstLoad({ value: value, counter: 1 }));
  };

  return (
    <div className="header">
      {["md"].map((expand) => (
        <Navbar key={expand} bg="white" expand={expand} className="pt-5">
          <Container fluid className=" justify-content-end">
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              onShow={() => {
                setonShowState("pb-3");
              }}
              onHide={() => {
                setonShowState("");
              }}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="justify-content-around">
                <Nav className={`gap-3 gap-md-5 ${onShowState}`}>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => navigate("/")}
                      className="link-primary"
                    >
                      Now playing
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => navigate("/top")}
                      className="link-primary"
                    >
                      Top rated
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => navigate("/upcoming")}
                      className="link-primary"
                    >
                      Upcoming
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Form
                  className="d-flex"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = (e.target as HTMLInputElement).querySelector(
                      ".form-control"
                    );
                    onSubmit((input as HTMLInputElement).value);
                  }}
                  onChange={(e) => {
                    setInputValue((e.target as HTMLInputElement).value);
                  }}
                >
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button
                    variant="outline-primary"
                    onClick={() => onSubmit(inputValue)}
                  >
                    Search
                  </Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

export { Header };
