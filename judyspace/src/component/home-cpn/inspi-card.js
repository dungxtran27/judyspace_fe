import { Row } from "react-bootstrap";
import "../../css/home.css";
import Footer from "../Footer";

const InspiCard = () => {
  return (
    <Row className="inspi-home">
      <div className="inspicard">
        <p className="inspiText">Music</p>
        <img src="/music_icon.png" />
      </div>
      <div className="inspicard">
        <p className="inspiText">Book</p>
        <img src="/book_icon.png" />
      </div>
      <div className="inspicard">
        <p className="inspiText">Movie</p>
        <img src="/movie_icon.png" />
      </div>
    </Row>
  );
};

export default InspiCard;
