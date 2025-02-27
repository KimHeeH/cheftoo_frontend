import React from "react";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Navbar from "../../Component/Navbar/Navbar";
import Menubar from "../../Component/Menubar/Menubar";
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
      <div className="flex container justify-end mt-4 cursor-pointer ">
        <div
          onClick={() => goAddRecipePage()}
          className=" hover:text-[#3B3A36] bg-[#FAFAFA] text-[#808080] w-28 h-10 flex justify-center items-center"
        >
          레시피 등록
        </div>
      </div>
    </div>
  );
};

export default Recipepage;
