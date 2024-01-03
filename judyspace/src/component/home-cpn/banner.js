import { Col, Row } from "react-bootstrap";
import WordFlick from "../WordFlick";
import "../../css/home.css";
import Header from "../Header";

const Banner = () => {
  return (
    <div>
      <Header />

      <Row className="banner-home">
        <Col xs="6" className="banner-text">
          <div className="welcome-text">Welcome to my Website</div>
          <div className="word-flick-ctn">
            <div className="postword"> Hi, I'm Judy </div>
            <WordFlick />
          </div>
          <div className="banner-summary">
            {" "}
            Không vui chút nào, tôi đã không cười. Trò đùa của bạn thật tệ, tôi
            sẽ thích trò đùa này nếu nó được xoá khỏi đầu tôi và bạn vui lòng từ
            bỏ nói lại cho tôi trò đùa đấy. Nói thật, đây là một nỗ lực kinh
            khủng khi cố gắng để mang một nụ cười ra khỏi tôi
          </div>
        </Col>
        <Col xs="6" className="banner-image">
          <img src="/backpack_1500.png" />
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
