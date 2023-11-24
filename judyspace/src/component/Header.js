import { Col, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../css/header.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { createContext, useContext, useEffect, useState } from "react";

const Header = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refereshToken");
  const JudyLogo = `/3.png`;
  const [user, SetUser] = useState({});

  useEffect(() => {
    if (accessToken === null) {
      SetUser(null);
    } else {
      fetch("http://localhost:8080/api/users/getCurrentUserInfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          SetUser(data);
          console.log(user);
        })
        .catch((error) => {
          console.log("Fetch error: ", error);
        });
    }
  }, []);

  const userGlobe = createContext(user);
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
              src={JudyLogo}
              alt="notfound"
              sticky="top"
            ></img>
          </Link>
        </Col>{" "}
        <Col xs={6} className="header-right">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Link to={"/blog"} className={isActive("/blog")}>
                Blog
              </Link>
              <Link to={"/portfolio"} className={isActive("/portfolio")}>
                Portfolio
              </Link>
              <Link to="/music" className={isActive("/music")}>
                Inspiration
              </Link>
              {user === null ? (
                <Link to="/login" className={isActive("/musicInspiration")}>
                  Login
                </Link>
              ) : (
                <img className="avt-header" src={user.avatarLink} />
              )}
            </Nav>
          </Navbar.Collapse>
        </Col>
      </Container>
    </Navbar>
  );
};

export default Header;
