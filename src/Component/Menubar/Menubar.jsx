import React from "react";
import { useNavigate } from "react-router-dom";
import PopularIcon from "./Icon/Icon.jsx";
import Icon from "./Icon/Icon.jsx";
const Menubar = () => {
  const navigate = useNavigate();
  const goPage = (path) => {
    navigate(path);
  };
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center items-center border-t border-[#DCDCDC] lg:border-t-0  gap-8 h-[80px] lg:h-[50px] lg:justify-start lg:items-start lg:static flex w-full container cursor-pointer text-[#3B3A36] gap-8 mt-4 lg:mt-8 border-b border-[#DCDCDC] h-9">
      <div
        onClick={() => goPage("/")}
        className="  flex justify-center items-center h-[80px] lg:h-[50px] text-s lg:text-lg hover:border-b border-[#3B3A36]"
      >
        <div className="flex justify-center items-center flex-column">
          <div className=" flex-col justify-center items-center">
            <div className=" lg:hidden">
              <Icon.HomeIcon />
            </div>
            <div className="  text-[#C5C5C5] text-center lg:text-[#3B3A36]">
              홈
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => goPage("/recipe")}
        className="  flex justify-center items-center h-[80px] lg:h-[50px]  text-s lg:text-lg hover:border-b border-[#3B3A36]"
      >
        <div className="flex flex-column">
          <div className=" flex justify-center items-center lg:hidden">
            <Icon.PopularIcon />
          </div>
          <div>인기 레시피</div>
        </div>
      </div>
      <div
        onClick={() => goPage("/scrap")}
        className="   flex justify-center items-center h-[80px] lg:h-[50px] text-s lg:text-lg hover:border-b border-[#3B3A36]"
      >
        스크랩
      </div>
      <div
        onClick={() => goPage("/mypage")}
        className=" flex justify-center items-center h-[80px] lg:h-[50px] text-s lg:text-lg hover:border-b border-[#3B3A36]"
      >
        나의 정보
      </div>
    </div>
  );
};

export default Menubar;
