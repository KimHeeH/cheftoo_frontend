// Menubar.jsx
import React, { useLayoutEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "./Icon/Icon.jsx";

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

  const goPage = (path, key) => {
    navigate(path);
  };

  const items = [
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
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#DCDCDC] z-50 flex lg:hidden">
      <div className="flex justify-around items-center w-full h-[80px]">
        {items.map(({ label, path, key, Icon, SelectedIcon }) => (
          <div
            key={key}
            onClick={() => goPage(path, key)}
            className="flex flex-col items-center justify-center text-xs cursor-pointer"
          >
            {menu === key ? <SelectedIcon /> : <Icon />}
            <span
              className={`mt-1 ${
                menu === key ? "text-brand font-bold" : "text-gray-400"
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
