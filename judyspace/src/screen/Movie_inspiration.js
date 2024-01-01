import { useState } from "react";
import Movie from "../component/movie";
import DefaultTemplate from "../template/DefaultTemplate";
import { Container, Row } from "react-bootstrap";
const Movie_inspiration = () => {
  return (
    <Container fluid>
      <Row
        className="backgroundImg"
        style={{
          backgroundImage: `url("https://ali.sandbox.etdevs.com/divi/wp-content/uploads/sites/2/2019/12/theater-02.jpg")`,
        }}
      >
        <div className="bannerVeil">
          <Row className="banner">
            <div className="pageTitle">
              <div className="playDiv">
                <h4 style={{ color: "red" }}> Now Airing</h4>
              </div>
              <h1
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "80px",
                }}
              >
                Judy's Cinema
              </h1>
            </div>
            <div className="quote">
              <div className="quote-icon-left">
                <img src="/quoteRight.png" />
              </div>
              <div style={{fontFamily: "sans-serif", color: "white", fontSize: "20px"}}>
                A film is — or should be — more like music than like fiction. It
                should be a progression of moods and feelings.
              </div>
              <div className="quote-icon-right">
                {" "}
                <img src="/quoteLeft.png" />
              </div>
            </div>
          </Row>
        </div>
      </Row>
      <Row className="contentContainer">
        <div className="inspirationContent">
          <Movie />
        </div>
      </Row>
    </Container>
  );
};

export default Movie_inspiration;
