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
  const token = localStorage.getItem("accessToken");
  const userCurr = useContext(userGlobe);
  console.log(userCurr);
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
          },
          {
            headers: head,
          }
        );
        setMaxLoadMore(response.data.last);
        setBlogListPage(response.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pageIndex, pageSize, tagId, searchName, sortType, like]);
  const upVoteOrUnUpvote = async ({ blogId }) => {
    const head = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token !== null) {
      head.Authorization = `Bearer ${token}`;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/api/blogUpvote/add/${blogId}`,
        {},
        {
          headers: head,
        }
      );

      // Handle the response as needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
        response.json().then((data2) => {
          toast.success("comment success");
        });
      }
    });
  };
  //upvoteBlog
  function upvoteBlog(blogid) {
    const head = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token !== null) {
      head.Authorization = `Bearer ${token}`;
    }
    fetch(`http://localhost:8080/api/blogUpvote/add/${blogid}`, {
      method: "POST",
      headers: head,
    }).then((response) => {
      if (response.status === 417) {
        toast.warning("Đăng nhập đê bạn ê");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        if (response.status != 200) {
          console.log("not done");
        } else {
          if (like !== 2) {
            setLike(2);
          } else {
            setLike(1);
          }
          console.log("done");
        }
      }
    });
  }
  //delete upvote
  function deleteUpvoteBlog(blogid) {
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
          if (like !== 1) {
            setLike(1);
          } else {
            setLike(2);
          }
          console.log("done delete");
        } else {
          console.log("not done delete");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                {sortType == "latest" ? (
                  <div className="filter-icon">
                    <p>Oldest</p>
                  </div>
                ) : (
                  <div className="filter-icon">
                    <p>Latest</p>
                    <img src="./new.png" />
                  </div>
                )}
              </button>

              <div className="dropdown">
                <button className="dropbtn">
                  <p>Popular </p>
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
                  <Link to={"/blogDetail/" + bp.blogId}>
                    <h1>{bp.title}</h1>
                  </Link>

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
            <Comment type={"Root"} parameter={blogIdForComment} />
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
