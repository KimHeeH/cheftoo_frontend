import React from "react";
import "./RecommendedRecipe.style.css";
import firstImg from "./img/firstImg.png";
import secondImg from "./img/image.png";
import thirdImg from "./img/image-1.png";
import forthImg from "./img/image-2.png";
import { useNavigate } from "react-router-dom";
import cookbook from "./img/cookbook.png";
import RecipeSlider from "../Slider/RecipeSlider";
import { Pencil } from "lucide-react";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import backgroundImg from "./img/bgImg1.png";
import InputContainer from "../SearchContainer/InputContainer";
const RecommendedRecipe = () => {
  const kakaoLoginHandler = useKakaoLogin("/recipe", "/add");

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
  return (
    <div className="relative p-3 lg:overflow-x-hidden overflow-y-auto lg:mt-0 lg:mb-24 ">
      {/* <div className="animate-fadeIn">
        <div className="lg:w-[400px] relative font-gowun line container leading-relaxed flex justify-center  mt-12 lg:text-2xl lg:mt-8     ">
          <span className=" mr-1  text-[#3B3A36] lg:mr-4">
            소중한 나의 레시피
          </span>
          <img src={cookbook} alt="cookbook" className="w-6 lg:w-10" />
        </div>
        <div className="lg:w-[400px] relative font-gowun line container leading-relaxed flex justify-center lg:text-2xl     ">
          <div className="text-center text-lg text-[#3B3A36] lg:text-2xl mt-1">
            함께 나누면 더 맛있어요!
          </div>
        </div>
      </div> */}

      <div className="relative container  lg:mt-0 h-[100px] lg:h-[120px]">
        {/* <img
          className="w-full h-full absolute top-0 left-0 object-cover opacity-50 z-0"
          src={backgroundImg}
        />
        <div className="relative pl-2 lg:pl-12 z-10 flex flex-col h-full justify-center ">
          {" "}
          <h1 className="text-xl lg:text-4xl font-bold text-black mb-4 animate-fade-in">
            오늘의 레시피를 찾아보세요!
          </h1>
          <p className="text-sm lg:text-2xl  text-gray-500 ">
            당신의 요리를 공유하고<br></br> 새로운 레시피를 발견해보세요.
          </p>
          <button
            onClick={handleClick}
            className="flex items-center  gap-2 w-[165px] lg:w-[200px] mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow-md transition"
          >
            <Pencil size={18} className="text-white" />
            <span className="text-xs lg:text-base font-medium">
              레시피 등록하기
            </span>
          </button>
        </div> */}
        <div className="w-full relative flex flex-col items-center   mt-4">
          <div className="text-xl lg:text-2xl font-bold text-[#3B3A36]">
            오늘의 요리는?
          </div>
          <div className="w-full absolute top-14 left-1/2  -translate-x-1/2">
            <InputContainer />
          </div>
        </div>
      </div>
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
      {/* <div className=" container flex gap-2 h-[300px] mt-16 lg:gap-4 lg:h-[480px]">
        <div className="w-1/2 flex justify-end lg:h-full overflow-hidden">
          <img
            className="w-full hover:scale-105  transition duration-300 ease-in-out"
            src={firstImg}
            alt="firstImg"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2 min-h-0 h-[300px] lg:gap-4 lg:h-full lg:h-[480px] overflow-hidden">
          <div className="flex w-full gap-2 min-w-0">
            <img
              className="flex-1 object-cover min-w-0  hover:scale-105  transition duration-300 ease-in-out"
              src={secondImg}
              alt="secondImg"
            />
            <img
              className="flex-1 object-cover min-w-0  hover:scale-105  transition duration-300 ease-in-out"
              src={thirdImg}
              alt="forthImg"
            />
          </div>

          <img
            className="flex-1 object-cover min-h-0  hover:scale-105  transition duration-300 ease-in-out"
            src={forthImg}
            alt="thirdImg"
          />
        </div>
      </div> */}
    </div>
  );
};

export default RecommendedRecipe;
