import {
  Container,
  Form,
  FormControl,
  Nav,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import DefaultTemplate from "../template/DefaultTemplate";
import { useEffect, useState } from "react";
import "../css/inspiration.css";
import Music from "../component/music";
import Book from "../component/book";
import Movie from "../component/movie";
const Music_inspiration = () => {
  const [activeTab, setActiveTab] = useState("music");
  const [color_header, setColor] = useState("yellow");
  const [Inspi_element, setInspi_element] = useState(<Music />);
  const musicquotes =
    " Không biết anh Thành Vũ có biết Tú có Ny anh ta đi cầm Flore trận thi đấu vừa xong là trận ";

  const bookquotes =
    "rằng anh ta chưa để cái tốc biến mình hồi ủa trận thi đấu này với 14.0 điểm MVP";

  const moviequotes =
    "Một tình huống mà có lẽ Flo đang làm quá ngFlo, Flo đang múa quá nhức nách,";

  const [quote, setQuote] = useState(musicquotes);
  return (
    <DefaultTemplate>
      <Container fluid>
        <Row
          className="backgroundImg"
          style={{
            backgroundImage: `url(${(() => {
              console.log(activeTab);
              switch (activeTab) {
                case "music":
                  return "musicBanner.png";
                case "book":
                  return "bookBanner.png";
                case "movie":
                  return "movieBanner.png";
                // Add more cases as needed
                default:
                  return null; // Or render a default component
              }
            })()})`,
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
                        setInspi_element(<Music/>);
                        setQuote(musicquotes);
                        setActiveTab("music");
                        setColor("aqua");
                      }}
                    >
                      <span className="menu-tab">
                        <img src="https://images.vexels.com/media/users/3/270787/isolated/preview/c2b289d29af9a7e39c56b7bb26e638af-rainbow-cassette-icon.png" />
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
                        setQuote(bookquotes);
                        setActiveTab("book");
                        setColor("green");
                      }}
                    >
                      <span className="menu-tab">
                        <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/book-folder-pen-pencil-notebook-education-log-office-15-8770.png?f=webp&w=256" />
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
            </div>
          </Row>
        </Row>
        <Row className="contentContainer">
          
          <div className="inspirationContent">
            {(() => {
              console.log(activeTab);
              switch (activeTab) {
                case "music":
                  return <Music />;
                case "book":
                  return <Book />;
                case "movie":
                  return <Movie/>;
                default:
                  return null; // Or render a default component
              }
            })()}
          </div>
        </Row>
        <Row></Row>
      </Container>
    </DefaultTemplate>
  );
};

export default Music_inspiration;
