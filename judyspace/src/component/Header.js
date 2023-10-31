import { Col, Container, Image, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../css/header.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "link-active" : "link";
  };

  return (
    <Navbar expand="lg" sticky="top">
      <Container>
        <Col xs={6} className="header-left">
          <Link to={"/"}>
            <img
              className="home-img"
              src="./3.png"
              alt="notfound"
              sticky="top"
            ></img>
          </Link>
        </Col>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Col xs={5} className="header-right">
            <Nav className="me-auto">
              <Link to={"/blog"} className={isActive("/blog")}>
                Blog
              </Link>
              <Link to={"/portfolio"} className={isActive("/portfolio")}>
                Portfolio
              </Link>
              <Link
                to="/musicInspiration"
                className={isActive("/musicInspiration")}
              >
                Inspiration
              </Link>
            </Nav>
          </Col>
        </Navbar.Collapse>
        <Col xs={1} className="header-avatar">
          hehe
        </Col>
      </Container>
    </Navbar>
  );
};

export default Header;
