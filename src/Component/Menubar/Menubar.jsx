import React, { useEffect, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PopularIcon from "./Icon/Icon.jsx";
import Icon from "./Icon/Icon.jsx";
import { useState } from "react";
const Menubar = () => {
  const [menu, setMenu] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const pathMap = {
      "/": "home",
      "/recipe": "recipe",
      "/scrap": "scrap",
      "/mypage": "mypage",
    };
    setMenu(pathMap[location.pathname] || "");
  }, [location.pathname]);

  const goPage = (path, menu) => {
    navigate(path);
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full flex lg:bg-gray-00 justify-around items-center  lg:justify-start lg:border-t-0 
     h-[80px] lg:h-[50px] lg:justify-start lg:items-start lg:static flex w-full container cursor-pointer bg-[#FFFFFF] text-[#3B3A36] gap-8 mt-4 lg:mt-8 border-b border-[#DCDCDC] h-9"
    >
      <div
        onClick={() => goPage("/", "home")}
        className="  flex justify-center items-center   w-1/4 h-[80px] lg:w-[10%] lg:h-[50px] text-xs lg:text-lg 
        "
      >
        <div className="flex flex-col ">
          <div className="pt-2 lg:hidden">
            {menu === "home" ? <Icon.SelectedHomeIcon /> : <Icon.HomeIcon />}
          </div>
          <span
            className={`font-bold mt-2 text-center ${
              menu === "home" ? "text-[#111111]" : "text-[#BFBFBF]"
            }`}
          >
            홈
          </span>
        </div>
      </div>
      <div
        onClick={() => goPage("/recipe", "recipe")}
        className="  flex justify-center items-center  w-1/4  h-[80px] lg:h-[50px] lg:w-[10%] text-xs lg:w-60px lg:text-lg 
        "
      >
        <div className="flex flex-column ">
          <div className=" flex justify-center items-center pt-2 lg:hidden">
            {menu === "recipe" ? (
              <Icon.SelectedRecipeIcon />
            ) : (
              <Icon.PopularIcon />
            )}
          </div>
          <span
            className={`font-bold mt-2 text-center ${
              menu === "recipe" ? " text-[#111111] " : "text-[#BFBFBF] "
            }`}
          >
            레시피
          </span>
        </div>
      </div>
      <div
        onClick={() => goPage("/scrap", "scrap")}
        className="   flex justify-center items-center  w-1/4 h-[80px] lg:h-[50px] text-xs lg:w-[10%] lg:text-lg
        "
      >
        <div className="flex flex-column">
          <div className="flex justify-center items-center pt-2 lg:hidden">
            {menu === "scrap" ? (
              <Icon.SelectedBookmarkIcon />
            ) : (
              <Icon.BookmarkIcon />
            )}
          </div>
          <span
            className={`font-bold mt-2 text-center ${
              menu === "scrap" ? " text-[#111111] " : "text-[#BFBFBF] "
            }`}
          >
            스크랩
          </span>{" "}
        </div>
      </div>
      <div
        onClick={() => goPage("/mypage", "mypage")}
        className=" flex justify-center items-center  w-1/4 h-[80px] lg:h-[50px] text-xs lg:w-[10%] lg:text-lg
        "
      >
        <div className="flex flex-column">
          <div className="flex justify-center items-center pt-2 lg:hidden">
            {menu === "mypage" ? <Icon.SelectedUserIcon /> : <Icon.UserIcon />}
          </div>
          <span
            className={`font-bold mt-2 text-center ${
              menu === "mypage" ? " text-[#111111] " : "text-[#BFBFBF] "
            }`}
          >
            MY
          </span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Menubar;
