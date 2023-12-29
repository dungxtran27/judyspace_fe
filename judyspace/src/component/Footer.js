import "../css/footer.css";
import { Col, Row, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

const Footer = () => {
  return (
    <Navbar expand="lg" className="footer">
      <Container>
        <Row className="footer-up">
          <Col xs={8} className="footer-left ">
            <div className="footer-logo">
              <img src="/finnal2.png" className="icon-footer-left" />
              <span> JudySpace</span>
            </div>
            <div className="footer-left-summary">
              <p>
                lorem ipsum sawsr dwenr sdf ern sdf qena sfq er saf qe r sdf ar
                sdf qwersdfs fsdf sdf sdf sdf sdf sdf sdf sdrs sdf
              </p>
            </div>
          </Col>
          <Col xs={4} className="footer-right ">
            <Col xs={4} className="footer-info">
              <Row>
                <p className="footer-info-title"> Blog</p>
              </Row>
              <Row>
                <p className="footer-info-link"> blog 1</p>
              </Row>
              <Row>
                <p className="footer-info-link"> blog 2</p>
              </Row>
              <Row>
                <p className="footer-info-link"> blog 3</p>
              </Row>
            </Col>
            <Col xs={4} className="footer-info">
              <Row>
                <p className="footer-info-title">Inspiration</p>
              </Row>
              <Row>
                <p className="footer-info-link"> Music</p>
              </Row>
              <Row>
                <p className="footer-info-link"> Book</p>
              </Row>
              <Row>
                <p className="footer-info-link"> Movie</p>
              </Row>
            </Col>
            <Col xs={4} className="footer-info">
              <Row>
                <p className="footer-info-title"> Follow Us</p>
              </Row>
              <Row>
                <p className="footer-info-link">
                  <img src="/fb.png" /> <span>Facebook</span>
                </p>
              </Row>
              <Row>
                <p className="footer-info-link">
                  <img src="tiktok.png" /> <span>TikTok</span>
                </p>
              </Row>
              <Row>
                <p className="footer-info-link">
                  <img className="insta" src="insta.png" />{" "}
                  <span>Instagram</span>
                </p>
              </Row>
            </Col>
          </Col>
        </Row>
        <Row className="footer-down">Copyright © JudySpace+ 2023</Row>
      </Container>
    </Navbar>
  );
};

export default Footer;
