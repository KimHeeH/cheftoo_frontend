import React from "react";
import "./RecommendedRecipe.style.css";
import firstImg from "./img/firstImg.png";
import secondImg from "./img/image.png";
import thirdImg from "./img/image-1.png";
import forthImg from "./img/image-2.png";
import { useNavigate } from "react-router-dom";
import cookbook from "./img/cookbook.png";
const RecommendedRecipe = () => {
  const navigate = useNavigate();
  const goAddRecipePage = () => {
    navigate("/add");
  };
  return (
    <div className="mt-4 relative overflow-x-hidden overflow-y-auto lg:mt-16 lg:mb-24 ">
      <div className="lg:w-[400px] relative font-gowun line container leading-relaxed flex justify-center  mt-12 lg:text-2xl lg:mt-8     ">
        <span className="mr-2 lg:mr-4">소중한 나의 레시피</span>
        <img src={cookbook} alt="cookbook" className="w-6 lg:w-10" />
      </div>
      <div className="lg:w-[400px] relative font-gowun line container leading-relaxed flex justify-center lg:text-2xl     ">
        <div className="text-center text-lg text-[#3B3A36] lg:text-2xl mt-1">
          함께 나누면 더 맛있어요!
        </div>
      </div>

      <div className="flex container  justify-center  cursor-pointer "></div>
      <div className="container flex gap-2 h-[300px] mt-16 lg:gap-4 lg:h-[480px]">
        <div className="w-1/2 flex justify-end lg:h-full">
          <img className="w-full" src={firstImg} alt="firstImg" />
        </div>
        <div className="flex flex-col gap-2 w-1/2 min-h-0 h-[300px] lg:gap-4 lg:h-full lg:h-[480px]">
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
