import React from "react";
import { useState } from "react";
import "./RecommendedRecipe.style.css";
import firstImg from "./img/firstImg.png";
import secondImg from "./img/image.png";
import thirdImg from "./img/image-1.png";
import forthImg from "./img/image-2.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import cookbook from "./img/cookbook.png";
import RecipeSlider from "../Slider/RecipeSlider";
import { Pencil } from "lucide-react";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import backgroundImg from "./img/bgImg1.png";
import InputContainer from "../SearchContainer/InputContainer";
import { useEffect } from "react";
import axios from "axios";
const RecommendedRecipe = () => {
  const kakaoLoginHandler = useKakaoLogin("/recipe", "/add");
  const [popularRecipeList, setPopularRecipeList] = useState([]);
  const navigate = useNavigate();

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
  const fetchPopularRecipe = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/recipe/popular-top10"
      );
      setPopularRecipeList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("인기 레시피 불러오기 오류");
    }
  };
  useEffect(() => {
    fetchPopularRecipe();
  }, []);

  return (
    <div className="relative p-3 lg:overflow-x-hidden overflow-y-auto lg:mt-0 lg:mb-24 ">
      <div className="relative container  lg:mt-0 h-[100px] lg:h-[120px]"></div>
      <div className="pl-6 lg:pl-0 container mt-12 mb-6lg:mb-0 border-t pt-4">
        <h2 className="text-lg lg:text-2xl font-semibold text-[#3B3A36]">
          {" "}
          인기 레시피
        </h2>
        <p className="text-gray-500 mt-3 text-base lg:text-lg">
          지금 가장 인기있는 레시피들을 만나보세요!
        </p>
      </div>
      <div className="w-full">
        <RecipeSlider />
      </div>
    </div>
  );
};

export default RecommendedRecipe;
