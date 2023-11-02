import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Login_SignUp from "./screen/Login_SignUp";
import LoginPage from "./testConnect/LoginPage";
import DisplayUserInfo from "./testConnect/DisplayUserInfo";
import Oauth2Proceed from "./testConnect/Oauth2Proceed";
import Home from "./screen/Home";
import BlogList from "./screen/BlogList";
import Music_inspiration from "./screen/Music_Inspiration";
import Movie_inspiration from "./screen/Movie_inspiration";
import Book_inspiration from "./screen/Book_imspiration";
import Portfolio from "./screen/Portfolio";
import BlogListTest from "./screen/test";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<BlogListTest />} />
        <Route path="/login" element={<Login_SignUp />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/musicInspiration" element={<Music_inspiration />} />
        <Route path="/bookInspiration" element={<Book_inspiration />} />
        <Route path="/movieInspiration" element={<Movie_inspiration />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/default" element={<DisplayUserInfo />} />
        <Route
          path="/oauth2proceed/:accessToken/:refreshToken"
          element={<Oauth2Proceed />}
        />
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
  );
}

export default App;
