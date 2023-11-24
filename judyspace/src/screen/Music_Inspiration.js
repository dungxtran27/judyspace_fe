import { Container, Nav, Row, Tab, Tabs } from "react-bootstrap";
import DefaultTemplate from "../template/DefaultTemplate";
import { useState } from "react";
import "../css/inspiration.css";
import Music from "../component/music";
import Book from "../component/book";
import Movie from "../component/movie";
const Music_inspiration = () => {
  const [bannerImg, setbannerImg] = useState("/musicBanner.png");
  const [Inspi_element, setInspi_element] = useState(<Music />);
  const musicquotes =
    " Không biết anh Thành Vũ có biết Tú có Ny hay không, chúng tôibiết rằng tú có ny là người chơi khá nổi tiếng với con bàiFlorentino, ngày hôm nay anh ta đi";

  const bookquotes =
    " tôi thấy rằng anh ta chưa để cái tốc biến mình hồi được hiện xanh quá lâu anh ta sử dụng ngay lập tức bằng những tình huống mở giao tranh của mình và chính Tú có Ny là MVP của trận thi đấu này với 14.0 điểm MVP";

  const moviequotes =
    "Một tình huống mà có lẽ Flo đang làm quá nhiều điều, những tình huống bông muq muq muq muq, bỏ chạy với Flo, Flo đang múa quá nhức nách, phải nói là Flo võ công quá cao cường Và đây là Florentino,";

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
                <Nav justify variant="tabs" defaultActiveKey="/home">
                  <Nav.Item>
                    <Nav.Link
                      href="#"
                      className="music-color"
                      onClick={(e) => {
                        setInspi_element(<Music />);
                        setbannerImg("/musicBanner.png");
                        setQuote(musicquotes);
                      }}
                    >
                      <span className="menu-tab">
                        <img src="/music_icon.png" />
                        <p>Music</p>
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className="book-color"
                      onClick={(e) => {
                        setInspi_element(<Book />);
                        setbannerImg("/bookBanner.png");
                        setQuote(bookquotes);
                      }}
                    >
                      <span className="menu-tab">
                        <img src="/book_icon.png" />
                        <p>Book</p>
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className="movie-color"
                      onClick={(e) => {
                        setInspi_element(<Movie />);
                        setbannerImg("/movieBanner.png");
                        setQuote(moviequotes);
                      }}
                    >
                      <span className="menu-tab">
                        <img src="/movie_icon.png" />
                        <p>Movie</p>
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className="menu-filter">{Inspi_element}</div>
            </div>
          </Row>
        </Row>
        <Row></Row>
        <Row></Row>
      </Container>
    </DefaultTemplate>
  );
};

export default Music_inspiration;
