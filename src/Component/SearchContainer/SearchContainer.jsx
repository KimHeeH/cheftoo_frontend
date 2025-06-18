import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import todaysIcon from "../img/Today’s.svg";
import recipeIcon from "../img/Recipe.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchContainer.style.css";
import { useNavigate } from "react-router-dom";
import searchIcon from "./icon/searchIcon.svg";
import userIcon from "./icon/user.svg";
import { LoginBtnIcon } from "../Menubar/Icon/Icon";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import { useState } from "react";
import useNickname from "../../hooks/useNickname";
import Icon, { CommentProfileIcon, ProfileIcon } from "../Menubar/Icon/Icon";
import InputContainer from "./InputContainer";
// import { useSelector } from "react-redux";
const SearchContainer = () => {
  const location = useLocation();
  const includeContainerRoutes = ["/"];
  const hideContainerRoutes = ["/mypage"];
  const shouldHideContainerRoutes = hideContainerRoutes.includes(
    location.pathname
  );
  const shouldIncludeContainerRoutes = includeContainerRoutes.includes(
    location.pathname
  );
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { prevNickname } = useNickname();
  // const nickname = useSelector((state) => state.user.nickname);
  // console.log(nickname);
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
            {isAuthenticated ? (
              <div className="flex gap-2 items-center">
                <ProfileIcon />
                <span className="text-base lg:text-xl font-gowun">
                  {prevNickname}님
                </span>
              </div>
            ) : (
              !shouldHideContainerRoutes && (
                <div className="bg-orange-500 hover:bg-orange-600 text-white text-sm lg:text-base px-4 py-2 h-10 rounded-lg font-black">
                  로그인 / 회원가입
                </div>
              )
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          {/* PC 전용 input (정중앙) */}
          {shouldIncludeContainerRoutes && <InputContainer />}
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
              className="flex w-38 items-center cursor-pointer h-12"
            >
              {isAuthenticated ? (
                <div className="flex gap-2 items-center">
                  <ProfileIcon />
                  <span className="text-base  lg:text-xl font-gowun">
                    {prevNickname}님
                  </span>
                </div>
              ) : (
                <div className="flex items-center bg-orange-500 hover:bg-orange-600 text-white text-sm p-2  h-8 rounded-lg">
                  로그인 / 회원가입
                </div>
              )}
            </div>
          </div>

          {/*input Container */}

          {shouldIncludeContainerRoutes && (
            <div className="mt-3">
              <InputContainer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
