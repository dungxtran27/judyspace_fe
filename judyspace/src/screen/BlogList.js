import { useState, useEffect } from "react";
import axios from "axios";
import DefaultTemplate from "../template/DefaultTemplate";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import "../css/BlogList.css";
import { Link } from "react-router-dom";
const BlogList = () => {
  const [BlogListPopula, setBloglistPopula] = useState([]);
  const [BlogListPage, setBlogListPage] = useState([]);

  //list popular
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/blog/getBlogsPaginated",
          {
            pageIndex: 0,
            pageSize: 4,
            searchName: "",
            sortType: "popularity24h",
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

  //list paginated
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/blog/getBlogsPaginated",
          {
            pageIndex: 0,
            pageSize: 5,
            searchName: "",
            sortType: "popularityAllTime",
            tagId: null,
          }
        );
        // const blogArray = Object.values(response.blogs);
        //setBloglistPopula(blogArray);
        setBlogListPage(response.data.content);
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
      <Container>
        <Row className=" popular">
          <Col xs={6} className="popular-left">
            {/* First Column */}
            {BlogListPopula.slice(0, 1).map((t) => (
              <div className="cardBlogList" key={t.blogId}>
                <div
                  style={{
                    background: `url(${t.blogThumbnail}) center / cover no-repeat`,
                  }}
                  className="wrapperBlogList"
                >
                  <div class="headerBlogList">
                    <div class="dateBlogList">
                      {new Date(t.createDate * 1000).toDateString()}
                    </div>
                  </div>
                  <div class="dataBlogList">
                    <div class="contentBlogList">
                      <span class="authorBlogList">waozouq</span>
                      <h1 class="titleBlogList">
                        <Link to="#">{t.title}</Link>
                      </h1>
                      <p class="textBlogList">
                        The antsy bingers of Netflix will eagerly anticipate the
                        digital release of the Survive soundtrack, out today.
                      </p>
                      <Link to="#" class="buttonBlogList">
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Col>
          <Col xs={6} className="popular-right">
            {/* Second Column */}
            {BlogListPopula.slice(1).map((t) => (
              <div class="blog-cardPopularList" key={t.blogId}>
                <div className="metaPopularList">
                  <div
                    className="photoPopularList"
                    style={{
                      background: `url(${t.blogThumbnail}) center / cover no-repeat`,
                      // background: `url("https://www.publicdomainpictures.net/pictures/80000/velka/kitty-cat-1395206763uwr.jpg") center / cover no-repeat`,
                    }}
                  ></div>
                  <ul className="detailsPopularList">
                    <li className="authorPopularList">- waozouq</li>
                    <li className="datePopularList">
                      - {new Date(t.createDate * 1000).toDateString()}
                    </li>
                  </ul>
                </div>
                <div className="descriptionPopularList">
                  <h1>{t.title}</h1>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    eum dolorum m. Veritatis, sit.
                  </p>
                  <p className="read-morePopularList">
                    <Link to="#">Read More</Link>
                  </p>
                </div>
              </div>
            ))}
          </Col>
        </Row>
        <Row className="paginatedBlogList ">
          <Col xs={9} className="blogListpaginate">
            {BlogListPage.map((bp) => (
              <div class="blog-cardPopularList " key={bp.blogId}>
                <div className="metaPopularList">
                  <div
                    className="photoPopularList"
                    style={{
                      background: `url(${bp.blogThumbnail}) center / cover no-repeat`,
                      // background: `url("https://www.publicdomainpictures.net/pictures/80000/velka/kitty-cat-1395206763uwr.jpg") center / cover no-repeat`,
                    }}
                  ></div>
                  <ul className="detailsPopularList">
                    <li className="authorPopularList">- waozouq</li>
                    <li className="datePopularList">
                      - {new Date(bp.createDate * 1000).toDateString()}
                    </li>
                  </ul>
                </div>
                <div className="descriptionPopularList">
                  <h1>{bp.title}</h1>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    eum dolorum m. Veritatis, sit.
                  </p>
                  <p className="read-morePopularList">
                    <Link to="#">Read More</Link>
                  </p>
                  <div className="icon-social-blog">
                    <span>
                      <img src="./eye.png" />
                      <span>99+</span>
                    </span>
                    <span>
                      <img src="./cmt.png" />

                      <span>{bp.commentSetSize}</span>
                    </span>
                    <span>
                      <img src="./love.png" />
                      <span> {bp.upvoteUserSetSize}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <Row xs={12} lg={4} className="btnRow">
              <button className="buttonLoadmore">Load more</button>
            </Row>
          </Col>
          <Col xs={3} className="related-blog">
            <Form>
              <FormControl placeholder="search"></FormControl>
            </Form>
          </Col>
        </Row>
        <Row> </Row>
      </Container>
    </DefaultTemplate>
  );
};

export default BlogList;
