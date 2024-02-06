import Banner from "./home-cpn/banner";
import Intro from "./home-cpn/intro";
import InspiCard from "./home-cpn/inspi-card";
import "../css/home.css";
import { Container } from "react-bootstrap";
import BlogCard from "./home-cpn/BlogCard";
import TiktokCarousel from "./home-cpn/TikTokCarousel";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Footer from "./Footer";
gsap.registerPlugin(ScrollTrigger);
const HomeParallax = () => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (panelRef.current) {
      let panels = gsap.utils.toArray(".pin-panel");

      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: true,
          pinSpacing: false,
        });
        ScrollTrigger.create({
          snap: false, // snap whole page to the closest section!
        });
      });
    }
  }, []);
  return (
    <div className="container-home">
      {/* <div ref={panelRef} className="  panel bannerHome pin-panel">
        <Container>
          <Banner />
        </Container>
      </div> */}
      <Banner />
      <Intro />
      <InspiCard />
      <TiktokCarousel />
      <BlogCard />
      <Footer />
      {/* <section ref={panelRef} className="panel introHome pin-panel">
        <Container>
          <Intro />
        </Container>
      </section>
      <section ref={panelRef} className="panel inspicardHome pin-panel">
        <Container>
          <InspiCard />
        </Container>
      </section>
      <section ref={panelRef} className="panel tiktok-videos pin-panel">
        <Container>
          <TiktokCarousel />
        </Container>
      </section>
      <section ref={panelRef} className="panel blogHome pin-panel">
        <Container>
          <BlogCard />
        </Container>
      </section>
      <section>
        <Footer />
      </section> */}
    </div>
  );
};

export default HomeParallax;
