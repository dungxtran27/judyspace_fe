import React, { useState, useEffect } from "react";
import "../css/movie.css";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { ImageList, ImageListItem } from "@mui/material";
const Movie = ({ requestBody }) => {
  const [movieList, setMovieList] = useState([]);
  const [maxLoadmore, setMaxLoadMore] = useState(false);
  const [BlogListPage, setBlogListPage] = useState([]);
  const token = localStorage.getItem("accessToken");

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
            <Col key={m.blogId} xs={3}>
              <figure>
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
            </Col>
          ))}
        </Row>
        {/* </Col> */}
        {/* <Col xs={3}> */} {/* </Col> */}
      </Row>
    </Container>
  );
};

export default Movie;
