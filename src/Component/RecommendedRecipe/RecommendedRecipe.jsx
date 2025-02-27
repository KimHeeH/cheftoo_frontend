import React from "react";
import "./RecommendedRecipe.style.css";
import firstImg from "./img/firstImg.png";
import secondImg from "./img/secondImg.png";
import thirdImg from "./img/thirdImg.png";
import forthImg from "./img/Forth.png";
const RecommendedRecipe = () => {
  return (
    <div>
      <div className=" text-lg sm:text-base lg:text-xl font-bold text-[#3B3A36] container mt-8 text-center flex justify-center">
        당신에게 딱 맞는 <br></br>추천 레시피 둘러보세요
      </div>
      <div className="flex container gap-4 mt-8 ">
        <div className="w-1/2 flex justify-end">
          <img src={firstImg} />
        </div>
        <div className="w-1/2">
          <div className="flex w-full gap-4 mb-4">
            <img className="" src={secondImg} />
            <img src={thirdImg} />
          </div>
          <div className="w-full">
            {" "}
            <img src={forthImg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedRecipe;
