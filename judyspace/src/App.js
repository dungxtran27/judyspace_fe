import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

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
export const userGlobe = createContext();

function App() {
  const accessToken = localStorage.getItem("accessToken");
  const [user, SetUser] = useState();
  useEffect(() => {
    if (accessToken === null) {
      console.log("deo on roi");
    } else {
      fetch("http://localhost:8080/api/users/getCurrentUserInfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          SetUser(data);
          console.log(data);
        })
        .catch((error) => {
          console.log("Fetch error: ", error);
        });
    }
  }, []);
  return (
    <userGlobe.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login_SignUp />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/musicInspiration" element={<Music_inspiration />} />
          <Route path="/bookInspiration" element={<Book_inspiration />} />
          <Route path="/movieInspiration" element={<Movie_inspiration />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/default" element={<DisplayUserInfo />} />
          <Route path="/cmt" element={<Comment type parameter refreshcmt />} />
          <Route
            path="/oauth2proceed/:accessToken/:refreshToken"
            element={<Oauth2Proceed />}
          />

          <Route path="/testingImageUpload" element={<UploadForm />} />
          <Route path="/blog/blogDetail/:blogId" element={<BlogDetail />} />
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
