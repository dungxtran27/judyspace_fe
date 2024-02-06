import { Container, Row } from "react-bootstrap";
import "../../css/home.css";
import Footer from "../Footer";

const InspiCard = () => {
  return (
    <div className=" bg-card-inspi">
      <Container>
        <Row className="inspi-home">
          <div className="inspicard">
            {/* <p className="inspiText">Music</p> */}
            <img src="/music_icon.png" />
          </div>
          <div className="inspicard">
            {/* <p className="inspiText">Book</p> */}
            <img src="/book_icon.png" />
          </div>
          <div className="inspicard">
            {/* <p className="inspiText">Movie</p> */}
            <img src="/movie_icon.png" />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default InspiCard;
