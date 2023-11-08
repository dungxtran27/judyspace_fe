import { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import ReactDOM from 'react-dom';
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
  const loadChildComment = (commentId) =>{
    const element = <Comment type={"Child"} parameter={commentId} />;
    const container = document.getElementById("childrenList"+commentId);
    ReactDOM.render(element, container)
  }
  return (
    <Container>
      {rootComments.map((comment) => (
        <Row key={comment.commentId} style={{ color: "white" }}>
          <div style={{display:"flex", alignItems:"center"}} className={type === "Root" ? "root" : "children"}>
            <Image
              style={{ width: "30px", marginRight: "20px"}}
              roundedCircle
              src={comment.poster.avatarLink}
            />
            <div>
              <h6>{comment.poster.username}</h6>
              <h6>{comment.content}</h6>
            </div>
          </div>
          <div>
            <p onClick={(e)=>loadChildComment(comment.commentId)}>Xem thêm phản hồi</p>
          </div>
          <div className="children" id={"childrenList"+comment.commentId} style={{borderLeft: "2px solid white"}}>
        
          </div>
          <hr />
        </Row>
      ))}
    </Container>
  );
}
