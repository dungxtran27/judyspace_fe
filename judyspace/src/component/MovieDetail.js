import { Box, Modal, Typography } from "@mui/material";
import "../css/movie.css";
import { Col, Row } from "react-bootstrap";
import InteractiveImage from "./InteractiveImage";
import { useState } from "react";
export default function MovieDetail({ movieContent, movieTitle, youtubeLink }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "550px",
    bgcolor: "rgb(38 40 41)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "white",
    overflow: "scroll",
  };
  return (
    <Box sx={style}>
      <Row>
        <Col xs={12} lg={7}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            style={{ color: "RGB(244 85 140)" }}
          >
            {movieTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div
              dangerouslySetInnerHTML={{
                __html: movieContent[0].paragraphContent.replace(/\\\"/g, '"'),
              }}
            ></div>
            {/* {movieContent[0].paragraphContent} */}
          </Typography>
        </Col>
        <Col xs={12} lg={5} style={{ textAlign: "center" }}>
          {movieContent[0].imageParagraphs.size !== 0 ? (
            <InteractiveImage
              imageLink={movieContent[0].imageParagraphs[0].imageLink}
              childImages={movieContent[0].imageParagraphs[0].childImages}
            />
          ) : (
            <h5 style={{ color: "white" }}>None</h5>
          )}
          {/* <Carousel
                style={{ marginTop: "70px", height: "400px" }}
                interval={interval}
              >
                {movieContent[0].imageParagraphs.map((ip) => (
                  <CarouselItem>
                    <div
                      style={{
                        width: "100%",
                        height: "350px",
                        backgroundImage: `url(${ip.imageLink})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                      }}
                    ></div>
                  </CarouselItem>
                ))}
                <CarouselItem>
                  <iframe
                    width="100%"
                    height={"350px"}
                    src={viewingMovie.youtubeLink}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    // onPlay={(e)=>{alteringInterval(null)}}
                    // onEnd={(e)=>{alteringInterval(2000)}}
                  ></iframe>
                </CarouselItem>
              </Carousel> */}
        </Col>
      </Row>
      <Row>
        <iframe
          width="100%"
          height={"550px"}
          src={youtubeLink}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </Row>
    </Box>
  );
}
