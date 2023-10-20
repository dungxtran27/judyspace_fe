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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login_SignUp />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/musicInspiration" element={<Music_inspiration />} />
        <Route path="/bookInspiration" element={<Book_inspiration />} />
        <Route path="/movieInspiration" element={<Movie_inspiration />} />
        <Route path="/default" element={<DisplayUserInfo />} />
        <Route
          path="/oauth2proceed/:accessToken/:refreshToken"
          element={<Oauth2Proceed />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
