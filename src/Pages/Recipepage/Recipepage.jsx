import React from "react";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Navbar from "../../Component/Navbar/Navbar";
import Menubar from "../../Component/Menubar/Menubar";
import "./Recipepage.style.css";
import addIcon from "./img/add-recipe-btn.svg";
import RecipeAddpage from "./add/RecipeAddpage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Recipepage = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const goAddRecipePage = () => {
    navigate("/add");
  };
  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };
  const onToggleClick = () => {
    setIsHovered(!isHovered);
  };
  return (
    <div className="recipe-page-all-container">
      <SearchContainer />
      <Menubar />
      <div className="popular-recipe-container">인기 레시피</div>
      <div
        className="add-recipe-btn-container"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isHovered ? (
          <div className="add-recipe-font" onClick={() => goAddRecipePage()}>
            나의 레시피 추가
          </div>
        ) : (
          ""
        )}
        <img
          className={`add-recipe-plus-icon ${isHovered ? "rotated" : ""}`}
          onClick={onToggleClick}
          src={addIcon}
          alt="plus"
        />
      </div>
    </div>
  );
};

export default Recipepage;
