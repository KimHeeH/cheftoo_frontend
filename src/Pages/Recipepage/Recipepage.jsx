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
    <div className=" w-screen ">
      <SearchContainer />
      <Menubar />

      <div className="flex justify-end w-[140px] container overflow-y-auto">
        {" "}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleClick}
            className="bg-gray-400 hover:bg-orange-500 text-white px-6 py-2 rounded-lg transition"
          >
            레시피 등록
          </button>
        </div>
      </div>

      <div className="  container w-full flex flex-wrap pb-[80px]	 lg:gap-16 mt-8">
        {recipeData.map((recipe) => (
          <div key={recipe.recipe_id} className="w-1/2 lg:w-[240px] p-2">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipepage;
