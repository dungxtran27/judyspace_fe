import { Container, Image, Row, Table } from "react-bootstrap";
import "../css/music.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
const Music = () => {
  const [playLists, setPlayLists] = useState([]);
  const [activePlayList, setActivePlayList] = useState({});
  const [songList, setSongList] = useState([]);
  const [playingSong, setPlayingSong] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/api/music/playlist/getAll")
      .then((response) => response.json())
      .then((data) => {
        setPlayLists(data);
        setActivePlayList(data[0]);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (activePlayList && activePlayList.musicPlaylistId) {
        const response = await fetch(
          `http://localhost:8080/api/music/playList/getSongs/${activePlayList.musicPlaylistId}`
        );
        const data = await response.json();
        setSongList(data);
        setPlayingSong(data[0]);
      }
    };

    fetchData();
  }, [activePlayList]);

  return (
    <Container fluid className="musicContainer">
      <Row className="musicPlaylists">
        <Row>
          <h4 style={{ color: "white" }}>Danh sách phát của tui</h4>
          <div className="playListContainer">
            {playLists.map((p) => (
              <div
                key={p.musicPlaylistId}
                onClick={(e) => setActivePlayList(p)}
                style={{
                  backgroundImage: `url(${p.playListCover})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  verticalAlign: "bottom",
                }}
                className={`playList ${
                  activePlayList.musicPlaylistId === p.musicPlaylistId
                    ? "active"
                    : ""
                }`}
              >
                <h6 style={{ color: "white", margin: "10px" }}>
                  {p.playListName}
                </h6>
              </div>
            ))}
          </div>
        </Row>
      </Row>
      <Row className="activePlayList">
        <div className="songs">
          <h4 style={{ color: "white" }}>
            {activePlayList.playListName?.toUpperCase()}
          </h4>
          {playingSong ? (
            <Table className="songTable">
              <thead style={{ backgroundColor: "rgb(0, 0, 0, 0)" }}>
                <tr>
                  <td className="col-sm-1">#</td>
                  <td className="col-sm-11">TÊN BÀI HÁT</td>
                </tr>
              </thead>
              <tbody className="songTbody">
                {songList.map((song, index) => (
                  <tr
                    onClick={(e) => setPlayingSong(song)}
                    key={song.songId}
                    className={`col-sm-1 ${
                      song.songId === playingSong.songId ? "active" : ""
                    }`}
                  >
                    <td className="col-sm-1">
                      {song.songId === playingSong.songId ? (
                        <FontAwesomeIcon icon={faPlay} color="white" />
                      ) : (
                        index + 1
                      )}
                    </td>
                    <td className="col-sm-11">
                      <p
                        style={{
                          fontFamily: "montserrat, san-serif",
                          fontSize: "17px",
                        }}
                      >
                        {song.songName}
                      </p>
                      <p style={{ color: "rgb(255, 255, 255, 0.7)" }}>
                        {song.artistName}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div>
              <Image src="https://cdn-icons-png.flaticon.com/128/4076/4076503.png" />
              <h4 style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                Danh sách phát trống
              </h4>
            </div>
          )}
        </div>
        <div className="playerWrapper">
          <div
            className="playerBackGround"
            style={{
              backgroundImage: `url(${activePlayList.playListCover})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <div
            className="spinningDisk"
            style={{
              backgroundImage: `url(${activePlayList.playListCover})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="outerDiskHole"></div>
          <div className="diskHole"></div>
          {playingSong ? (
            <div className="iframeWrapper">
              <iframe
                title="hehe"
                style={{ borderRadius: "12px" }}
                src={`${playingSong.spotifyEmbededLink}&autoplay=true`}
                width="100%"
                height="152"
                allowfullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Row>
    </Container>
  );
};

export default Music;
