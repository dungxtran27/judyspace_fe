import { Container, Row, Col } from "react-bootstrap";
import DefaultTemplate from "../template/DefaultTemplate";
import "../css/home.css";
const Home = () => {
  return (
    <DefaultTemplate>
      <Container>
        <Row className="banner">
          <Col xs="8" className="banner-text">
            <div class="txt3">
              <div class="postword">Hi i'm Judy &nbsp;</div>
              <div class="word"></div>
            </div>
          </Col>
          <Col xs="6" className="banner-image"></Col>
        </Row>
        <Row className="intro"></Row>
        <Row className="inspi-card"></Row>
      </Container>
    </DefaultTemplate>
  );
};

export default Home;
