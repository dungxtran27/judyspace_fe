import { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import "../css/Comment.css";

export default function Comment({ type, parameter }) {
  const [rootComments, setRootComment] = useState([]);
  const [childComments, setChilComments] = useState([]);
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    fetch(
      "http://localhost:8080/api/comment/get" + type + "Comments/" + parameter,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setRootComment(responseData);
      });
  }, [type, parameter]);
  const loadChildComment = (commentId) => {
    const element = <Comment type={"Child"} parameter={commentId} />;
    const container = document.getElementById("childrenList" + commentId);
    ReactDOM.render(element, container);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const commentChildRef = useRef();
  const blogIdRef = useRef();
  const comtIdRef = useRef();
  const handleSubmitComment = (e) => {
    e.preventDefault();
    const data = {
      content: commentChildRef.current.value,
      blogRepliedTo: { blogId: blogIdRef.current.value },
      parentComment: { commentId: comtIdRef.current.value },
    };
    const token = localStorage.getItem("accessToken");
    fetch("http://localhost:8080/api/comment/makeChildComment", {
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

  const toggleDisplay = (commentId) => {
    const input = document.getElementById("cmtinput" + commentId);
    input.style.display =
      input.style.display === "none" ? "inline-block" : "none";
  };
  return (
    <Container>
      {rootComments.map((comment) => (
        <Row key={comment.commentId} style={{ color: "white" }}>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className={type === "Root" ? "root" : "children"}
          >
            <Image
              style={{ width: "30px", marginRight: "3px" }}
              roundedCircle
              src={comment.poster.avatarLink}
            />
            <div>
              <h6>{comment.poster.username}</h6>
              <h6>{comment.content}</h6>
            </div>
          </div>
          <div className="row-btn">
            <div className="btn-action">
              <p>Thích</p>
            </div>
            <div className="btn-action">
              <p onClick={(e) => loadChildComment(comment.commentId)}>
                Xem phản hồi
              </p>
            </div>
            <div className="btn-action">
              <p onClick={(e) => toggleDisplay(comment.commentId)}>Phản hồi</p>
            </div>
          </div>
          <Form
            id={"cmtinput" + comment.commentId}
            className="inputcomment"
            key={comment.commentId}
          >
            <Row>
              <Col xs={10}>
                <FormControl
                  type="input"
                  ref={commentChildRef}
                  placeholder="enter your thought here"
                ></FormControl>
                <FormControl
                  type="hidden"
                  value={parameter}
                  ref={blogIdRef}
                ></FormControl>
                <FormControl
                  type="hidden"
                  value={comment.commentId}
                  ref={comtIdRef}
                ></FormControl>
              </Col>
              <Col xs={2}>
                <Button variant="info" onClick={(e) => handleSubmitComment(e)}>
                  send
                </Button>
              </Col>
            </Row>
          </Form>
          <div
            className="children"
            id={"childrenList" + comment.commentId}
            style={{ borderLeft: "2px solid white", paddingLeft: "20px" }}
          ></div>
          <hr />
        </Row>
      ))}
      <div style={{ backgroundColor: "RGB(73 73 76)" }}></div>
    </Container>
  );
}
