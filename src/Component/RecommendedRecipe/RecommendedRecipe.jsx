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
    <div className="mt-8 relative overflow-x-hidden overflow-y-auto min-h-screen lg:mt-16 lg:mb-24 ">
      <div className=" container flex justify-center  mt-8 text-center text-lg font-bold text-[#3B3A36] sm:text-base lg:text-2xl   ">
        맛있는 음식 <br></br>당신만의 특별한 레시피를 공유해보세요!
      </div>
      <div className="flex container  justify-center mt-4 cursor-pointer ">
        <div
          onClick={() => goAddRecipePage()}
          className="flex fixed-bottom-16 lg:static  justify-center items-center cursor-pointer w-1/2 h-[40px] bg-[#FAFAFA] text-[#3B3A36] border-2 border-[#DADADA] rounded-[10px] hover:text-[#3B3A36] lg:w-64 lg:h-12 lg:text-xl"
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
