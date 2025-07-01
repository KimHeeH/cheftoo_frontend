import React from "react";
import "./Homepage.style.css";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import RecommendedRecipe from "../../Component/RecommendedRecipe/RecommendedRecipe";
import MenuBar from "../../Component/Menubar/Menubar";
import { useEffect } from "react";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import { useState } from "react";

const Homepage = () => {
  return (
    <div className=" mb-20 lg:mb-4  min-h-screen overflow-y-auto overflow-y-scroll ">
      <SearchContainer />
      <MenuBar />
      <RecommendedRecipe />
    </div>
  );
};

export default Homepage;
