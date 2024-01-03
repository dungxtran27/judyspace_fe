import Banner from "./home-cpn/banner";
import Intro from "./home-cpn/intro";
import InspiCard from "./home-cpn/inspi-card";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "../css/home.css";
import { Container } from "react-bootstrap";

const HomeParallax = () => {
  return (
    // <Parallax pages={4}>
    //   <ParallaxLayer
    //     offset={0}
    //     speed={1}
    //     factor={2}
    //     style={{
    //       backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/1200px-FullMoon2010.jpg")`,
    //       backgroundSize: "cover",
    //     }}
    //   />

    //   <ParallaxLayer
    //     offset={2}
    //     speed={1}
    //     factor={4}
    //     style={{
    //       backgroundImage: `url("https://www.designingbuildings.co.uk/w/images/6/6f/Field-175959_640.jpg")`,
    //       backgroundSize: "cover",
    //     }}
    //   ></ParallaxLayer>

    //   <ParallaxLayer
    //     sticky={{ start: 0.9, end: 2.5 }}
    //     style={{ textAlign: "center" }}
    //   >
    //     <img
    //       src={
    //         "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"
    //       }
    //     />
    //   </ParallaxLayer>

    //   <ParallaxLayer offset={0.2} speed={0.05}>
    //     <h2>Welcome to my website</h2>
    //   </ParallaxLayer>

    //   <ParallaxLayer offset={3} speed={2}>
    //     <h2>Hi Mom!</h2>
    //   </ParallaxLayer>
    // </Parallax>\\

    <Parallax pages={3}>
      <ParallaxLayer speed={1}>
        <Banner />
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={1}>
        <Intro />
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={1}>
        <InspiCard />
      </ParallaxLayer>
    </Parallax>

    // <div>
    //   <Banner />

    //   <Intro />
    //   <InspiCard />
    // </div>
  );
};

export default HomeParallax;
