import DefaultTemplate from "../template/DefaultTemplate";
import "../css/BlogDetail.css";
import { Col, Form, FormControl, Image, Row, Button } from "react-bootstrap";
import Comment from "../component/Comment";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blogDetail, setBlogDetail] = useState({});
  const [paragraphs, setParagraphs] = useState([]);
  const navigate = useNavigate();
  const [newcmt, setNewcmt] = useState(1);
  const [blogIdForComment, setBlogIdForComment] = useState(0);
  useEffect(() => {
    setBlogIdForComment(blogId);
  }, []);

  //blogdetail
  useEffect(() => {
    fetch("http://localhost:8080/api/blog/getBlogDetail/" + blogId)
      .then((response) => response.json())
      .then((responseData) => {
        setBlogDetail(responseData);
      });
  }, []);
  // blog content
  useEffect(() => {
    fetch("http://localhost:8080/api/blog/getBlogContent/" + blogId)
      .then((response) => response.json())
      .then((responseData) => {
        setParagraphs(responseData);
      });
  }, []);
  // comment

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
    <DefaultTemplate>
      <div className="blogDetailBackGround">
        <Row className="Judy">
          <Image
            className="JudyAvatar"
            roundedCircle
            src={
              "https://i.ibb.co/Fqrdy5x/product-image-1593207438.jpg?fbclid=IwAR3En0nVj9k2_S9BWCszBJKd-g-3lsKw4gY-OKjAaEZbD24eBd4u35Z9DMY"
            }
          />
          <div className="JudyText">
            <p>Judy the marketer</p>

            <p className="postdate">
              {" "}
              {new Date(blogDetail.createDate * 1000).toDateString()}
            </p>
          </div>
        </Row>
        <Row className="blogTitle">
          <Row>
            <h5 style={{ color: "#D6b598", width: "95%" }}>
              {blogDetail.title}
            </h5>
            <div style={{ width: "5%", textAlign: "center" }}>
              <Image src="/eye.png" />
              <h6 style={{ color: "#D6b598" }}>
                {blogDetail.upvoteUserSetSize}
              </h6>
            </div>
          </Row>
          <h6 style={{ color: "RGB(240, 240, 240, 0.5)" }}>
            {blogDetail.blogTag?.name}
          </h6>
          {paragraphs.map((paragraph, index) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{
                __html: paragraph.paragraphContent.replace(/\\\"/g, '"'),
              }}
            ></div>
          ))}
        </Row>
        <Row>
          {" "}
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
        </Row>
        <Row>
          <h3 style={{ color: "white" }}>Comment</h3>
          <Comment type={"Root"} parameter={blogId} refreshcmt={newcmt} />
        </Row>
      </div>
    </DefaultTemplate>
  );
};

export default BlogDetail;
