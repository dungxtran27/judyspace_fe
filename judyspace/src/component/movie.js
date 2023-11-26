import React, { useState, useEffect } from "react";
import "../css/movie.css";
import axios from "axios";
import {
  Button,
  Card,
  Carousel,
  CarouselItem,
  Col,
  Container,
  Form,
  FormControl,
  Image,
  Row,
} from "react-bootstrap";
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";
const Movie = ({ requestBody }) => {
  const [movieList, setMovieList] = useState([]);
  const [maxLoadmore, setMaxLoadMore] = useState(false);
  const [BlogListPage, setBlogListPage] = useState([]);
  const token = localStorage.getItem("accessToken");
  const [interval, setInterval] = useState(2000);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [movieContent, setMovieContent] = useState([
    {
      paragraphId: 25,
      paragraphContent:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porttitor, erat rhoncus volutpat vulputate, mauris odio pellentesque justo, eleifend accumsan lorem nulla non tortor. Vivamus at dictum dolor, interdum egestas tortor. Mauris ullamcorper libero at porta interdum. Nulla pellentesque rutrum sapien. Sed urna mauris, rutrum sit amet bibendum in, sodales id neque. Curabitur accumsan justo non magna tristique lacinia. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In hac habitasse platea dictumst.",
      createDate: 1700995886.701026,
      imageParagraphs: [
        {
          imageId: 20,
          imageLink:
            "https://media.timeout.com/images/106011281/750/422/image.jpg",
        },
      ],
    },
  ]);
  const [viewingMovie, setViewingMovie] = useState({});
  const modalshow = (movie) => {
    fetch("http://localhost:8080/api/blog/getBlogContent/" + movie.blogId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovieContent(data);
      });
    setViewingMovie(movie);
    setShow(true);
  };
  const alteringInterval = (e) => {
    setInterval(e);
  };
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
  useEffect(() => {
    const fetchData = async () => {
      const head = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      if (token !== null) {
        head.Authorization = `Bearer ${token}`;
      }
      try {
        const response = await axios.post(
          "http://localhost:8080/api/blog/getBlogsPaginated",
          requestBody,
          {
            headers: head,
          }
        );
        setMaxLoadMore(response.data.last);
        setMovieList(response.data.content);
        console.log(movieList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [requestBody]);
  return (
    <Container>
      <Row>
        {/* <Col xs={9}> */}
        <Row className="movies">
          {movieList.map((m) => (
            <Col
              style={{ border: "1px solid RGB(36,37, 38, 0.7)" }}
              key={m.blogId}
              lg={3}
              xs={12}
            >
              <div>
             
                  <figure
                    onClick={(e) => {
                      modalshow(m);
                    }}
                  >
                    <img src={m.blogThumbnail} alt="Mountains" />
                    <figcaption>
                      <div
                        style={{
                          fontSize: "15px",
                          color: "RGB(220 223 177)",
                          alignSelf: "start",
                        }}
                      >
                        {m.movieCategories.map((mc) => (
                          <div>
                            {mc.categoryName}
                            {<br />}
                          </div>
                        ))}
                      </div>
                      {m.title}
                    </figcaption>
                  </figure>
            
                <Row style={{ height: "50px", width: "95%", margin: "0 auto", display: "flex", justifyItems: "space-between"}}>
                  <div style={{width: "50%", marginTop: "5px", textAlign: "left"}}>
                    <Image src="./love2.png" />
                    <span style={{color: "RGB(184 184 184)"}}>&nbsp; 99</span>
                  </div>
                  <div style={{width: "50%", marginTop: "5px", textAlign: "right"}}>
                    <Image src="./cmt.png" />
                    <span style={{color: "RGB(184 184 184)"}}>&nbsp; 99</span>
                  </div>
                </Row>
              </div>
            </Col>
          ))}
        </Row>
        {/* </Col> */}
        {/* <Col xs={3}> */} {/* </Col> */}
        <Button variant="Info">Load more</Button>
      </Row>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Row>
            <Col xs={12} lg={7}>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                style={{ color: "RGB(244 85 140)" }}
              >
                {viewingMovie.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {movieContent[0].paragraphContent}
              </Typography>
            </Col>
            <Col xs={12} lg={5} style={{ textAlign: "center" }}>
              <Carousel
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
              </Carousel>
            </Col>
          </Row>
          <Row>
            <iframe
              width="100%"
              height={"550px"}
              src={viewingMovie.youtubeLink}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </Row>
        </Box>
      </Modal>
    </Container>
  );
};

export default Movie;
