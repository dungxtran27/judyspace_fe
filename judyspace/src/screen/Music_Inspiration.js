import {
  Container,
  Form,
  FormControl,
  Nav,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import DefaultTemplate from "../template/DefaultTemplate";
import { useEffect, useState } from "react";
import "../css/inspiration.css";
import "../css/music.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Music from "../component/music";
const Music_inspiration = () => {
  return (
    <Container fluid>
      <Row
        className="backgroundImg"
        style={{
          backgroundImage: `url("https://volna.volkovdesign.com/img/home/slide1.jpg")`,
        }}
      >
        <div className="bannerVeil">
          <Row className="banner">
            <div className="quote">
              <div className="quote-icon-left">
                <img style={{ width: "20px" }} src="/quoteRight.png" />
              </div>
              <div
                style={{
                  fontFamily: "sans-serif",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                Music expresses that which cannot be said and on which it is
                impossible to be silent.
              </div>
              <div className="quote-icon-right">
                {" "}
                <img style={{ width: "20px" }} src="/quoteLeft.png" />
              </div>
            </div>
            <div className="pageTitle">
              <h1
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "80px",
                }}
              >
                Judy's theater
              </h1>
              <div className="exploreButton">
                <h4 style={{ color: "#3DCEED"}}> Let's explore <FontAwesomeIcon icon={faArrowRight}/></h4>
              </div>
            </div>
          </Row>
        </div>
      </Row>
      <Row className="contentContainer">
        <div className="inspirationContent">
          <Music/>
        </div>
      </Row>
    </Container>
  );
};

export default Music_inspiration;
