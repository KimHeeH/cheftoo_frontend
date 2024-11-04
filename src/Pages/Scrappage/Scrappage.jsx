import React from "react";
import Navbar from "../../Component/Navbar/Navbar";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import "./Scrappage.style.css";
const Scrappage = () => {
  return (
    <div>
      <SearchContainer />
      <div className="scrap-recipe-container">저장 레시피</div>
      <Navbar />
    </div>
  );
};

export default Scrappage;
