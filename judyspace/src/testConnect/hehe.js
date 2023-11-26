import React, { useState, useEffect } from "react";
import "../css/movie.css";
import axios from "axios";
import { Card, Col, Container, Form, FormControl, Row } from "react-bootstrap";
import {
  ImageList,
  ImageListItem,
  Modal,
  Button,
  Typography,
  Box,
} from "@mui/material";
const Movie = ({ requestBody }) => {
  const [movieList, setMovieList] = useState([]);
  const [maxLoadmore, setMaxLoadMore] = useState(false);
  const [BlogListPage, setBlogListPage] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    console.log(requestBody);
    const fetchData = async () => {
      const head = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      if (token !== null) {
        head.Authorization = Bearer ${token};
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
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const modalshow = () => setShow(true);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "rgb(38 40 41)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "white",
    scroll: true,
  };

  return (
    <Container>
      <Row>
        {/* <Col xs={9}> */}
        <Row className="movies">
          {movieList.map((m) => (
            <Col key={m.blogId} xs={3}>
              <figure onClick={modalshow}>
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
              <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Row>
                    <Col xs={12} lg={6}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        chao em anh dung day tu chieu
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        “Lam Mộng Đạo Tôn!!” cái kia ngay tại chữa trị trận pháp
                        nam mây con, hai tròng mắt bỗng nhiên co rụt lại, Lam
                        Mộng Đạo Tôn tu vi, đã đến không huyền đỉnh phong chi
                        cảnh, hắn nam mây con, không phải là đối thủ!
                      </Typography>
                    </Col>
                    <Col xs={12} lg={6}>
                      <img src={m.blogThumbnail} />
                    </Col>
                  </Row>
                  <Row>
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/q2WvTaqe9zU?si=BLNoA2xVwO9Ce0OV"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </Row>
                </Box>
              </Modal>
              {/* <Modal
                centered={true}
                show={show}
                onHide={handleClose}
                animation={true}
                backdrop={false}
                size="lg"
                fullscreen="md-down"
              >
                <></>
                <Button onClick={}>Open modal</Button>
                
                <Row>
                  <Modal.Header>
                    <Modal.Title>{m.title}</Modal.Title>
                  </Modal.Header>
                </Row>

                <Modal.Body
                  style={{
                    height: "500px",
                    width: "700px",
                    overflowY: "scroll",
                    backdropFilter: "none",
                  }}
                >
                  <Row>
                    <Col></Col>
                  </Row>
                </Modal.Body>
              </Modal> */}
            </Col>
          ))}
        </Row>
        {/* </Col> */}
        {/* <Col xs={3}> /} {/ </Col> */}
      </Row>
    </Container>
  );
};

export default Movie;