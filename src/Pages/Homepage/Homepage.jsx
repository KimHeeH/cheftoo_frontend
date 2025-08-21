import React from "react";
import "./Homepage.style.css";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import RecommendedRecipe from "../../Component/RecommendedRecipe/RecommendedRecipe";

const Homepage = () => {
  return (
    <div className=" mb-20 lg:mb-4  min-h-screen  bg-[#f9fafb]">
      <SearchContainer />
      <RecommendedRecipe />
    </div>
  );
};

export default Homepage;
