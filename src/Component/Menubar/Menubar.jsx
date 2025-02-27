import React from "react";
import { useNavigate } from "react-router-dom";
const Menubar = () => {
  const navigate = useNavigate();
  const goPage = (path) => {
    navigate(path);
  };
  return (
    <div className="fixed bottom-0 left-0 lg:static flex w-full container cursor-pointer text-[#3B3A36] gap-8 mt-4 lg:mt-8 border-b border-[#DCDCDC] h-9">
      <div
        onClick={() => goPage("/")}
        className=" text-s lg:text-lg hover:border-b border-[#3B3A36]"
      >
        추천
      </div>
      <div
        onClick={() => goPage("/recipe")}
        className="  text-s lg:text-lg hover:border-b border-[#3B3A36]"
      >
        인기레시피
      </div>
      <div
        onClick={() => goPage("/scrap")}
        className="  text-s lg:text-lg hover:border-b border-[#3B3A36]"
      >
        스크랩
      </div>
      <div
        onClick={() => goPage("/mypage")}
        className="  text-s lg:text-lg hover:border-b border-[#3B3A36]"
      >
        나의 정보
      </div>
    </div>
  );
};

export default Menubar;
