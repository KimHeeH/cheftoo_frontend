import React from "react";
import "./RecommendedRecipe.style.css";
import firstImg from "./img/firstImg.png";
import secondImg from "./img/image.png";
import thirdImg from "./img/image-1.png";
import forthImg from "./img/image-2.png";
import { useNavigate } from "react-router-dom";
const RecommendedRecipe = () => {
  const navigate = useNavigate();
  const goAddRecipePage = () => {
    navigate("/add");
  };
  return (
    <div className="mt-8 relative overflow-x-hidden overflow-y-auto lg:mt-16 lg:mb-24 ">
      <div className=" container flex justify-center  mt-8 text-center text-lg font-bold text-[#3B3A36] sm:text-base lg:text-2xl   ">
        나만의 레시피를 쉽고 빠르게 공유하세요!
      </div>
      <div className="flex container  justify-center mt-4 cursor-pointer ">
        <div
          onClick={() => goAddRecipePage()}
          className="flex items-center bg-orange-500 h-[45px] lg:h-14 text-white text-lg font-semibold px-6 py-3 rounded-md shadow-md hover:bg-orange-600 transition-all"
        >
          레시피 등록
        </div>
      </div>
      <div className="container flex gap-2 h-[300px] mt-16 lg:gap-4 lg:h-[600px]">
        <div className="w-1/2 flex justify-end lg:h-full">
          <img className="w-full" src={firstImg} alt="firstImg" />
        </div>
        <div className="flex flex-col gap-2 w-1/2 min-h-0 h-[300px] lg:gap-4 lg:h-full lg:h-auto">
          <div className="flex w-full gap-2 min-w-0">
            <img
              className="flex-1 object-cover min-w-0"
              src={secondImg}
              alt="secondImg"
            />
            <img
              className="flex-1 object-cover min-w-0"
              src={thirdImg}
              alt="forthImg"
            />
          </div>

          <img
            className="flex-1 object-cover min-h-0"
            src={forthImg}
            alt="thirdImg"
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendedRecipe;
