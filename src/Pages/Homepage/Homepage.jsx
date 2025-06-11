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
    <div className="h-screen overflow-hidden overflow-y-scroll	">
      <SearchContainer />
      <MenuBar />
      <RecommendedRecipe />
    </div>
  );
};

export default Homepage;
