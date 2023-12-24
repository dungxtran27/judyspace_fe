import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Carousel, Container, Row } from "react-bootstrap";
import "../css/moviePlayList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const Movie = () => {
  const [playLists, setPlayLists] = useState([]);
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/moviePlaylists/getAll",
        {
          method: "GET",
          withCredentials: true,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setPlayLists(data);
        });
    };
    fetchData();
  }, []);
  const refreshAccessToken = async () => {
    fetch("http://localhost:8080/api/auth/refreshToken", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          localStorage.setItem("accessToken", data.value);
          console.log("refreshed: " + data.value);
        });
      } else {
        if (response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }
    });
  };
  return (
    <Container>
      <div className="MoviePlayListContainer">
        {playLists.map((playList) => (
          <Row key={playList.id} className="playList">
            <div className="playListName">
              <h5>
                <FontAwesomeIcon className="playListNameIcon" icon={faStar} />{" "}
                {playList.playListName}
              </h5>
            </div>
            <div className="MoviesCarousel">
              <Carousel style={{backgroundColor: "red"}} activeIndex={index} onSelect={handleSelect}>
                {playList.moviesOfPlaylist.map((movie)=>(
                  <Carousel.Item key={movie.blogId}>
                    <div className="movieCard col-lg-2">

                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default Movie;
