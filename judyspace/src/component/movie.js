import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Button,
  Col,
  Container,
  Figure,
  FigureCaption,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { Box, Modal } from "@mui/material";
import "../css/moviePlayList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import MovieDetail from "./MovieDetail";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";
const Movie = () => {
  const [playLists, setPlayLists] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [pageSize, setPageSize] = useState(8);
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
          childImages: [],
        },
      ],
    },
  ]);
  const [like, setLike] = useState(1);
  const [viewingMovie, setViewingMovie] = useState({});
  const [blogIdForComment, setBlogIdForComment] = useState(0);
  const [newcmt, setNewcmt] = useState(1);
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
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/moviePlaylists/getAll",
        {
          method: "GET",
          withCredentials: true,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setPlayLists(data);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const head = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const token = localStorage.getItem("accessToken");
      if (token !== null) {
        head.Authorization = `Bearer ${token}`;
      }
      const response = await fetch(
        "http://localhost:8080/api/blog/getBlogsPaginated",
        {
          method: "POST",
          headers: head,
          body: JSON.stringify({
            pageIndex: 0,
            pageSize: pageSize,
            searchName: "",
            sortType: "latest",
            tagId: null,
            categoryId: 2,
            movieCategories: [],
          }),
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            setMovieList(data.content);
          });
        } else {
          if (response.status === 401) {
            refreshAccessToken().then(() => {
              fetchData();
            });
            // fetchData();
          }
        }
      });
    };
    fetchData();
  }, [pageSize, like, newcmt]);
  const HandleLoadMore = (e) => {
    setPageSize((prev) => prev + 8);
  };
  function upvoteBlog(blogid) {
    const token = localStorage.getItem("accessToken");
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
  function deleteUpvoteBlog(blogid) {
    const token = localStorage.getItem("accessToken");
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
  const modalshow = (movie) => {
    fetch("http://localhost:8080/api/blog/getBlogContent/" + movie.blogId)
      .then((response) => response.json())
      .then((data) => {
        setMovieContent(data);
        console.log(movieContent);
      });
    setViewingMovie(movie);
    setShowDetail(true);
  };
  const refreshAccessToken = async () => {
    fetch("http://localhost:8080/api/auth/refreshToken", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          localStorage.setItem("accessToken", data.value);
          console.log("refreshed: " + data.value);
        });
      } else {
        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }
    });
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  //comment
  function handleShowComment(blogId) {
    setBlogIdForComment(blogId);
    setShowComment(true);
  }
  const handleCloseComment = () => setShowComment(false);
  const navigate = useNavigate();
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
      <div className="MoviePlayListContainer">
        {playLists.map((playList) => (
          <Row key={playList.id} className="playList">
            <div className="playListName">
              <h5>
                <FontAwesomeIcon className="playListNameIcon" icon={faStar} />{" "}
                {playList.playListName}
              </h5>
            </div>
            <div className="MoviesCarousel">
              <Carousel
                swipeable={true}
                draggable={true}
                responsive={responsive}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                showDots={true}
              >
                {playList.moviesOfPlaylist.map((movie) => (
                  <figure
                    onClick={(e) => {
                      modalshow(movie);
                    }}
                    className="movieCard"
                    style={{ width: "100%" }}
                  >
                    <div
                      className="movieThumnail"
                      style={{
                        backgroundImage: `url(${movie.blogThumbnail})`,
                        backgroundPosition: "center", // Adjust as needed
                        backgroundRepeat: "no-repeat", // Adjust as needed
                      }}
                    ></div>
                    <figcaption
                      key={movie.blogId}
                      style={{ fontSize: "13px", color: "RGB(220 223 177)" }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color: "RGB(220 223 177)",
                          alignSelf: "start",
                        }}
                      >
                        {movie.movieCategories.map((mc) => (
                          <div>
                            {mc.categoryName}
                            {<br />}
                          </div>
                        ))}
                      </div>
                      {movie.title}
                    </figcaption>
                  </figure>
                ))}
              </Carousel>
            </div>
          </Row>
        ))}
        <div className="playList">
          <div className="playListName">
            <h5>
              <FontAwesomeIcon className="playListNameIcon" icon={faStar} /> Kho
              Phim
            </h5>
          </div>
          <div className="moviesContainner">
            {movieList.map((movie) => (
              <div className="movieCard col-lg-3" sm={12}>
                <div
                  className="movieCardInner"
                  onClick={(e) => {
                    modalshow(movie);
                  }}
                >
                  <div
                    className="cardThumbnail"
                    style={{
                      backgroundImage: `url(${movie.blogThumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      height: "400px",
                    }}
                  ></div>
                  <div className="cardText">
                    <h5>{movie.title}</h5>
                    <div className="movieCategories">
                      {movie.movieCategories.map((cate) => (
                        <span key={cate.movieCategoryId}>
                          {cate.categoryName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className="icon-social-blog"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    <span>
                      {movie.upvotedByCurrentUser ? (
                        <img
                          onClick={(e) => deleteUpvoteBlog(movie.blogId)}
                          src="/love2.png"
                        />
                      ) : (
                        <img
                          onClick={(e) => upvoteBlog(movie.blogId)}
                          src="/love.png"
                        />
                      )}

                      <span> {movie.upvoteUserSetSize}</span>
                    </span>
                  </span>
                  <span>
                    <img
                      src="/cmt.png"
                      onClick={(e) => handleShowComment(movie.blogId)}
                    />
                    <span>{movie.commentSetSize}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Row>
          <Button
            onClick={(e) => HandleLoadMore(e)}
            className="col-lg-2 col-sm-12"
            style={{ margin: "0 auto" }}
          >
            Load More
          </Button>
        </Row>
      </div>
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
        <MovieDetail
          movieContent={movieContent}
          showModal={showDetail}
          movieTitle={viewingMovie.title}
          youtubeLink={viewingMovie.youtubeLink}
        />
      </Modal>
    </Container>
  );
};

export default Movie;
