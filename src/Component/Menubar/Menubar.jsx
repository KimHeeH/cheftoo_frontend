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
    <div className="container fixed bottom-0 left-0 w-full bg-white border-t border-[#DCDCDC] lg:static lg:border-t-0 lg:border-b z-50 ">
      <div className="flex justify-around lg:justify-start items-center h-[80px] lg:h-[50px] gap-8 text-[#3B3A36]">
        {/* 메뉴 아이템 공통 구조화 */}
        {[
          {
            label: "홈",
            path: "/",
            key: "home",
            Icon: Icon.HomeIcon,
            SelectedIcon: Icon.SelectedHomeIcon,
          },
          {
            label: "레시피",
            path: "/recipe",
            key: "recipe",
            Icon: Icon.PopularIcon,
            SelectedIcon: Icon.SelectedRecipeIcon,
          },
          {
            label: "스크랩",
            path: "/scrap",
            key: "scrap",
            Icon: Icon.BookmarkIcon,
            SelectedIcon: Icon.SelectedBookmarkIcon,
          },
          {
            label: "MY",
            path: "/mypage",
            key: "mypage",
            Icon: Icon.UserIcon,
            SelectedIcon: Icon.SelectedUserIcon,
          },
        ].map(({ label, path, key, Icon, SelectedIcon }) => (
          <div
            key={key}
            onClick={() => goPage(path, key)}
            className="flex flex-col items-center justify-center w-1/4 lg:w-[10%] cursor-pointer text-xs lg:text-lg"
          >
            {/* 아이콘 (모바일만 표시) */}
            <div className="pt-2 lg:hidden">
              {menu === key ? <SelectedIcon /> : <Icon />}
            </div>
            {/* 텍스트 */}
            <span
              className={`font-bold mt-2 text-center ${
                menu === key ? "text-[#111111]" : "text-[#BFBFBF]"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menubar;
