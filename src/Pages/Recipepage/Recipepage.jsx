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
      const response = await axios.get("http://localhost:8080/recipe", {
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
  const goAddRecipe = () => {
    navigate("/add");
  };
  return (
    <div className="container w-screen ">
      <SearchContainer />
      <Menubar />
      <div className="w-full  h-12 flex justify-end mt-8 items-center">
        <div
          onClick={() => goAddRecipe()}
          className="w-40 bg-orange-500 h-12 flex justify-center items-center text-white text-lg rounded-xl cursor-pointer  mb-10"
        >
          레시피 등록하기
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

      <div className="flex justify-center w-full px-4">
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
