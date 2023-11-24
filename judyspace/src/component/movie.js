import { useState, useEffect } from "react";
import "../css/book.css";
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
        <Col xs={9}>
          <Row>
            {movieList.map((m) => (
              <Col key={m.blogId} xs={4}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={m.blogThumbnail} />
                  <Card.Body>
                    <Card.Title>{m.title}</Card.Title>
                    <Card.Text>{m.caption}</Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            {movieList.map((m) => (
              <ImageList
                sx={{ width: 2000, height: 450 }}
                variant="woven"
                cols={4}
                gap={8}
              >
                {movieList.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      srcSet={`${item.blogThumbnail}?w=161&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.blogThumbnail}?w=161&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ))}
          </Row>
        </Col>
        <Col xs={3}>
          {" "}
          <Form className="related-blog">
            <FormControl
              onChange={(e) => setSearchName(e.currentTarget.value)}
              placeholder="search"
            ></FormControl>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Movie;
