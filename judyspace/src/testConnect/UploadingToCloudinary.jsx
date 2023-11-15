import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  Row,
} from "react-bootstrap";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import QuillToolbar, { formats, modules } from "./utilities/QuillToolBar";
import MyDropZone from "./utilities/DragAndDropFileUpload";
export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState();
  const [url, setUrl] = useState("");
  const [value, setValue] = useState("");
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "JudySpace");
    data.append("cloud_name", "");
    fetch("https://api.cloudinary.com/v1_1/djzdhtdpj/image/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.secure_url);
        setUrl(data.secure_url);
      })
      .catch((errors) => console.log(errors));
  };
  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    const currentContents = editor.getContents();
    var text = editor.getHTML();
    console.log(text);
  };
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setImage(file);
  //   if (file) {
  //     // Use FileReader to read the selected image and set it in the state
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setSelectedFile(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <Container>
      <Row style={{ color: "white", backgroundColor: "white" }}>
        <QuillToolbar style={{ with: "100%" }} />
        <ReactQuill
          theme="snow"
          style={{ width: "100%", padding: "0px", color: "black" }}
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
      </Row>
      <MyDropZone />
    </Container>
  );
}
