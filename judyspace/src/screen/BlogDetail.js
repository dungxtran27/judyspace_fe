import DefaultTemplate from "../template/DefaultTemplate";
import "../css/BlogDetail.css";
import { Image, Row } from "react-bootstrap";
import Comment from "../component/Comment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blogDetail, setBlogDetail] = useState({});
  const [paragraphs, setParagraphs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/blog/getBlogDetail/" + blogId)
      .then((response) => response.json())
      .then((responseData) => {
        setBlogDetail(responseData);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:8080/api/blog/getBlogContent/" + blogId)
      .then((response) => response.json())
      .then((responseData) => {
        setParagraphs(responseData);
      });
  }, []);
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
            <img src="./eye.png" />
            Judy the marketer
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
              <Image src="./" />
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
            />
          ))}
        </Row>
        <Row>
          <h3 style={{ color: "white" }}>Comment</h3>
          <Comment type={"Root"} parameter={1} />
        </Row>
      </div>
    </DefaultTemplate>
  );
};

export default BlogDetail;
