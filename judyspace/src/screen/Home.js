import { Container, Row, Col } from "react-bootstrap";
import DefaultTemplate from "../template/DefaultTemplate";
import "../css/home.css";
import WordFlick from "../component/WordFlick";
import HomeParallax from "../component/Home-parallax";
import InspiCard from "../component/home-cpn/inspi-card";
import Banner from "../component/home-cpn/banner";
const Home = () => {
  return (
    <Container>
      <HomeParallax />
    </Container>
  );
};

export default Home;
