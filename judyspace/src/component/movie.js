import React, { useState, useEffect, useRef } from "react";

import "../css/movie.css";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Button,
  Carousel,
  CarouselItem,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
import Comment from "./Comment";
const Movie = ({ requestBody }) => {
  const [movieList, setMovieList] = useState([]);
  const [maxLoadmore, setMaxLoadMore] = useState(false);
  const [BlogListPage, setBlogListPage] = useState([]);
  const token = localStorage.getItem("accessToken");
  const [interval, setInterval] = useState(2000);
  const [showDetail, setShowDetail] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const handleCloseDetail = () => setShowDetail(false);
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
  const [like, setLike] = useState(1);
  const [viewingMovie, setViewingMovie] = useState({});
  const [blogIdForComment, setBlogIdForComment] = useState(0);
  const [newcmt, setNewcmt] = useState(1);

  const modalshow = (movie) => {
    fetch("http://localhost:8080/api/blog/getBlogContent/" + movie.blogId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovieContent(data);
      });
    setViewingMovie(movie);
    setShowDetail(true);
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
    zIndex: "999",
  };
  const navigate = useNavigate();
  //movie list
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
  }, [requestBody, like, newcmt]);

  //upvoted movie
  function upvoteBlog(blogid) {
    if (token === null) {
      toast.error("Bạn cần đăng nhập");
      navigate("/login");
    } else {
      fetch(`http://localhost:8080/api/blogUpvote/add/${blogid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setLike(like === 1 ? 2 : 1);
            console.log("done");
          } else {
            console.log("not done");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  //delete upvote
  function deleteUpvoteBlog(blogid) {
    if (token === null) {
      toast.error("Bạn cần đăng nhập");
      navigate("/login");
    } else {
      fetch(`http://localhost:8080/api/blogUpvote/delete/${blogid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setLike(like === 1 ? 2 : 1);
            console.log("done delete");
          } else {
            console.log("not done delete");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  //comment
  function handleShowComment(blogId) {
    setBlogIdForComment(blogId);
    setShowComment(true);
  }
  const handleCloseComment = () => setShowComment(false);

  const commentRef = useRef();
  const blogIdRef = useRef();
  const handleSubmitComment = (e) => {
    e.preventDefault();
    const data = {
      content: commentRef.current.value,
      blogRepliedTo: { blogId: blogIdRef.current.value },
    };
    const token = localStorage.getItem("accessToken");

    if (token === null) {
      toast.error("Đăng nhập để bình luận nha m");
      navigate("/login");
    } else {
      fetch("http://localhost:8080/api/comment/makeRootComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (response.status !== 200) {
          response.json().then((data2) => {
            toast.error(data2.value);
          });
        } else {
          setNewcmt(newcmt === 1 ? 2 : 1);
          commentRef.current.value = "";
          response.json().then((data2) => {
            toast.success("comment success");
          });
        }
      });
    }
  };
  return (
    <Container>
      <Row>
        {/* <Col xs={9}> */}
        <Row className="movies">
          {movieList.map((m) => (
            <Col
              key={m.blogId}
              lg={3}
              xs={12}
              sm={6}
              style={{
                paddingBottom: "5px",
              }}
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
                <div
                  className="icon-social-blog"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    <span>
                      {m.upvotedByCurrentUser ? (
                        <img
                          onClick={(e) => deleteUpvoteBlog(m.blogId)}
                          src="/love2.png"
                        />
                      ) : (
                        <img
                          onClick={(e) => upvoteBlog(m.blogId)}
                          src="/love.png"
                        />
                      )}

                      <span> {m.upvoteUserSetSize}</span>
                    </span>
                  </span>
                  <span>
                    <img
                      src="/cmt.png"
                      onClick={(e) => handleShowComment(m.blogId)}
                    />
                    <span>{m.commentSetSize}</span>
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Button variant="Info">Load more</Button>
      </Row>

      <Modal open={showComment} onClose={handleCloseComment}>
        <Box sx={style}>
          <Comment
            type={"Root"}
            parameter={blogIdForComment}
            refreshcmt={newcmt}
          />

          <Form onSubmit={(e) => handleSubmitComment(e)}>
            <Row>
              <Col xs={10}>
                <FormControl
                  type="input"
                  ref={commentRef}
                  placeholder="enter your thought here"
                ></FormControl>
                <FormControl
                  type="hidden"
                  value={blogIdForComment}
                  ref={blogIdRef}
                ></FormControl>
              </Col>
              <Col xs={2}>
                <Button variant="info" type="submit">
                  send
                </Button>
              </Col>
            </Row>
          </Form>
        </Box>
      </Modal>
      <Modal
        open={showDetail}
        onClose={handleCloseDetail}
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
