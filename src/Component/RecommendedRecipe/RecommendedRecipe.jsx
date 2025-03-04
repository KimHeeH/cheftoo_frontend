import React from "react";
import "./RecommendedRecipe.style.css";
import firstImg from "./img/firstImg.png";
import secondImg from "./img/secondImg.png";
import thirdImg from "./img/thirdImg.png";
import forthImg from "./img/Forth.png";
const RecommendedRecipe = () => {
  return (
    <div className="mt-8 lg:mt-16 lg:mb-24 overflow-x-hidden overflow-y-auto">
      <div className=" text-lg sm:text-base lg:text-xl font-bold text-[#3B3A36] container mt-8 text-center flex justify-center ">
        당신에게 딱 맞는 <br></br>추천 레시피 둘러보세요
      </div>
      <div className="flex  h-[400px] container gap-4  mt-8 lg:gap-4 lg:h-[600px]">
        <div className="w-1/2 flex justify-end lg:h-full">
          <img src={firstImg} alt="firstImg" />
        </div>
        <div className="w-1/2 lg:h-full">
          <div className="flex w-full gap-4 mb-4 h-[45%]">
            <img className=" object-cover " src={secondImg} alt="secondImg" />
          </div>
          <div className="w-full h-[45%]">
            {" "}
            <img
              className=" lg:h-auto object-cover"
              src={thirdImg}
              alt="thirdImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedRecipe;
