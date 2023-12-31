import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import DefaultTemplate from "../template/DefaultTemplate";
import { toast } from "react-toastify";
import Comment from "../component/Comment";
import globalStateContext from "../index";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Modal,
  ModalBody,
  Row,
} from "react-bootstrap";
import "../css/BlogList.css";
import { Link, useNavigate } from "react-router-dom";
import { userGlobe } from "../App";
export default function BlogList() {
  const [BlogListPopula, setBloglistPopula] = useState([]);
  const [BlogListPage, setBlogListPage] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [tagId, setTagId] = useState(null);
  const [maxLoadmore, setMaxLoadMore] = useState(false);
  const [blogIdForComment, setBlogIdForComment] = useState(0);
  const [like, setLike] = useState(1);
  const [newcmt, setNewcmt] = useState(1);

  const token = localStorage.getItem("accessToken");
  const userCurr = useContext(userGlobe);
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
            categoryId: 1,
            movieCategories: [],
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
    if (sortType !== "latest") {
      setSortType("latest");
    } else {
      setSortType("oldest");
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
    setPageSize(pageSize + 4);

    if (maxLoadmore) {
      toast.warning("Hết rùi ( ´◔ ω◔`) ノシ");
    }
  };
  //list paginated
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
            categoryId: 1,
            movieCategories: [],
          },
          {
            headers: head,
          }
        );
        setMaxLoadMore(response.data.last);
        setBlogListPage(response.data.content);
        console.log(BlogListPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pageIndex, pageSize, tagId, searchName, sortType, like]);

  //popup comment
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  function handleShow(blogId) {
    setBlogIdForComment(blogId);
    setShow(true);
  }
  //handle comment

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
  //upvoteBlog
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
                  <div
                    className="headerBlogList"
                    style={{ backgroundColor: "transparent" }}
                  >
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
                      <p className="textBlogList">{t.caption}</p>
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

                  <p className="caption-blog">{t.caption}</p>
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
                {sortType == "latest" ? (
                  <div className="filter-icon">
                    <p className="filter-text">Oldest</p>
                  </div>
                ) : (
                  <div className="filter-icon">
                    <p className="filter-text">Latest</p>
                    <img src="./new.png" />
                  </div>
                )}
              </button>

              <div className="dropdown">
                <button className="dropbtn">
                  <p className="filter-text">Popular </p>
                  <img src="./right-arrow.png" />
                </button>
                <div className="dropdown-content">
                  <a
                    onClick={(e) => {
                      setSortType("popularity24h");
                    }}
                  >
                    24 Hours
                  </a>
                  <a
                    onClick={(e) => {
                      setSortType("popularityWeek");
                    }}
                  >
                    Week
                  </a>
                  <a
                    onClick={(e) => {
                      setSortType("popularityAllTime");
                    }}
                  >
                    All
                  </a>
                </div>
              </div>
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
              <div
                className="blog-cardPopularList list  aninek"
                key={bp.blogId}
              >
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
                  <Link to={"/blog/blogDetail/" + bp.blogId}>
                    <h1>{bp.title}</h1>
                  </Link>

                  <p className="caption-blog">{bp.caption}</p>
                  <p className="read-morePopularList">
                    <Link to={"/blog/blogDetail/" + bp.blogId}>Read More</Link>
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
                      <span>
                        {bp.upvotedByCurrentUser ? (
                          <img
                            onClick={(e) => deleteUpvoteBlog(bp.blogId)}
                            src="./love2.png"
                          />
                        ) : (
                          <img
                            onClick={(e) => upvoteBlog(bp.blogId)}
                            src="./love.png"
                          />
                        )}

                        <span> {bp.upvoteUserSetSize}</span>
                      </span>
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
          <Col xs={3}>
            <Form className="related-blog">
              <FormControl
                onChange={(e) => setSearchName(e.currentTarget.value)}
                placeholder="search"
              ></FormControl>
            </Form>
            <div className="card-container">
              <span className="pro">PRO</span>
              <img
                className="round "
                src="https://i.ibb.co/Fqrdy5x/product-image-1593207438.jpg"
                alt="user"
              />
              <h3 className="card-h3">Thao Duong</h3>
              <h6 className="card-h6">Ha Noi</h6>
              <p className="card-text">
                some cool job and
                <br /> another job
              </p>
              <div className="buttons">
                <button className="primary">
                  <a href="https://beacons.ai/judythemarketer" target="_blank">
                    My Beacon
                  </a>
                </button>
                <button className="primary ghost">Donate me</button>
              </div>{" "}
              <div className="introduce skills">
                <h6 className="card-h6">About Me</h6>
                <p className="card-text">
                  Câu hỏi trên hỏi thì rất dễ, và trong những thông điệp rút ra
                  từ những sách vở, nghệ thuật
                </p>
              </div>
              {/* <div className="skills">
                <h6>Skills</h6>
                <ul>
                  <li>Content Creator</li>
                  <li> ui-ux</li>
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                  <li>React</li>
                  <li>Node</li>
                </ul>
              </div> */}
            </div>
          </Col>
        </Row>
        <Modal
          centered={true}
          show={show}
          onHide={handleClose}
          animation={true}
          id={"commentListofBlog"}
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "RGB(73 73 76)" }}
          >
            <Modal.Title style={{ color: "white" }}>Bình luận</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: "RGB(73 73 76)",
              height: "500px",
              overflowY: "scroll",
            }}
          >
            <Comment
              type={"Root"}
              parameter={blogIdForComment}
              refreshcmt={newcmt}
            />
          </Modal.Body>
          <Modal.Body style={{ backgroundColor: "RGB(73 73 76)" }}>
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
          </Modal.Body>
        </Modal>
      </Container>
    </DefaultTemplate>
  );
}
