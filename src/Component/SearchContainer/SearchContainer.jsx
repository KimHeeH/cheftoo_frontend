import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import todaysIcon from "../img/Today’s.svg";
import recipeIcon from "../img/Recipe.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchContainer.style.css";
import { useNavigate } from "react-router-dom";
import searchIcon from "./icon/searchIcon.svg";
import userIcon from "./icon/user.svg";
import { DropDownIcon, DropUpIcon, LoginBtnIcon } from "../Menubar/Icon/Icon";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import { useState } from "react";
import Icon, { CommentProfileIcon, ProfileIcon } from "../Menubar/Icon/Icon";
import InputContainer from "./InputContainer";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../recoil/nicknameAtom";
import { useRecoilState } from "recoil";
import Loader from "../Loader";
const SearchContainer = () => {
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const [isDropdown, setIsDropdown] = useState(false);
  const location = useLocation();
  const includeContainerRoutes = ["/", "/recipe"];
  const hideContainerRoutes = ["/mypage"];
  const shouldHideContainerRoutes = hideContainerRoutes.includes(
    location.pathname
  );
  const shouldIncludeContainerRoutes = includeContainerRoutes.includes(
    location.pathname
  );
  const navigate = useNavigate();

  const handleLoginPage = () => {
    navigate("/mypage");
  };
  const goHomePage = () => {
    navigate("/");
  };
  const dropdownMenu = () => {
    setIsDropdown(!isDropdown);
  };
  const goAddRecipe = () => {
    navigate("/add");
  };
  useEffect(() => {
    // Recoil에 닉네임이 없으면 localStorage에서 복구
    if (!nickname) {
      const storedNickname = localStorage.getItem("nickname");
      if (storedNickname) {
        setNickname(storedNickname);
      }
    }
  }, [nickname, setNickname]);
  return (
    <div className="container w-screen">
      <div className="relative w-full px-4 py-4 lg:py-4 lg:py-2 lg:h-[80px] mt-8 ">
        <div className="hidden lg:flex justify-between items-center w-full h-full">
          {/* 로고 */}
          <div
            onClick={goHomePage}
            className="flex items-center cursor-pointer h-12"
          >
            <img className="w-28 mr-2" src={todaysIcon} alt="Today’s Icon" />
            <img className="w-28" src={recipeIcon} alt="Recipe Icon" />
          </div>

          {/* 로그인 */}
          <div
            onClick={handleLoginPage}
            className="flex items-center cursor-pointer h-12"
          >
            {nickname && isLoggedIn ? (
              <div className="flex gap-2 items-center">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    dropdownMenu();
                  }}
                  className="relative"
                >
                  {/* {isDropdown ? <DropUpIcon /> : <DropDownIcon />}
                  {isDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white border rounded-md shadow-md">
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        내 프로필
                      </div>
                      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        로그아웃
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            ) : (
              !shouldHideContainerRoutes && (
                <div className="border-gray-400 border-2 hover:bg-gray-100 text-black text-sm lg:text-base px-4 py-2 h-10 rounded-2xl font-black">
                  로그인 / 회원가입
                </div>
              )
            )}
          </div>
        </div>

        {/* 모바일용 로고+로그인+input */}
        <div className="flex-col lg:hidden w-full">
          {/*로고 + 로그인 */}

          <div className="flex flex-row w-full justify-between">
            {/* 로고 */}
            <div
              onClick={goHomePage}
              className="flex items-center cursor-pointer h-12"
            >
              <img className="w-20 mr-2" src={todaysIcon} alt="Today’s Icon" />
              <img className="w-20" src={recipeIcon} alt="Recipe Icon" />
            </div>
            {/* 로그인 */}
            <div
              onClick={handleLoginPage}
              className="flex w-38 items-center cursor-pointer h-12  hover:opacity-80"
            >
              {nickname ? (
                <div className="flex gap-2 items-center">
                  <span className="text-base  lg:text-xl font-semibold text-gray-700">
                    {nickname}님
                  </span>
                </div>
              ) : (
                <div
                  className="flex items-center border-gray-100 hover:bg-gray-1
                00 text-white text-sm p-2  h-8 rounded-lg"
                >
                  로그인 / 회원가입
                </div>
              )}
            </div>
          </div>

          {/*input Container */}
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
