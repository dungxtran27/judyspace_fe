import { useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import Book_inspiration from "./Book_imspiration";
import Movie_inspiration from "./Movie_inspiration";
import Music_inspiration from "./Music_Inspiration";

export default function Inspiration() {
  const [tab, setTab] = useState("movie");
  const toogleTab = (choosenTab) => {
    const currentActiveTab = document.getElementsByClassName("activeTab");
    currentActiveTab.map((tab) => tab.classList.remove("activeTab"));
    setTab(choosenTab);
  };
  return (
    <DefaultTemplate>
      <div className="tabIconsContainer">
        <div
          onClick={(e) => setTab("movie")}
          className={`tabIcon ${tab === "movie" ? "activeTab" : ""}`}
          style={{
            background:
              "linear-gradient(to right, RGB(255, 0, 0, 0.8), rgb(255, 106, 0, 0.6))",
          }}
        >
          <img style={{ width: "50px" }} src="./neonMovie.png" />
        </div>
        <div
          onClick={(e) => setTab("music")}
          className={`tabIcon ${tab === "music" ? "activeTab" : ""}`}
          style={{
            background:
              "linear-gradient(30deg, rgba(60,100,159,0.6) 0%, rgba(68,67,162,0.6) 62%, rgba(242,139,188,0.6) 100%)",
          }}
        >
          <img style={{ width: "50px " }} src="./neonMusic.png" />
        </div>
        <div
          onClick={(e) => setTab("book")}
          className={`tabIcon ${tab === "book" ? "activeTab" : ""}`}
          style={{
            background:
              "linear-gradient(to right, rgb(103, 178, 111, 0.6), rgb(76, 162, 205, 0.6))",
          }}
        >
          <img style={{ width: "50px", zIndex: "1" }} src="./neonBook.png" />
        </div>
      </div>
      {(() => {
        switch (tab) {
          case "music":
            return <Music_inspiration />;
          case "book":
            return <Book_inspiration />;
          case "movie":
            return <Movie_inspiration />;
          default:
            return <Music_inspiration />;
        }
      })()}
    </DefaultTemplate>
  );
}
