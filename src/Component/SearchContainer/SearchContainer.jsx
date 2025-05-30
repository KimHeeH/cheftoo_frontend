import React, { useEffect } from "react";
import todaysIcon from "../img/Today’s.svg";
import recipeIcon from "../img/Recipe.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchContainer.style.css";
import { useNavigate } from "react-router-dom";
import searchIcon from "./icon/searchIcon.svg";
import userIcon from "./icon/user.svg";
import { LoginBtnIcon } from "../Icon/Icon";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import { useState } from "react";
import useNickname from "../../hooks/useNickname";

const SearchContainer = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { prevNickname } = useNickname();
  const handleLoginPage = () => {
    navigate("/mypage");
  };
  const goHomePage = () => {
    navigate("/");
  };
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const status = await checkAuthGuard();
        setIsAuthenticated(status === 200);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);

  return (
    <div className="container">
      <div
        className="flex text-[#808080] mt-4 mb-8 sm:mb-4 lg:mb-0 cursor-pointer justify-end items-start h- w-100 sm:w-32 lg:w-64 "
        onClick={handleLoginPage}
      >
        {isAuthenticated === null ? null : isAuthenticated ? (
          <div className=" font-gowun hover:text-[#3B3A36] lg:text-lg text-base border-b border-b-[#B4B4B4] ">
            {prevNickname}님
          </div>
        ) : (
          <div className=" flex items-center gap-2 hover:text-[#3A3A3A] hover:font-semibold">
            <LoginBtnIcon className="hidden sm:block md:block" alt="userIcon" />
            <div className=" text-xs sm:text-base">로그인 / 회원가입</div>
          </div>
        )}
      </div>
      <div>
        <div className="container  sm:mt-4 lg:mt-8">
          <div className="">
            <div className="align-items-center">
              <div className="flex gap-20 sm:gap-9 lg:gap-9">
                <div
                  className="flex w-1/4   lg:w-[300px] cursor-pointer"
                  onClick={goHomePage}
                >
                  <img
                    className="lg:w-[120px] mr-2 sm:w-full"
                    src={todaysIcon}
                    alt="Today’s Icon"
                  />
                  <img
                    className=" sm:w-full lg:w-[120px] "
                    src={recipeIcon}
                    alt="Recipe Icon"
                  />
                </div>

                <div className="flex w-full lg:w-2/3 relative h-[50px] items-center pr-0">
                  <input
                    className="font-gowun  border border-[#808080] rounded-full w-full s:w-3/4 lg:w-3/4 h-full pl-4 "
                    placeholder="오늘의 레시피 검색"
                  />

                  <img
                    className="cursor-pointer absolute transform-translate-y-1/2 right-[20px] sm:right-30 lg:right-60  lg:block "
                    width="20"
                    src={searchIcon}
                    alt="searchIcon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
