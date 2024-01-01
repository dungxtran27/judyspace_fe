import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login_SignUp from "./screen/Login_SignUp";
import DisplayUserInfo from "./testConnect/DisplayUserInfo";
import Oauth2Proceed from "./testConnect/Oauth2Proceed";
import Home from "./screen/Home";
import BlogList from "./screen/BlogList";
import Music_inspiration from "./screen/Music_Inspiration";
import Movie_inspiration from "./screen/Movie_inspiration";
import Book_inspiration from "./screen/Book_imspiration";
import Portfolio from "./screen/Portfolio";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comment from "./component/Comment";
import UploadForm from "./testConnect/AddBlog";
import { createContext, useEffect, useState } from "react";
import BlogDetail from "./screen/BlogDetail";
import InteractiveImage from "./testConnect/TestingInteractiveImage";
import JwtRefreshing from "./testConnect/JwtRefreshing";
import AddMovie from "./screen/AddMovies";
import Inspiration from "./screen/Inspiration";
import Music_Managing from "./screen/Music_Managing";
export const userGlobe = createContext();

function App() {
  const accessToken = localStorage.getItem("accessToken");
  const [user, setUser] = useState();
  console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/users/getCurrentUserInfo",
        {
          method: "GET",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            setUser(data);
          });
        } else {
          if (response.status === 401) {
            refreshAccessToken().then(() => {
              fetchData();
            });
  
            console.log("da hell");
          }
          
        }
      });
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (accessToken === null) {
  //   } else {
  //     fetch("http://localhost:8080/api/users/getCurrentUserInfo", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setUser(data);
  //       })
  //       .catch((error) => {
  //         console.log("Fetch error: ", error);
  //       });
  //   }
  // }, []);
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
    <userGlobe.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login_SignUp />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/music" element={<Music_inspiration />} />
          <Route path="/book" element={<Book_inspiration />} />
          <Route path="/movie" element={<Movie_inspiration />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/default" element={<DisplayUserInfo />} />
          <Route path="/cmt" element={<Comment type parameter refreshcmt />} />
          <Route
            path="/oauth2proceed/:accessToken/:refreshToken"
            element={<Oauth2Proceed />}
          />
          <Route path="/jwt" element={<JwtRefreshing />} />
          <Route path="/addMovie" element={<AddMovie />} />
          <Route path="/testingImageUpload" element={<UploadForm />} />
          <Route path="/blog/blogDetail/:blogId" element={<BlogDetail />} />
          <Route
            path="/testingInteractiveImage"
            element={<InteractiveImage />}
          />
          <Route path="/inspiration" element={<Inspiration/>}/>
          <Route path="/musicManaging" element={<Music_Managing/>}/>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </userGlobe.Provider>
  );
}

export default App;
