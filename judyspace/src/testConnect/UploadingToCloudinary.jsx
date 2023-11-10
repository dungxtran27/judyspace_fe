import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
} from "react-bootstrap";
export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState();
  const [url, setUrl] = useState("");
  const uploadImage = ()=> {
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset", "JudySpace"
    );
    data.append("cloud_name", "")
    fetch("https://api.cloudinary.com/v1_1/djzdhtdpj/image/upload", {
      method: "POST", 
      body: data,
    }).then((response)=>response.json())
    .then((data)=>{
      console.log(data.secure_url);
      setUrl(data.secure_url)
    }).catch((errors)=>console.log(errors))
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file)
    if (file) {
      // Use FileReader to read the selected image and set it in the state
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Container>
      <Form>
        <FormGroup>
          <FormLabel>Choose Image</FormLabel>
          <FormControl type="file" onChange={handleImageChange} />
        </FormGroup>
      </Form>
      {selectedFile && (
        <div>
          <Image style={{margin: "0 auto", width: "200px"}} src={selectedFile} />
        </div>
      )}
      <br/>
      <Button variant="outline-primary" onClick={(e)=>uploadImage()}>Upload</Button>
    </Container>

  );
}
