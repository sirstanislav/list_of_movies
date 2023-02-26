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
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [onShowState, setOnShowState] = useState("");

  const onSubmit = (value: string) => {
    navigate("/found");
    dispatch(foundMoviesSliceAction.firstLoad({ value: value }));
  };

  return (
    <div className="header sticky-top">
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          bg="white"
          expand={expand}
          className="pt-5 container"
        >
          <Container fluid className=" justify-content-end">
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              onClick={() => setShow(true)}
            />
            <Navbar.Offcanvas
              show={show}
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              onShow={() => {
                setOnShowState("pb-3");
              }}
              onHide={() => {
                setOnShowState("");
                setShow(false);
              }}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="justify-content-between">
                <Nav className={`gap-3 gap-md-5 ${onShowState}`}>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        navigate("/");
                        setShow(false);
                        setInputValue("");
                      }}
                      className="link-primary"
                    >
                      Now playing
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        setShow(false);
                        navigate("/top");
                        setInputValue("");
                      }}
                      className="link-primary"
                    >
                      Top rated
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      onClick={() => {
                        setShow(false);
                        setInputValue("");
                        navigate("/upcoming");
                      }}
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
                    setShow(false);
                  }}
                >
                  <Form.Control
                    value={inputValue}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => {
                      setInputValue((e.target as HTMLInputElement).value);
                    }}
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
