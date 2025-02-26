import React from "react";
import "./Homepage.style.css";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import RecommendedRecipe from "../../Component/RecommendedRecipe/RecommendedRecipe";
// import Navbar from "../../Component/Navbar/Navbar";
import MenuBar from "../../Component/Menubar/Menubar";
const Homepage = () => {
  return (
    <div>
      <SearchContainer />
      <MenuBar />
      <RecommendedRecipe />
      {/* <div>
        <Navbar />
      </div> */}
    </div>
  );
};

export default Homepage;
