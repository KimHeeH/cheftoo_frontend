import React from "react";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Navbar from "../../Component/Navbar/Navbar";
import Menubar from "../../Component/Menubar/Menubar";
import addIcon from "./img/add-recipe-btn.svg";
import RecipeAddpage from "./add/RecipeAddpage";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Recipepage = () => {
  const navigate = useNavigate();
  const kakaoLoginHandler = useKakaoLogin("/recipe", "/add");

  const [isHovered, setIsHovered] = useState(false);
  const goAddRecipePage = () => {
    navigate("/add");
  };
  const handleClick = () => {
    kakaoLoginHandler(); // ✅ 카카오 로그인 실행
    goAddRecipePage(); // ✅ 추가 페이지로 이동
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
      <div className="flex justify-end w-full container">
        {" "}
        <div
          onClick={() => handleClick()}
          className="cursor-pointer border-1 flex justify-center items-center w-[160px] h-[50px] mt-3 text-center bg-gray-100 text-black text-lg font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-200 transition-all"
        >
          레시피 등록
        </div>
      </div>
    </div>
  );
};

export default Recipepage;
