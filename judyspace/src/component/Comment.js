import { useContext, useEffect, useRef, useState } from "react";
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
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { toast } from "react-toastify";
import "../css/Comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa0, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { userGlobe } from "../App";

export default function Comment({ type, parameter }) {
  const [rootComments, setRootComment] = useState([]);
  const [childComments, setChilComments] = useState([]);
  const [showChild, setShowChild] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editCmt, setEditCmt] = useState(false);
  const currUser = useContext(userGlobe);
  const token = localStorage.getItem("accessToken");
  const [cmtRefresh, setCmtRefresh] = useState(true);
  useEffect(() => {
    console.log(cmtRefresh);
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
  }, [cmtRefresh]);
  const loadChildComment = (commentId) => {
    console.log("child of " + commentId);
    const element = <Comment type={"Child"} parameter={commentId} />;
    const container = document.getElementById("childrenList" + commentId);
    const modal = document.getElementById("commentListofBlog");
    //unmount the component
    unmountComponentAtNode(container);
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
  //toggle edit cmt

  // setEditCmt(editCmt === false ? true : false);
  const editComment = (e) => {};
  function deleteCmt(cmtid) {
    fetch(`http://localhost:8080/api/comment/deleteComment/${cmtid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setCmtRefresh(cmtRefresh === true ? false : true);
          console.log("done delete");
        } else {
          console.log("not done delete");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //toggle handle cmt
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
          loadChildComment(commentId);
          const input = document.getElementById("cmtinput" + commentId);
          input.value = "";
          input.style.display = "none";
        });
      }
    });
  };
  console.log(currUser + "hihih");
  return (
    <Container>
      {rootComments.map((comment) => (
        <Row key={comment.commentId} style={{ color: "white" }}>
          <div
            style={{ display: "flex", alignItems: "flex-start" }}
            className={type === "Root" ? "root" : "children"}
          >
            <Image
              style={{ width: "45px", marginRight: "3px" }}
              roundedCircle
              src={comment.poster.avatarLink}
            />
            <div className="cmt-container">
              <h6 className="cmt-user ">{comment.poster.username}</h6>

              <h6 className="cmt-content">{comment.content}</h6>
            </div>
            {currUser === undefined ? (
              <></>
            ) : (
              <>
                {currUser.userId == comment.poster.userId ? (
                  <OverlayTrigger
                    trigger="click"
                    key={"right"}
                    placement={"right"}
                    overlay={
                      <Popover id={`popover-positioned-${"right"}`}>
                        <Popover.Body>
                          <p onClick={(e) => editComment}>
                            <strong>Sửa</strong>
                          </p>
                          <p onClick={(e) => deleteCmt(comment.commentId)}>
                            <strong>Xoá</strong>
                          </p>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <Button className="btn-edit-cmt">
                      {" "}
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </Button>
                  </OverlayTrigger>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
          <div className="row-btn">
            <div className="btn-action">
              <p>Thích</p>
            </div>
            {comment.childCommentNumber > 0 ? (
              <div className="btn-action">
                <p
                  style={{ color: "RGB(214 181 152)" }}
                  onClick={(e) => loadChildComment(comment.commentId)}
                >
                  Xem phản hồi
                </p>
              </div>
            ) : (
              <div className="btn-action">
                <p
                  style={{
                    color: "RGB(136, 136, 136, 0.5)",
                  }}
                >
                  Xem phản hồi
                </p>
              </div>
            )}

            <div className="btn-action">
              <p onClick={(e) => toggleDisplay(comment.commentId)}>Phản hồi</p>
            </div>
          </div>
          <Form id={"cmtinput" + comment.commentId} style={{ display: "none" }}>
            <Row>
              <Col xs={2}></Col>
              <Col xs={8}>
                <Form.Control
                  type="textarea"
                  className="content-input"
                  onInput={(e) => setReplyContent(e.currentTarget.value)}
                />
              </Col>
              <Col xs={2}>
                <Button type="submit">
                  <FontAwesomeIcon
                    onClick={(e) =>
                      handleSubmitComment({
                        blogId: comment.blogRepliedTo.blogId,
                        commentId: comment.commentId,
                      })
                    }
                    className="icon-hover"
                    icon={faPaperPlane}
                  />
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
