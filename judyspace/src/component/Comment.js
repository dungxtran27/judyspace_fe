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

export default function Comment({ type, parameter, refreshcmt }) {
  const [rootComments, setRootComment] = useState([]);

  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState("");
  const currUser = useContext(userGlobe);
  const token = localStorage.getItem("accessToken");
  const [cmtRefresh, setCmtRefresh] = useState(true);

  const [isEditing, setEditing] = useState(false);
  const [editingCommentId, seteditingCommentId] = useState(-1);
  useEffect(() => {
    const head = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token != null) {
      head.Authorization = `Bearer ${token}`;
    }

    fetch(
      "http://localhost:8080/api/comment/get" + type + "Comments/" + parameter,
      {
        method: "POST",
        headers: head,
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        setRootComment(responseData);
      });
  }, [cmtRefresh, refreshcmt, isEditing]);
  const loadChildComment = (commentId) => {
    const element = <Comment type={"Child"} parameter={commentId} />;
    const container = document.getElementById("childrenList" + commentId);
    const modal = document.getElementById("commentListofBlog");
    //unmount the component
    unmountComponentAtNode(container);
    ReactDOM.render(element, container);
    // Scroll to the newly added element
    // modal.scrollIntoView({
    //   behavior: "smooth",
    //   block: "end",
    //   inline: "nearest",
    // });
  };

  const toggleDisplay = (commentId) => {
    const input = document.getElementById("cmtinput" + commentId);
    input.style.display =
      input.style.display === "none" ? "inline-block" : "none";
  };
  //toggle edit cmt

  // setEditCmt(editCmt === false ? true : false);
  const HandleEditSubmit = (cmtId) => {
    const data = {
      commentId: cmtId,
      content: editContent,
    };
    fetch(`http://localhost:8080/api/comment/updateComment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setEditing(false);
          console.log("done UPDATE");
        } else {
          console.log("not done UPDATE");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
    if (token === null) {
      toast.error("Đăng nhập đê bạn ê");
    } else {
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
            setReplyContent("");
            toast.success("comment success");
            loadChildComment(commentId);
            const input = document.getElementById("cmtinput" + commentId);
            input.value = "";
            input.style.display = "none";
          });
        }
      });
    }
  };
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
              {isEditing === true && comment.commentId === editingCommentId ? (
                <Form id={"cmtedit" + comment.commentId}>
                  <Row>
                    <Col xs={10}>
                      <Form.Control
                        type="text"
                        className="editInput"
                        defaultValue={comment.content}
                        onInput={(e) => setEditContent(e.currentTarget.value)}
                      />
                    </Col>
                    <Col xs={2}>
                      <FontAwesomeIcon
                        className="icon-hover"
                        icon={faPaperPlane}
                        onClick={(e) => {
                          e.preventDefault();
                          HandleEditSubmit(comment.commentId);
                        }}
                      />
                    </Col>
                  </Row>
                  <p onClick={(e) => setEditing(false)}>Huỷ</p>
                </Form>
              ) : (
                <h6 className="cmt-content">{comment.content}</h6>
              )}
            </div>
            {comment.postedByUser && (
              // <OverlayTrigger
              //   trigger="click"
              //   key={"right"}
              //   placement={"right"}
              //   overlay={
              //     <Popover
              //       className="editbtn"
              //       id={`popover-positioned-${"right"}`}
              //     >
              //       <Popover.Body>
              //         <p
              //           onClick={(e) => {
              //             seteditingCommentId(comment.commentId);
              //             setEditing(true);
              //           }}
              //         >
              //           <strong>Sửa</strong>
              //         </p>
              //         <p onClick={(e) => deleteCmt(comment.commentId)}>
              //           <strong>Xoá</strong>
              //         </p>
              //       </Popover.Body>
              //     </Popover>
              //   }
              // >
              //   <Button className="btn-edit-cmt">
              //     {" "}
              //     <div className="dot"></div>
              //     <div className="dot"></div>
              //     <div className="dot"></div>
              //   </Button>
              // </OverlayTrigger>
              <div className="button-container">
                <button className="main-button">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </button>
                <div className="hover-buttons">
                  <button
                    className="edit-button"
                    onClick={(e) => {
                      seteditingCommentId(comment.commentId);
                      setEditing(true);
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-button"
                    onClick={(e) => deleteCmt(comment.commentId)}
                  >
                    Xoá
                  </button>
                </div>
              </div>
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
          <Form
            id={"cmtinput" + comment.commentId}
            style={{ display: "none" }}
            onSubmit={(e) => {
              console.log("wtf");
              e.preventDefault();
              handleSubmitComment({
                blogId: comment.blogRepliedTo.blogId,
                commentId: comment.commentId,
              });
            }}
          >
            <Row>
              <Col xs={2}></Col>
              <Col xs={8} className="no-pad-right">
                <Form.Control
                  type="textarea"
                  className="content-input"
                  onInput={(e) => setReplyContent(e.currentTarget.value)}
                />
              </Col>
              <Col xs={2} className="no-pad-left">
                <FontAwesomeIcon
                  onClick={(e) =>
                    handleSubmitComment({
                      blogId: comment.blogRepliedTo.blogId,
                      commentId: comment.commentId,
                    })
                  }
                  size="2xl"
                  className="icon-hover"
                  icon={faPaperPlane}
                />
              </Col>
            </Row>
          </Form>
          <div
            className="children"
            id={"childrenList" + comment.commentId}
            style={{
              borderLeft: "1px solid white",
              marginLeft: "20px",
            }}
          ></div>
          <hr />
        </Row>
      ))}
      <div style={{ backgroundColor: "RGB(73 73 76)" }}></div>
    </Container>
  );
}
