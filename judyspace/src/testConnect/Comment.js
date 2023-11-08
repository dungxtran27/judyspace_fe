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
  return (
    <Container>
      {rootComments.map((comment) => (
        <Row key={comment.commentId} style={{ color: "white" }}>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className={type === "Root" ? "root" : "children"}
          >
            <Image
              style={{ width: "30px", marginRight: "20px" }}
              roundedCircle
              src={comment.poster.avatarLink}
            />
            <div>
              <h6>{comment.poster.username}</h6>
              <h6>{comment.content}</h6>
            </div>
          </div>
          <div>
            <p onClick={(e) => loadChildComment(comment.commentId)}>
              Xem thêm phản hồi
            </p>
          </div>
          <div
            className="children"
            id={"childrenList" + comment.commentId}
            style={{ borderLeft: "2px solid white" }}
          ></div>
          <hr />
        </Row>
      ))}
      <div style={{ backgroundColor: "RGB(73 73 76)" }}>
        <Form>
          <Row>
            <Col xs={10}>
              <FormControl
                type="input"
                ref={commentRef}
                placeholder="enter your thought here"
              ></FormControl>
              <FormControl
                type="hidden"
                value={parameter}
                ref={blogIdRef}
              ></FormControl>
            </Col>
            <Col xs={2}>
              <Button variant="info" onClick={(e) => handleSubmitComment(e)}>
                send
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
}
