import React from "react";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Navbar from "../../Component/Navbar/Navbar";
import "./Recipepage.style.css";
import addIcon from "./img/add-recipe-btn.svg";
import RecipeAddpage from "./add/RecipeAddpage";
import { useNavigate } from "react-router-dom";
const Recipepage = () => {
  const navigate = useNavigate();

  const goAddRecipePage = () => {
    navigate("/add");
  };
  return (
    <div className="recipe-page-all-container">
      <SearchContainer />
      <div className="popular-recipe-container">인기 레시피</div>
      <div
        className="add-recipe-btn-container"
        onClick={() => goAddRecipePage()}
      >
        <img className="add-recipe-plus-icon" src={addIcon} alt="plus" />
        <button className="add-recipe-btn">
          나의 레시피 <br />
          등록하기
        </button>
      </div>
      <Navbar />
    </div>
  );
};

export default Recipepage;
