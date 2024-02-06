import { Col, Container, Row } from "react-bootstrap";
import Footer from "../Footer";
import "../../css/home.css";
const BlogCard = () => {
  return (
    <div className="bg-blogcard">
      <Container>
        <Row>
          <Col xs={4}>
            <div className="home-card">
              <img src="/intro1.jpg" />
              <p className="home-card-title"> blog card name1</p>
              <p className="home-card-caption">
                lorem itp sum cassd dsf sdfs dfs dfs dfs dfsf{" "}
              </p>
            </div>
          </Col>
          <Col xs={4}>
            <div className="home-card">
              <img src="/intro1.jpg" />
              <p className="home-card-title"> blog card name1</p>
              <p className="home-card-caption">
                lorem itp sum cassd dsf sdfs dfs dfs dfs dfsf{" "}
              </p>
            </div>
          </Col>
          <Col xs={4}>
            <div className="home-card">
              <img src="/intro1.jpg" />
              <p className="home-card-title"> blog card name1</p>
              <p className="home-card-caption">
                lorem itp sum cassd dsf sdfs dfs dfs dfs dfsf{" "}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BlogCard;
