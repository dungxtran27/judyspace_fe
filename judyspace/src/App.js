import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Login_SignUp from "./screen/Login_SignUp";
import LoginPage from "./testConnect/LoginPage";
import DisplayUserInfo from "./testConnect/DisplayUserInfo";
import Oauth2Proceed from "./testConnect/Oauth2Proceed";
import Home from "./screen/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login_SignUp />} />

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
