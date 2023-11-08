import { useEffect, useState } from "react";

import axios from "axios";

const Comment = (props) => {
  const [parentCmt, setParentCmt] = useState([]);
  const [childCmt, setChildCmt] = useState([]);
  const [nothing, setNothing] = useState([]);
  const blogId = props.blogId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/comment/getRootComments/" + blogId
        );
        console.log(response.data);
        setParentCmt(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [blogId]);
  return (
    <div className="comment-container">
      {parentCmt.map((pc) => (
        <div key={pc.commentId}>{pc.content}</div>
      ))}
    </div>
  );
};

export default Comment;
