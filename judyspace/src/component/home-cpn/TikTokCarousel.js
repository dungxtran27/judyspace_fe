import React from "react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css";
import "../../css/home.css";
import { Container } from "react-bootstrap";
// install Swiper modules

const TiktokCarousel = () => {
  const images = [
    "video1.mp4",
    "video2.mp4",
    "video3.mp4",
    "video4.mp4",
    "video5.mp4",
    "video6.mp4",
    "video7.mp4",
    "video8.mp4",
    "video1.mp4",
  ];

  return (
    <Swiper
      modules={[Autoplay, EffectCoverflow]}
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView="auto"
      mute={true}
      coverflowEffect={{
        rotate: 10,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: true,
      }}
      loop={true}
      onSwiper={(swiper) => {
        swiper.on("slideChangeTransitionStart", function () {
          var currentSlide = this.slides[this.activeIndex];
          var video = currentSlide.querySelector("video");
          if (video) {
            video.setAttribute("controls", "controls");
          }
        });
        swiper.on("slideChangeTransitionEnd", function () {
          var previousSlide = this.slides[this.previousIndex];
          var video = previousSlide.querySelector("video");
          if (video) {
            video.removeAttribute("controls");
            video.pause();
          }
        });
      }}
    >
      {images.map((video, index) => (
        <SwiperSlide key={index}>
          <video src={video} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default TiktokCarousel;
