import React, { useState, useEffect } from "react";
import "../css/movie.css";
import axios from "axios";
import {
  Button,
  Carousel,
  CarouselItem,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import { Box, Modal, Typography } from "@mui/material";
import InteractiveImage from "./InteractiveImage";
import MovieDetail from "./MovieDetail";
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
          childImages: [],
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
                  <div
                    style={{
                      backgroundImage: `url(${
                        m.blogThumbnail
                          ? m.blogThumbnail
                          : "./blueCateLoading.gif"
                      })`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      minHeight: "410px",
                    }}
                  ></div>
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

                <Row
                  style={{
                    height: "50px",
                    width: "95%",
                    margin: "0 auto",
                    display: "flex",
                    justifyItems: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      marginTop: "5px",
                      textAlign: "left",
                    }}
                  >
                    <Image src="./love2.png" />
                    <span style={{ color: "RGB(184 184 184)" }}>&nbsp; 99</span>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      marginTop: "5px",
                      textAlign: "right",
                    }}
                  >
                    <Image src="./cmt.png" />
                    <span style={{ color: "RGB(184 184 184)" }}>&nbsp; 99</span>
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
        <MovieDetail
          movieContent={movieContent}
          showModal={show}
          movieTitle={viewingMovie.title}
          youtubeLink={viewingMovie.youtubeLink}
        />
      </Modal>
    </Container>
  );
};

export default Movie;
