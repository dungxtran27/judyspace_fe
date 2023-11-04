import { Col, Container, Dropdown, Image, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../css/header.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";

const Header = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refereshToken");
  const [user, SetUser] = useState("");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  useEffect(() => {
    fetch("http://localhost:8080/api/users/testingSecurity", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        SetUser(data.userName);
      });
  }, []);

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
        </Col>{" "}
        <Col xs={5} className="header-right">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
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
          </Navbar.Collapse>
        </Col>
        <Col xs={1}>
          {{ user } == null ? (
            <Link to="/login" className={isActive("/musicInspiration")}>
              Login
            </Link>
          ) : (
            <div className="nav-drop">
              <ul className="links">
                <li className="dropdown">
                  <a href="#" className="trigger-drop">
                    <div className="avt"> {user} </div>
                    <i className="arrow"></i>
                  </a>
                  <ul className="drop">
                    <li>
                      <a href="#">Sign Out</a>
                    </li>

                    <li>
                      <a href="#">Change Password</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
        </Col>
      </Container>
    </Navbar>
  );
};

export default Header;
