import { Col, Container, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "../css/header.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <Row className="header">
      <Container className="container-fluid">
        <Row>
          <Col xs={6} className="header-left">
            <NavLink
              to={"/"}
              className={isActive("/") ? "link-active" : "link"}
            >
              judySpace+
            </NavLink>
          </Col>
          <Col xs={6} className="header-right">
            <NavLink
              to={"/blog"}
              className={({ isActive }) => (isActive ? "link-active" : "link")}
            >
              blog
            </NavLink>
            <NavDropdown title="Inspiration" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink
              to={"/feedback"}
              className={({ isActive }) => (isActive ? "link-active" : "link")}
            >
              feedback
            </NavLink>
            <NavLink
              to={"/login"}
              style={{ textAlign: "right" }}
              className={({ isActive }) => (isActive ? "link-active" : "link")}
            >
              Login
            </NavLink>
          </Col>
        </Row>
      </Container>
    </Row>
  );
};
export default Header;
