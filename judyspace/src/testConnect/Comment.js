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
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { toast } from "react-toastify";
import "../css/Comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Comment({ type, parameter }) {
  const [rootComments, setRootComment] = useState([]);
  const [childComments, setChilComments] = useState([]);
  const [showChild, setShowChild] = useState(false);
  const [replyContent, setReplyContent] = useState("");
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
  }, []);
  const loadChildComment = (commentId) => {
    console.log("child of " + commentId);
    const element = <Comment type={"Child"} parameter={commentId} />;
    const container = document.getElementById("childrenList" + commentId);
    const modal = document.getElementById("commentListofBlog");
    //unmount the component
    unmountComponentAtNode(container)
    ReactDOM.render(element, container);
    // Scroll to the newly added element
    modal.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const toggleDisplay = (commentId) => {
    const input = document.getElementById("cmtinput" + commentId);
    input.style.display =
      input.style.display === "none" ? "inline-block" : "none";
  };
  const handleSubmitComment = ({ blogId, commentId }) => {
    const data = {
      content: replyContent,
      blogRepliedTo: {
        blogId: blogId,
      },
      parentComment: {
        commentId: commentId,
      },
    };
    const token = localStorage.getItem("accessToken");
    console.log(data);
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
          console.log("added to " + commentId);
          loadChildComment(commentId);
          const input = document.getElementById("cmtinput" + commentId);
          input.value = "";
          input.style.display = "none";
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
              style={{ width: "40px", marginRight: "10px" }}
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
            {comment.childCommentNumber > 0 ? (
              <div className="btn-action">
                <p style={{color: "RGB(214 181 152)"}} onClick={(e) => loadChildComment(comment.commentId)}>Xem phản hồi</p>
              </div>
            ) : (
              <div className="btn-action">
                <p style={{color: "RGB(136, 136, 136, 0.5)", pointerEvents: "none"}}>Xem phản hồi</p>
              </div>
            )}

            <div className="btn-action">
              <p onClick={(e) => toggleDisplay(comment.commentId)}>Phản hồi</p>
            </div>
          </div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitComment({
                blogId: comment.blogRepliedTo.blogId,
                commentId: comment.commentId,
              });
            }}
            id={"cmtinput" + comment.commentId}
            style={{ display: "none" }}
          >
            <Row>
              <Col xs={10}>
                <Form.Control
                  type="text"
                  onInput={(e) => setReplyContent(e.currentTarget.value)}
                />
              </Col>
              <Col xs={2}>
                <Button type="submit">
                  <FontAwesomeIcon icon={faPaperPlane} />
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
