import React from "react";
import "./Homepage.style.css";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import RecommendedRecipe from "../../Component/RecommendedRecipe/RecommendedRecipe";
import MenuBar from "../../Component/Menubar/Menubar";
const Homepage = () => {
  return (
    <div>
      <SearchContainer />
      <MenuBar />
      <RecommendedRecipe />
    </div>
  );
};

export default Homepage;
