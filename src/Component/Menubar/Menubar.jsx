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
    <div className="fixed bottom-0 left-0 w-full flex bg-white justify-around items-center border-t border-[#DCDCDC] lg:justify-start lg:border-t-0  gap-4 h-[80px] lg:h-[50px] lg:justify-start lg:items-start lg:static flex w-full container cursor-pointer text-[#3B3A36] gap-8 mt-4 lg:mt-8 border-b border-[#DCDCDC] h-9">
      <div
        onClick={() => goPage("/", "home")}
        className="  flex justify-center items-center   w-1/4 h-[80px] lg:w-[10%] lg:h-[50px] text-s lg:text-lg lg:hover:border-b border-[#3B3A36]"
      >
        <div className="flex flex-column ">
          <div className="pt-2 lg:hidden">
            {menu === "home" ? <Icon.SelectedHomeIcon /> : <Icon.HomeIcon />}
          </div>
          <span
            className={`font-bold mt-2 text-center ${
              menu === "home" ? "text-[#FA590F]" : "text-[#BFBFBF]"
            }`}
          >
            홈
          </span>
        </div>
      </div>
      <div
        onClick={() => goPage("/recipe", "recipe")}
        className="  flex justify-center items-center  w-1/4  h-[80px] lg:h-[50px] lg:w-[10%] text-s lg:w-60px lg:text-lg lg:hover:border-b border-[#3B3A36]"
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
              menu === "recipe" ? " text-[#FA590F] " : "text-[#BFBFBF] "
            }`}
          >
            인기
          </span>
        </div>
      </div>
      <div
        onClick={() => goPage("/scrap", "scrap")}
        className="   flex justify-center items-center  w-1/4 h-[80px] lg:h-[50px] text-s lg:w-[10%] lg:text-lg lg:hover:border-b border-[#3B3A36]"
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
              menu === "scrap" ? " text-[#FA590F] " : "text-[#BFBFBF] "
            }`}
          >
            스크랩
          </span>{" "}
        </div>
      </div>
      <div
        onClick={() => goPage("/mypage", "mypage")}
        className=" flex justify-center items-center  w-1/4 h-[80px] lg:h-[50px] text-s lg:w-[10%] lg:text-lg lg:hover:border-b border-[#3B3A36]"
      >
        <div className="flex flex-column">
          <div className="flex justify-center items-center pt-2 lg:hidden">
            {menu === "mypage" ? <Icon.SelectedUserIcon /> : <Icon.UserIcon />}
          </div>
          <span
            className={`font-bold mt-2 text-center ${
              menu === "mypage" ? " text-[#FA590F] " : "text-[#BFBFBF] "
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
