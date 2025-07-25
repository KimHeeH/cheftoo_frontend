import React, { useEffect } from "react";
import axios from "axios";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Menubar from "../../Component/Menubar/Menubar";
import addIcon from "./img/add-recipe-btn.svg";
import RecipeAddpage from "./add/RecipeAddpage";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RecipeCard from "../../Component/RecipeCard/RecipeCard";
import InputContainer from "../../Component/SearchContainer/InputContainer";
const Recipepage = () => {
  const navigate = useNavigate();
  const kakaoLoginHandler = useKakaoLogin("/recipe", "/add");
  const [isHovered, setIsHovered] = useState(false);
  const [recipeData, setRecipeData] = useState([]);

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
      const response = await axios.get("http://localhost:8080/recipe", {
        withCredentials: true,
      });
      setRecipeData(response.data);
      console.log(response.data);
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
  const goAddRecipe = () => {
    navigate("/add");
  };
  return (
    <div className="container w-screen ">
      <SearchContainer />
      <Menubar />
      <div className="relative w-full  h-12 flex justify-end lg:mt-8 items-center">
        <div
          onClick={goAddRecipe}
          className="fixed lg:top-60  bottom-10 left-1/2 -translate-x-1/2  lg:bottom-auto lg:left-auto lg:translate-x-0 lg:right-50lg: lg:w-40 h-12 mb-10 mr-4 bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all duration-150
             text-white text-lg font-semibold rounded-xl shadow-md flex items-center justify-center cursor-pointer w-full  max-w-[400px]"
        >
          + 레시피 등록
        </div>
      </div>
      <div className="w-full relative flex flex-col items-center h-40  mt-1">
        <div className="text-xl lg:text-2xl font-bold text-[#3B3A36]">
          오늘의 요리는?
        </div>
        <div className="w-full absolute top-14 left-1/2  -translate-x-1/2">
          <InputContainer />
        </div>
      </div>

      <div className="flex justify-center w-full px-4 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-[900px]  pb-[80px]">
          {/* {console.log("recipeData:", recipeData, typeof recipeData, Array.isArray(recipeData))} */}
          {recipeData?.content?.map((recipe) => (
            <div key={recipe.recipe_id} className="w-full">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recipepage;
