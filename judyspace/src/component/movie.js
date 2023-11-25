import { useState, useEffect } from "react";
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
const Movie = () => {
  const [movieList, setMovieList] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [tagId, setTagId] = useState(null);
  const [movieCategory, setMovieCategory] = useState([]);
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
          {
            pageIndex: pageIndex,
            pageSize: pageSize,
            searchName: searchName,
            sortType: sortType,
            tagId: tagId,
            categoryId: 2,
            movieCategories: movieCategory,
          },
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
  }, [pageIndex, pageSize, tagId, searchName, sortType]);
  return (
    <Container>
      <Row>
        {/* <Col xs={9}> */}
        <Form className="related-blog">
          <FormControl
            onChange={(e) => setSearchName(e.currentTarget.value)}
            placeholder="search"
          ></FormControl>
        </Form>
        <Row>
          {movieList.map((m) => (
            <Col key={m.blogId} xs={3}>
              <figure>
                <img src={m.blogThumbnail} alt="Mountains" />
                <figcaption>{m.title}</figcaption>
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
