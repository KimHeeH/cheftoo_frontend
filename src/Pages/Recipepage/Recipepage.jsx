import React from "react";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Navbar from "../../Component/Navbar/Navbar";
import Menubar from "../../Component/Menubar/Menubar";
import addIcon from "./img/add-recipe-btn.svg";
import RecipeAddpage from "./add/RecipeAddpage";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Recipepage = () => {
  const navigate = useNavigate();
  const kakaoLoginHandler = useKakaoLogin("/recipe", "/add");
  const [isHovered, setIsHovered] = useState(false);
  // const goAddRecipePage = () => {
  //   navigate("/add");
  // };
  const handleClick = async () => {
    const status = await checkAuthGuard();
    if (status === 200) {
      navigate("/add");
    } else {
      alert("로그인이 필요합니다.");
      kakaoLoginHandler(); // ✅ 카카오 로그인 실행
    }
    // goAddRecipePage(); // ✅ 추가 페이지로 이동
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
    <div className=" ">
      <SearchContainer />
      <Menubar />
      <div className="flex justify-end w-[140px] container">
        {" "}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleClick}
            className="w-[110px] h-[40px] text-xs lg:text-base lg:w-[130px] lg:px-3 lg:py-2 border border-gray-300 text-gray-700 bg-white rounded-lg shadow-md hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
          >
            레시피 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipepage;
