import { useState, useEffect, useRef } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Image,
  Row
} from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
export default function UploadForm() {
  const [paragraphContent, setParagraphContent] = useState("");
  const [title, setBlogTitle] = useState("");
  const [blogThumbnail, setBlogThumbnail] = useState(
    "https://i.pinimg.com/564x/28/3d/16/283d165331a4b4986e48fd70354c179d.jpg"
  );
  const [blogCategory, setBlogCategory] = useState(1);
  const [blogTag, setBlogTag] = useState(1);
  const [blogTags, setBlogTags] = useState([]);
  const [caption, setCaption] = useState("");
  const editorRef = useRef();

  useEffect(() => {
    fetch("http://localhost:8080/api/blogTag/getAll")
      .then((response) => response.json())
      .then((responseData) => {
        setBlogTags(responseData);
      });
  }, []);

  const getEditorContent = (content, editor) => {
    const raw = editor.getContent({ format: "raw" });
    const escapedParagraph = raw.replace(/"/g, '\\"');
    setParagraphContent(escapedParagraph);
  };
  function submitBlog(blogid) {
    const token = localStorage.getItem("accessToken");
    const head = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token !== null) {
      head.Authorization = `Bearer ${token}`;
    }
    const blog = {
      title: title,
      blogThumbnail: blogThumbnail,
      caption,
      blogCategory: {
        id: 1,
      },
      blogTag: {
        id: blogTag,
      },
      paragraphs: [
        {
          paragraphContent: paragraphContent,
          imageParagraphs: [],
        },
      ],
    };

    fetch(`http://localhost:8080/api/blog/addBlog`, {
      method: "POST",
      headers: head,
      body: JSON.stringify(blog),
    }).then((response) => {
   if (response.status === 417) {
        window.location.href("/login");
        toast.warning("Đăng nhập trước khi thêm blog");
      } else {
        if (response.status != 200) {
          response.json().then((data1) => {
            
            toast.error(data1.value);
          });
        } else {
          response.json().then((data1) => {
            toast.success(data1.value);
          });
        }
      }
    });
  }
  const editorConfig = {
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table paste code help wordcount",
    ],
    toolbar:
      "undo redo | formatselect | " +
      "bold italic backcolor | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | " +
      "removeformat | help | image table",
    // cleanup: true,
    keep_styles: false,
    aria_Invallid: false,
    image_advtab: true, // Enable advanced image options
    image_title: true, // Enable image title
    automatic_uploads: true, // Enable automatic image uploads
    file_picker_types: "image", // Limit file picker to images
  };

  return (
    <Container style={{ backgroundColor: "#242526", minHeight: "650px" }}>
      <Form>
        <Form.Group>
          <label style={{ color: "white", margin: "0 10px", fontSize: "25px" }}>
            Tiêu đề
          </label>
          <FormControl
            type="text"
            onInput={(e) => setBlogTitle(e.currentTarget.value)}
            placeholder="Nhập vào tiêu đề của bài viết"
            style={{ margin: "10px auto" }}
          />
          <label style={{ color: "white", margin: "0 10px", fontSize: "25px" }}>
            Caption(một dòng cảm nghĩ ngắn hoặc tóm tắt)
          </label>
          <FormControl
            type="text"
            onInput={(e) => setCaption(e.currentTarget.value)}
            placeholder="Nhập vào caption của bài viết"
            style={{ margin: "10px auto" }}
          />
          <label style={{ color: "white", margin: "0 10px", fontSize: "25px" }}>
            Phân Loại bài viết
          </label>
          <FormSelect style={{ width: "25%" }} onChange={(e)=>setBlogTag(e.target.value)}>
            {blogTags.map((tag) => (
              <option value={tag.id}>{tag.name}</option>
            ))}
          </FormSelect>
          <label style={{ color: "white", margin: "0 10px", fontSize: "25px" }}>
            Link Thumbnail
          </label>
          <FormControl
            type="text"
            onInput={(e) => setBlogThumbnail(e.currentTarget.value)}
            placeholder="Nhập link ảnh thumbnail"
            style={{ margin: "10px auto" }}
          />
        </Form.Group>
        <FormGroup>
          <Image
            src={blogThumbnail}
            style={{ width: "130px", margin: "10px" }}
          />
        </FormGroup>
        <FormGroup>
          <label style={{ color: "white", margin: "0 10px", fontSize: "25px" }}>
            Nội dung
          </label>
          <Editor
            apiKey="qjzielda3j0mhwlh79oi0uzunlys6pw0pfcroq0ji1ain1sd"
            init={{
              plugins:
                "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
              content_style:
                "body { background-color: #18191a; color: white; }",
              skin: "oxide-dark",
              content_css: "dark",
            }}
            // initialValue={escaped}
            onChange={getEditorContent}
          />
        </FormGroup>
        <FormGroup>
          <Button onClick={submitBlog()}>Submit</Button>
        </FormGroup>
      </Form>
    </Container>
  );
}
