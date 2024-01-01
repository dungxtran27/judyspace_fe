import {
  Button,
  Container,
  Form,
  FormControl,
  FormLabel,
  Image,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import "../css/music.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faCircleXmark,
  faEllipsis,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";
export default function Music_Managing() {
  const [allSongs, setAllSongs] = useState([]);
  const [playLists, setPlayLists] = useState([]);
  const [activePlayList, setActivePlayList] = useState({});
  const [songList, setSongList] = useState([]);
  const [playingSong, setPlayingSong] = useState({});
  const [refreshState, setRefreshState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [addSong, setAddSong] = useState(0);
  const [newPlayList, setNewPlayList] = useState({
    playListName: "Tên mặc định",
    playListCover: "https://i.ytimg.com/vi/r8qXO4i-L0o/maxresdefault.jpg",
  });
  const [newSong, setNewSong] = useState({
    songName: "Tên mặc định",
    artistName: "Tên mặc định",
    spotifyEmbededLink: "",
    quote: "",
  });
  const open = Boolean(anchorEl);
  const handleClick = (event, songId) => {
    setAddSong(songId);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorElPlayLists, setAnchorElPlayLists] = useState(null);
  const openPlayLists = Boolean(anchorElPlayLists);
  const handleClickPlayLists = (event) => {
    setAnchorElPlayLists(event.currentTarget);
  };
  const handleClosePlayLists = () => {
    setAnchorElPlayLists(null);
  };
  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = (e, musicOrPlayList) => {
    setShow(true);
    setAddMusicOrPlayList(musicOrPlayList);
  };
  const [addMusicOrPlayList, setAddMusicOrPlayList] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8080/api/music/playlist/getAll")
      .then((response) => response.json())
      .then((data) => {
        setPlayLists(data);
        setActivePlayList(data[0]);
      });
  }, [refreshState]);

  useEffect(() => {
    const getAllSongs = async () => {
      const response = await fetch(`http://localhost:8080/api/music/getAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setAllSongs(data);
      } else {
        if (response.status === 401) {
          await refreshAccessToken();
          await getAllSongs();
        } else if (response.status === 417) {
          toast.error("đăng nhập đê bạn ê");
          window.location.href = "/login";
        } else {
          toast.error(data.value);
        }
      }
    };
    getAllSongs();
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
  }, [activePlayList, refreshState]);
  const addOrRemove = async (songId, playListId) => {
    const response = await fetch(
      `http://localhost:8080/api/music/addOrRemoveFromPlayList/${songId}/${playListId}`,
      {
        method: "Post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      handleClose();
      handleClosePlayLists();
      toast.success(data.value);
      setRefreshState(refreshState ? false : true);
    } else {
      if (response.status === 401) {
        await refreshAccessToken();
        await addOrRemove(songId, playListId);
      } else if (response.status === 417) {
        toast.error("đăng nhập đê bạn ê");
        window.location.href = "/login";
      } else {
        toast.error(data.value);
      }
    }
  };
  const addSongOrPlayList = async () => {
    const response = await fetch(
      `${
        addMusicOrPlayList
          ? "http://localhost:8080/api/music/add"
          : "http://localhost:8080/api/music/playList/add"
      }`,
      {
        method: "Post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addMusicOrPlayList ? newSong : newPlayList),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      toast.success(data.value);
      setRefreshState(refreshState ? false : true);
      handleCloseModal();
      setRefreshState(refreshState ? false : true);
    } else {
      if (response.status === 401) {
        await refreshAccessToken();
        await addSongOrPlayList();
      } else if (response.status === 417) {
        toast.error("đăng nhập đê bạn ê");
        window.location.href = "/login";
      } else {
        toast.error(data.value);
      }
    }
  };

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
  const handleUpdateNewPlayList = (key, value) => {
    const updatedPlayList = { ...newPlayList, [key]: value };
    console.log(JSON.stringify(updatedPlayList));
    setNewPlayList(updatedPlayList);
  };
  const updateNewSong = (key, value) => {
    const updatedSong = { ...newSong, [key]: value };
    console.log(JSON.stringify(updatedSong));
    setNewSong(updatedSong);
  };
  return (
    <Container className="musicManagingContainer">
      <Row className="allSonngs">
        <h4 style={{ color: "white" }}>Kho nhạc</h4>

        <Table className="songTable">
          <thead style={{ backgroundColor: "rgb(0, 0, 0, 0)" }}>
            <tr>
              <td className="col-sm-1">#</td>
              <td className="col-sm-10">TÊN BÀI HÁT</td>
              <td className="col-sm-1"></td>
            </tr>
          </thead>
          <tbody className="songTbody">
            {allSongs.map((song, index) => (
              <tr key={song.songId} className={`col-sm-1`}>
                <td className="col-sm-1">{index + 1}</td>
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
                <td className="action">
                  <FontAwesomeIcon
                    onClick={(e) => {
                      handleClick(e, song.songId);
                    }}
                    className="removeSong"
                    icon={faEllipsis}
                    size="2x"
                  />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={(e) => {
                        handleClickPlayLists(e);
                      }}
                    >
                      Thêm vào PlayList
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Xoá</MenuItem>
                  </Menu>
                  <Menu
                    id="basic-menu-playList"
                    anchorEl={anchorElPlayLists}
                    open={openPlayLists}
                    onClose={handleClosePlayLists}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {playLists.map((p) => (
                      <MenuItem
                        key={p.musicPlaylistId}
                        onClick={(e) => {
                          addOrRemove(addSong, p.musicPlaylistId);
                        }}
                      >
                        {p.playListName}
                      </MenuItem>
                    ))}
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={(e) => handleShowModal(e, true)}>Add new Song</Button>
      </Row>
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
            <div
              onClick={(e) => handleShowModal(e, false)}
              style={{
                backgroundColor: "RGB(255, 255, 255, 0.7)",
              }}
              className={`playList addNewPlayList`}
            >
              <FontAwesomeIcon
                icon={faPlus}
                style={{ position: "relative", top: "-12px", left: "5px" }}
              />
              <h6 style={{ color: "black", margin: "10px" }}>Tạo PlayList</h6>
            </div>
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
                  <td className="col-sm-10">TÊN BÀI HÁT</td>
                  <td className="col-sm-1">Xoá</td>
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
                    <td>
                      <FontAwesomeIcon
                        onClick={(e) =>
                          addOrRemove(
                            song.songId,
                            activePlayList.musicPlaylistId
                          )
                        }
                        className="removeSong"
                        icon={faCircleXmark}
                        color="RGB(226 45 70)"
                        size="2x"
                      />
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
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {addMusicOrPlayList ? "Thêm nhạc" : "Tạo PlayList"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {addMusicOrPlayList ? (
              <>
                <FormLabel>Tên bài hát</FormLabel>
                <FormControl
                  type="text"
                  onChange={(e) => {
                    updateNewSong("songName", e.currentTarget.value);
                  }}
                />
                <FormLabel>Tên nghệ sĩ</FormLabel>
                <FormControl
                  type="text"
                  onChange={(e) => {
                    updateNewSong("artistName", e.currentTarget.value);
                  }}
                />
                <FormLabel>Link Spotify</FormLabel>
                <FormControl
                  type="text"
                  onChange={(e) => {
                    updateNewSong("spotifyEmbededLink", e.currentTarget.value);
                  }}
                />
                <FormLabel>Quote</FormLabel>
                <FormControl
                  type="text"
                  onChange={(e) => {
                    updateNewSong("quote", e.currentTarget.value);
                  }}
                />
              </>
            ) : (
              <>
                <FormLabel>Tên playlist</FormLabel>
                <FormControl
                  type="text"
                  onChange={(e) => {
                    handleUpdateNewPlayList(
                      "playListName",
                      e.currentTarget.value
                    );
                  }}
                />
                <FormLabel>Ảnh Cover</FormLabel>
                <FormControl
                  type="text"
                  onChange={(e) => {
                    handleUpdateNewPlayList(
                      "playListCover",
                      e.currentTarget.value
                    );
                  }}
                />
              </>
            )}
          </Form>
          ;
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              addSongOrPlayList(e);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
