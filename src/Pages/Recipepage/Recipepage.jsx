import React, { useEffect } from "react";
import axios from "axios";
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
  const [recipeData, setRecipeData] = useState([]);
  // const goAddRecipePage = () => {
  //   navigate("/add");
  // };
  const handleClick = async () => {
    try {
      const status = await checkAuthGuard();
      if (status === 200) {
        navigate("/add");
      } else {
        alert("로그인이 필요합니다.");
        kakaoLoginHandler();
      }
    } catch (error) {
      console.error("인증 오류:", error);
      alert("로그인이 필요합니다.");
      kakaoLoginHandler();
    }
  };
  const getReipceData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes", {
        withCredentials: true,
      });
      console.log(response.data);
      setRecipeData(response.data);
      console.log("recipeData는", recipeData);
    } catch (error) {
      console.error("레시피 조회 오류");
    }
  };
  useEffect(() => {
    getReipceData();
  }, []);
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
    <div className=" w-screen">
      <SearchContainer />
      <Menubar />
      <div></div>
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

      <div className="container w-full flex gap-16 mt-8">
        {recipeData.map((recipe) => (
          <div className="w-1/2  ">
            <div className="border-4 w-full h-[300px] flex justify-center items-center">
              img
            </div>
            <div className="w-full text-center mt-2 font-gowun text-lg">
              찹쌀떡님의{" "}
            </div>
            <div className="w-full text-center  text-lg font-gowun ">
              {recipe?.recipe_title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipepage;
