import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Container,
  Form,
  FormControl,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "../css/addMovie.css";
import { Editor } from "@tinymce/tinymce-react";
import "bootstrap/dist/css/bootstrap.min.css";
import InteractiveImage from "../component/InteractiveImage";
import MovieDetail from "../component/MovieDetail";
import { Modal } from "@mui/material";

export default function AddMovie() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [imageParagraphs, setImageParagraphs] = useState([]);
  const token = localStorage.getItem("accessToken");

  // alert if refresh

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  //add movie
  const handleSubmitMovie = (e) => {
    console.log("haha");
    const head = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token !== null) {
      head.Authorization = `Bearer ${token}`;
    }
    fetch(`http://localhost:8080/api/blog/addBlog`, {
      method: "POST",
      headers: head,
      body: JSON.stringify(movieDetail),
    }).then((response) => {
      toast(response);
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
    }, []);
  };
  const [movieDetail, setMovieDetail] = useState({
    blogCategory: {
      id: 2,
    },
    movieCategories: [],
    paragraphs: [
      {
        paragraphContent: "",
        imageParagraphs: [
          {
            imageLink: "",
            childImages: [],
          },
        ],
      },
    ],
  });
  const [childImages, setChildImages] = useState([]);
  const [moviesCategories, setMovieCategories] = useState([]);
  const typeheadRef = useRef(null);
  const handleUnselectMovieCategory = (mc) => {
    moviesCategories.push(mc);
    // const selectedCopy = [...movieDetail.movieCategories];
    // selectedCopy.pop(mc);
    setMovieDetail((prev) => ({
      ...prev,
      movieCategories: prev.movieCategories.filter(
        (category) => category.movieCategoryId !== mc.movieCategoryId
      ),
    }));
  };
  useEffect(() => {
    const prev = [...moviesCategories];
    setMovieCategories(
      prev.filter((category) => !movieDetail.movieCategories.includes(category))
    );
    console.log(JSON.stringify(movieDetail));
  }, [movieDetail, imageParagraphs]);
  useEffect(() => {
    fetch("http://localhost:8080/api/movieCategoryController/getAll")
      .then((response) => response.json())
      .then((data) => {
        setMovieCategories(data);
      });
  }, []);
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
  const getEditorContent = (content, editor) => {
    const raw = editor.getContent({ format: "raw" });
    const escapedParagraph = raw.replace(/"/g, '\\"');
    setMovieDetail((prev) => ({
      ...prev,
      paragraphs: [
        {
          ...prev.paragraphs[0],
          paragraphContent: escapedParagraph,
        },
        ...prev.paragraphs.slice(1),
      ],
    }));
  };
  const handleChidImageChange = (index, type, value) => {
    setMovieDetail((prev) => ({
      ...prev,
      paragraphs: [
        {
          ...prev.paragraphs[0],
          imageParagraphs: [
            {
              ...prev.paragraphs[0].imageParagraphs[0],
              childImages: [
                ...prev.paragraphs[0].imageParagraphs[0].childImages.slice(
                  0,
                  index
                ),
                {
                  ...prev.paragraphs[0].imageParagraphs[0].childImages[index],
                  [type]: value,
                },
                ...prev.paragraphs[0].imageParagraphs[0].childImages.slice(
                  index + 1
                ),
              ],
            },
            ...prev.paragraphs[0].imageParagraphs.slice(1),
          ],
        },
        ...prev.paragraphs.slice(1),
      ],
    }));
  };
  return (
    <Container fluid>
      <div
        style={{
          width: "90%",
          margin: "50px auto",
          backgroundColor: "#242526",
          minHeight: "700px",
          borderRadius: "15px",
        }}
      >
        <Form>
          <h1 style={{ color: "white" }}>Add new Movies</h1>
          <h5>Tiêu đề Phim</h5>
          <FormControl
            type="text"
            onChange={(e) => {
              const title = e.currentTarget.value;
              setMovieDetail((prev) => {
                return { ...prev, title: title };
              });
            }}
          />
          <h5>Thumbnail</h5>
          <FormControl
            type="text"
            onChange={(e) => {
              const thumbnail = e.currentTarget.value;
              setMovieDetail((prev) => {
                return { ...prev, blogThumbnail: thumbnail };
              });
            }}
          />
          <Image
            src={
              movieDetail.blogThumbnail === undefined
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwiVPnxOoy-0BDqGn4k8_mDAURfZhBwwzo0Pua05aUYQ&s"
                : movieDetail.blogThumbnail
            }
            style={{
              width: "250px",
              border: "1px solid white",
              margin: "10px",
            }}
          />
          <h5>Categories</h5>
          <Typeahead
            style={{
              border: "1px solid white",
              color: "white",
              borderRadius: "10px",
            }}
            id="movieCategoryInput"
            labelKey="categoryName"
            options={moviesCategories}
            placeholder="Type to search..."
            onChange={(selectedOptions) => {
              // Update the state by appending the newly selected options
              setMovieDetail((prev) => {
                return {
                  ...prev,
                  movieCategories: [
                    ...prev.movieCategories,
                    ...selectedOptions,
                  ],
                };
              });
              typeheadRef.current.clear();
            }}
            ref={typeheadRef}
          />
          <h5>Selected</h5>
          {movieDetail.movieCategories.length === 0 ? (
            <p>You have not selected any categories for this movie</p>
          ) : (
            movieDetail.movieCategories.map((mc) => (
              <span
                key={mc.categoryId} // Don't forget to add a unique key when mapping over an array in JSX
                className="selectedCategories"
                style={{
                  color: "white",
                  border: "1px solid white",
                  padding: "8px 8px",
                  marginRight: "10px",
                  borderRadius: "10px",
                }}
              >
                {mc.categoryName}{" "}
                <FontAwesomeIcon
                  className="xicon"
                  onClick={(e) => {
                    handleUnselectMovieCategory(mc);
                  }}
                  style={{ color: "white" }}
                  icon={faX}
                />
              </span>
            ))
          )}

          <h5>Youtube embedded link</h5>
          <FormControl
            type="text"
            onChange={(e) => {
              const embedLink = e.currentTarget.value;
              setMovieDetail((prev) => {
                return { ...prev, youtubeLink: embedLink };
              });
            }}
          />
          <h5>Content</h5>
          <Editor
            apiKey="qjzielda3j0mhwlh79oi0uzunlys6pw0pfcroq0ji1ain1sd"
            init={{
              editorConfig,
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
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
          <h5>Background</h5>
          <FormControl
            type="text"
            onChange={(e) => {
              const link = e.currentTarget.value;
              setMovieDetail((prev) => ({
                ...prev,
                paragraphs: [
                  {
                    ...prev.paragraphs[0],
                    imageParagraphs: [
                      {
                        ...prev.paragraphs[0].imageParagraphs[0],
                        imageLink: link,
                      },
                      ...prev.paragraphs[0].imageParagraphs.slice(1),
                    ],
                  },
                  ...prev.paragraphs.slice(1),
                ],
              }));
            }}
          />
          <Row style={{ display: "flex" }}>
            <div
              style={{
                width: "40%",
                minHeight: "300px",
              }}
            >
              <Image
                style={{ width: "100%" }}
                src={movieDetail.paragraphs[0].imageParagraphs[0].imageLink}
              />
            </div>
            <div
              style={{
                width: "60%",
                minHeight: "300px",
              }}
            >
              <h5>Child Images</h5>
              <Table className="childImages" bordered hover>
                <thead>
                  <tr>
                    <td className="col-1">#</td>
                    <td className="col-2">Link</td>
                    <td className="col-2">Top Index</td>
                    <td className="col-2">Left Index</td>
                    <td className="col-2">width</td>
                    <td className="col-2">Image</td>
                  </tr>
                </thead>
                <tbody>
                  {movieDetail.paragraphs[0].imageParagraphs[0].childImages.map(
                    (ci, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <FormControl
                            type="text"
                            defaultValue={ci.imageLink}
                            onChange={(e) => {
                              const link = e.currentTarget.value;
                              handleChidImageChange(index, "imageLink", link);
                            }}
                          />
                        </td>
                        <td>
                          <FormControl
                            type="number"
                            defaultValue={ci.topIndex}
                            onChange={(e) => {
                              const topIndex = parseInt(e.currentTarget.value);
                              handleChidImageChange(
                                index,
                                "topIndex",
                                topIndex
                              );
                            }}
                          />
                        </td>
                        <td>
                          <FormControl
                            type="number"
                            defaultValue={ci.leftIndex}
                            onChange={(e) => {
                              const leftIndex = parseInt(e.currentTarget.value);
                              handleChidImageChange(
                                index,
                                "leftIndex",
                                leftIndex
                              );
                            }}
                          />
                        </td>
                        <td>
                          <FormControl
                            type="number"
                            defaultValue={ci.width}
                            onChange={(e) => {
                              const width = parseInt(e.currentTarget.value);
                              handleChidImageChange(index, "width", width);
                            }}
                          />
                        </td>
                        <td>
                          <Image style={{ width: "100%" }} src={ci.imageLink} />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
              <Button
                style={{ width: "100% !important", textAlign: "center" }}
                onClick={(e) => {
                  setMovieDetail((prev) => ({
                    ...prev,
                    paragraphs: [
                      {
                        ...prev.paragraphs[0],
                        imageParagraphs: [
                          {
                            ...prev.paragraphs[0].imageParagraphs[0],
                            childImages: [
                              ...prev.paragraphs[0].imageParagraphs[0]
                                .childImages,
                              {
                                imageLink: "default",
                                topIndex: 0,
                                leftIndex: 0,
                                width: 100,
                              },
                            ],
                          },
                          ...prev.paragraphs[0].imageParagraphs.slice(1),
                        ],
                      },
                      ...prev.paragraphs.slice(1),
                    ],
                  }));
                }}
              >
                Add new element
              </Button>
            </div>
          </Row>
          <Row
            style={{
              display: "flex",
              alignItems: "center !important",
              marginTop: "30px",
            }}
          >
            <Button style={{ width: "150px" }} onClick={(e) => setShow(true)}>
              Preview
            </Button>
            <Button
              onClick={(e) => {
                handleSubmitMovie(e);
              }}
              style={{ width: "150px" }}
            >
              Submit
            </Button>
          </Row>
        </Form>

        <Modal
          open={show}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MovieDetail
            movieContent={movieDetail.paragraphs}
            showModal={show}
            movieTitle={movieDetail.title}
            youtubeLink={movieDetail.youtubeLink}
          />
        </Modal>
      </div>
    </Container>
  );
}
