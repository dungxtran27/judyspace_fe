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
  if (accessToken !== null) {
    JwtRefreshing("http://localhost:8080/api/users/getCurrentUserInfo");
  }
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
          <Route path="/inspiration" element={<Inspiration />} />
          <Route path="/musicManaging" element={<Music_Managing />} />
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
