import { Container, Nav, Row, Tab, Tabs } from "react-bootstrap";
import DefaultTemplate from "../template/DefaultTemplate";
import { useState } from "react";
import "../css/inspiration.css";
import Music from "../component/music";
import Book from "../component/book";
import Movie from "../component/movie";
const Music_inspiration = () => {
  const [bannerImg, setbannerImg] = useState("/musicBanner.png");
  const [activeTab, setActiveTab] = useState("music");
  const [Inspi_element, setInspi_element] = useState(<Music />);
  const [sortType, setSortTypeItem] = useState("latest");
  const [tagId, setTagIdItem] = useState(null);
  const [color_header, setColor] = useState("yellow");
  const musicquotes =
    " Không biết anh Thành Vũ có biết Tú có Ny anh ta đi cầm Flore trận thi đấu vừa xong là trận ";

  const bookquotes =
    "rằng anh ta chưa để cái tốc biến mình hồi ủa trận thi đấu này với 14.0 điểm MVP";

  const moviequotes =
    "Một tình huống mà có lẽ Flo đang làm quá ngFlo, Flo đang múa quá nhức nách, phải nói làà Florentino,";

  const [quote, setQuote] = useState(musicquotes);
  const setsortItem = () => {
    if (sortType !== "latest") {
      setSortTypeItem("latest");
    } else {
      setSortTypeItem("oldest");
    }
  };
  return (
    <DefaultTemplate>
      <Container fluid>
        <Row
          className="backgroundImg"
          style={{
            backgroundImage: `url(${bannerImg})`,
          }}
        >
          <Row className="banner">
            <div className="quote">
              <div className="quote-icon-left">
                <img src="/quoteRight.png" />
              </div>
              <div className="quote-content">{quote}</div>
              <div className="quote-icon-right">
                {" "}
                <img src="/quoteLeft.png" />
              </div>
            </div>
          </Row>
          <Row>
            <div className="menuBar_inspi">
              <div className="menu-list">
                <Nav justify variant="tabs">
                  <Nav.Item>
                    <Nav.Link
                      className={`music-color ${
                        activeTab === "music" ? "active" : ""
                      }`}
                      onClick={(e) => {
                        setInspi_element(<Music />);
                        setbannerImg("/musicBanner.png");
                        setQuote(musicquotes);
                        setActiveTab("music");
                        setColor("aqua");
                      }}
                    >
                      <span className="menu-tab">
                        <img src="music_icon.png" />
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={`book-color ${
                        activeTab === "book" ? "active" : ""
                      }`}
                      onClick={(e) => {
                        setInspi_element(<Book />);
                        setbannerImg("/bookBanner.png");
                        setQuote(bookquotes);
                        setActiveTab("book");
                        setColor("green");
                      }}
                    >
                      <span className="menu-tab">
                        <img src="book_icon.png" />
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className={`movie-color ${
                        activeTab === "movie" ? "active" : ""
                      }`}
                      onClick={(e) => {
                        setInspi_element(<Movie />);
                        setbannerImg("/movieBanner.png");
                        setQuote(moviequotes);
                        setActiveTab("movie");
                        setColor("yellow");
                      }}
                    >
                      <span className="menu-tab">
                        <img src="2798007.png" />
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className=" menu-filter">
                <div
                  className="filter  "
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                >
                  <button
                    className="buttonFilter  hover_inspi"
                    onClick={(e) => setsortItem()}
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.01)",
                      color: "white",
                    }}
                  >
                    {sortType == "latest" ? (
                      <div className="filter-icon">
                        <p style={{ fontSize: "20px" }}>Oldest</p>
                      </div>
                    ) : (
                      <div className="filter-icon">
                        <p style={{ fontSize: "20px" }}>Latest</p>
                        <img src="./new.png" />
                      </div>
                    )}
                  </button>

                  <div
                    className="dropdown "
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.01)",
                    }}
                  >
                    <button
                      className="dropbtn  hover_inspi"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.01)",
                        color: "white",
                      }}
                    >
                      <p style={{ fontSize: "20px" }}>Popular </p>
                      <img src="./whiteArr.png" />
                    </button>
                    <div className="dropdown-content">
                      <a
                        onClick={(e) => {
                          setSortTypeItem("popularity24h");
                        }}
                      >
                        24 Hours
                      </a>
                      <a
                        onClick={(e) => {
                          setSortTypeItem("popularityWeek");
                        }}
                      >
                        Week
                      </a>
                      <a
                        onClick={(e) => {
                          setSortTypeItem("popularityAllTime");
                        }}
                      >
                        All
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="tagFilter"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.01)" }}
                >
                  <div
                    className="tagIdFilter hover_inspi_other"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.01)",
                      color: "white",
                    }}
                    onClick={(e) => setTagIdItem(null)}
                  >
                    All
                  </div>
                  <div
                    className="tagIdFilter hover_inspi_other"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.01)",
                      color: "white",
                    }}
                    onClick={(e) => setTagIdItem(1)}
                  >
                    The Talk
                  </div>
                  <div
                    className="tagIdFilter hover_inspi_other"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.01)",
                      color: "white",
                    }}
                    onClick={(e) => setTagIdItem(2)}
                  >
                    My Story
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Row>
        <Row>
          <div className="menu-filter">{Inspi_element}</div>
        </Row>
        <Row></Row>
      </Container>
    </DefaultTemplate>
  );
};

export default Music_inspiration;
