import { useState, useEffect } from "react";
import axios from "axios";
import DefaultTemplate from "../template/DefaultTemplate";
import { toast } from "react-toastify";

import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  Row,
} from "react-bootstrap";
import "../css/BlogList.css";
import {
  Link,
  useParams,
  useHistory,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Comment from "../testConnect/Comment";

const BlogList = () => {
  const [BlogListPopula, setBloglistPopula] = useState([]);
  const [BlogListPage, setBlogListPage] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [tagId, setTagId] = useState(null);
  const [maxLoadmore, setMaxLoadMore] = useState(false);
  const [blogIdForComment, setBlogIdForComment] = useState(0);
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  //setsorttypr

  const setsort = () => {
    if (sortType == "latest") {
      setSortType("oldest");
    } else if (sortType == "oldest") {
      setSortType("latest");
    }
  };
  //search
  // const submitSearch = () => {
  //   setSearchNam;
  // };
  //
  //loadmomre
  /// baấmm nhiều lần thay đổi toast
  const loadmore = () => {
    setPageSize(pageSize + 1);
    console.log("test");
    console.log(maxLoadmore);
    if (maxLoadmore) {
      console.log("hahah");
      toast.warning("Hết rùi ( ´◔ ω◔`) ノシ");
    }

    console.log(maxLoadmore);
  };
  //list paginated
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/blog/getBlogsPaginated",
          {
            pageIndex: pageIndex,
            pageSize: pageSize,
            searchName: searchName,
            sortType: sortType,
            tagId: tagId,
          }
        );
        setMaxLoadMore(response.data.last);

        setBlogListPage(response.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pageIndex, pageSize, tagId, searchName, sortType]);
  //popup comment
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (blogId) => {
    setShow(true);
    setBlogIdForComment(blogId);
  };
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
                  <div className="headerBlogList">
                    <div className="dateBlogList">
                      {new Date(t.createDate * 1000).toDateString()}
                    </div>
                  </div>
                  <div className="dataBlogList">
                    <div className="contentBlogList">
                      <span className="authorBlogList">waozouq</span>
                      <h1 className="titleBlogList">
                        <Link to="#">{t.title}</Link>
                      </h1>
                      <p className="textBlogList">
                        The antsy bingers of Netflix will eagerly anticipate the
                        digital release of the Survive soundtrack, out today.
                      </p>
                      <Link to="#" className="buttonBlogList">
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
              <div className="blog-cardPopularList" key={t.blogId}>
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
            <div className="filter">
              <button className="buttonFilter" onClick={(e) => setsort()}>
                {sortType == "latest" ? "Oldest" : "Latest"}
              </button>

              <button className="buttonFilter">Popularity</button>
            </div>
            <div className="tagFilter">
              <div className="tagIdFilter" onClick={(e) => setTagId(null)}>
                All
              </div>
              <div className="tagIdFilter" onClick={(e) => setTagId(1)}>
                The Talk
              </div>
              <div className="tagIdFilter" onClick={(e) => setTagId(2)}>
                My Story
              </div>
            </div>
            {BlogListPage.map((bp) => (
              <div className="blog-cardPopularList  aninek" key={bp.blogId}>
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
                      <img
                        src="./cmt.png"
                        onClick={(e) => handleShow(bp.blogId)}
                      />
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
              <button className="buttonLoadmore" onClick={loadmore}>
                Load more
              </button>
            </Row>
          </Col>
          <Col xs={3} className="related-blog">
            <Form>
              <FormControl
                onChange={(e) => setSearchName(e.currentTarget.value)}
                placeholder="search"
              ></FormControl>
            </Form>
          </Col>
        </Row>
        <Modal
          centered={true}
          show={show}
          onHide={handleClose}
          animation={true}
          
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "RGB(73 73 76)"}}
          >
            <h5 style={{ color: "white" }}>Bình luận</h5>
          </Modal.Header>
          <ModalBody
            style={{
              backgroundColor: "RGB(73 73 76)",
              height: "500px",
              overflowY: "scroll"
            }}
          >
            <Comment type={"Root"} parameter={blogIdForComment} />
          </ModalBody>
          <Modal.Footer style={{ backgroundColor: "RGB(73 73 76)"}}>
            <Button variant="outline-warning" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </DefaultTemplate>
  );
}

export default BlogList;
