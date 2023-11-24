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
  const musicquotes =
    " Không biết anh Thành Vũ có biết Tú có Ny anh ta đi cầm Flore trận thi đấu vừa xong là trận ";

  const bookquotes =
    "rằng anh ta chưa để cái tốc biến mình hồi ủa trận thi đấu này với 14.0 điểm MVP";

  const moviequotes =
    "Một tình huống mà có lẽ Flo đang làm quá ngFlo, Flo đang múa quá nhức nách, phải nói làà Florentino,";

  const [quote, setQuote] = useState(musicquotes);

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
                      }}
                    >
                      <span className="menu-tab">
                        <img src="music_icon.png" />
                        <p> Music</p>
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
                      }}
                    >
                      <span className="menu-tab">
                        <img src="book_icon.png" />
                        <p> Book</p>
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
                      }}
                    >
                      <span className="menu-tab">
                        <img src="movie_icon.png" />
                        <p> Movie</p>
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
          </Row>
        </Row>
        <Row>
          {" "}
          <div className="menu-filter">{Inspi_element}</div>
        </Row>
        <Row></Row>
      </Container>
    </DefaultTemplate>
  );
};

export default Music_inspiration;
