import React from "react";
import "./Homepage.style.css";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import RecommendedRecipe from "../../Component/RecommendedRecipe/RecommendedRecipe";
import Navbar from "../../Component/Navbar/Navbar";
const Homepage = () => {
  return (
    <div>
      <SearchContainer />
      <RecommendedRecipe />
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default Homepage;
