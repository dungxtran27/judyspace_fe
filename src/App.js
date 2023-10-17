import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import DisplayUserInfo from "./component/DisplayUserInfo";
import Oauth2Proceed from "./component/Oauth2Proceed";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/default" element={<DisplayUserInfo/>}/>
          <Route path="/oauth2proceed/:accessToken/:refreshToken" element={<Oauth2Proceed/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
