import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../css/header.css";
const Header = () => {
  return (
    <Row className="header">
      <Container className="container-fluid">
        <Row>
          <Col xs={6} className="header-left">
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? "link-active" : "link")}
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
            <NavLink
              to={"/inspiration"}
              className={({ isActive }) => (isActive ? "link-active" : "link")}
            >
              inspiration
            </NavLink>
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
