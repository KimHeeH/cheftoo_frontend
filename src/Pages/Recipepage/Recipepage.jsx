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

  return (
    <div className="container w-screen ">
      <SearchContainer />
      <Menubar />

      <div className="w-full flex justify-center lg:flex-col items-center lg:mt-8">
        <div className="flex gap-3 text-lg lg:text-2xl font-semibold text-center">
          오늘 뭐 먹지 고민될 땐?{" "}
          <span className=" text-[#FA590F]">오늘의 레시피</span>
        </div>

        {/* <div className="text-lg text-gray-600 text-center mt-2">
          
        </div> */}
      </div>
      <div className="flex justify-center w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[900px] mt-8 pb-[80px]">
          {recipeData.map((recipe) => (
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
