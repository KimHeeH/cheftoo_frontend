import React from "react";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Navbar from "../../Component/Navbar/Navbar";
import "./Recipepage.style.css";
const Recipepage = () => {
  return (
    <div>
      <div className="recipe-page-container">
        <SearchContainer />
        <div className="popular-recipe-container">인기 레시피</div>
        <Navbar />
      </div>
    </div>
  );
};

export default Recipepage;
