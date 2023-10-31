import { useState, useEffect } from "react";
import axios from "axios";
import DefaultTemplate from "../template/DefaultTemplate";
import { Col, Container, Row } from "react-bootstrap";
import "../css/BlogList.css";
import { Link } from "react-router-dom";
const BlogList = () => {
  const [BlogListPopula, setBloglistPopula] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/blog/getBlogsPaginated",
          {
            pageIndex: 0,
            pageSize: 4,
            searchName: "",
            sortType: "popularityAllTime",
            tagId: null,
          }
        );
        // const blogArray = Object.values(response.blogs);
        //setBloglistPopula(blogArray);
        setBloglistPopula(response.data.content);
        console.log(response.data.content);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(BlogListPopula);
  return (
    <DefaultTemplate>
      <div>
        <Row>
          <div className="popular-text">Popular</div>
          <Container>
            <Row>
              <Col xs={6}>
                {/* First Column */}
                {BlogListPopula.slice(0, 1).map((t) => (
                  <div className="card" key={t.blogId}>
                    <img src={t.blogThumbnail} alt={t.title} />
                    <p>{t.title}</p>
                  </div>
                ))}
              </Col>
              <Col xs={6}>
                {/* Second Column */}
                {BlogListPopula.slice(1).map((t) => (
                  <div className="card">
                    <img src={t.blogThumbnail} alt={t.title} />
                    <p>{t.title}</p>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </Row>
      </div>
    </DefaultTemplate>
  );
};

export default BlogList;
