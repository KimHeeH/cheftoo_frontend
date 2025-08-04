import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import todaysIcon from "../img/Today’s.svg";
import recipeIcon from "../img/Recipe.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchContainer.style.css";
import { useNavigate } from "react-router-dom";
import searchIcon from "./icon/searchIcon.svg";
import userIcon from "./icon/user.svg";
import { CommentUserIcon, LoginBtnIcon } from "../Menubar/Icon/Icon";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import { useState } from "react";
import Icon, { CommentProfileIcon, ProfileIcon } from "../Menubar/Icon/Icon";
import InputContainer from "./InputContainer";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../recoil/nicknameAtom";
import { useRecoilState } from "recoil";
import Loader from "../Loader";
import { ContainerUserIcon } from "../Menubar/Icon/Icon";
import UserIcon from "./icon/Icon_my_page";
import { DropDownIcon, DropUpIcon } from "../Menubar/Icon/Icon";
import { UpArrowIcon, DownArrowIcon } from "../Menubar/Icon/Icon";
import { MenuIcon } from "../Menubar/Icon/Icon";
import Menubar from "../Menubar/Menubar";

const SearchContainer = () => {
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [isHovered, setIsHovered] = useState(false);
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const [isDropdown, setIsDropdown] = useState(false);
  const location = useLocation();
  // const includeContainerRoutes = ["/", "/recipe"];
  // const hideContainerRoutes = ["/mypage"];
  // const shouldHideContainerRoutes = hideContainerRoutes.includes(
  //   location.pathname
  // );
  // const shouldIncludeContainerRoutes = includeContainerRoutes.includes(
  //   location.pathname
  // );
  const navItems = [
    { label: "홈", path: "/" },
    { label: "레시피", path: "/recipe" },
    { label: "스크랩", path: "/scrap" },
    { label: "MY", path: "/mypage" },
  ];
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
    <div className="lg:mt-8 w-screen border-b-2 border-brand mb-8 lg:mb-0 bg-white">
      <div className="relative px-10 w-full py-4 lg:py-4  lg:h-[80px]  ">
        <div className="hidden lg:flex items-center w-full h-full">
          {/* 로고 */}
          <div
            onClick={goHomePage}
            className="ml-20 mr-40 flex w-[280px] items-center cursor-pointer h-12"
          >
            <img
              className="w-32 min-w-32 max-w-32"
              src={todaysIcon}
              alt="Today’s Icon"
            />
            <img
              className="w-32 min-w-32 max-w-32"
              src={recipeIcon}
              alt="Recipe Icon"
            />
          </div>
          <div className="flex-1">
            {/* PC 상단용 메뉴바 (가운데 정렬) */}
            <div className="hidden lg:block ">
              <div className="flex gap-5 lg:gap-20">
                {navItems.map(({ label, path }) => (
                  <span
                    key={label}
                    onClick={() => navigate(path)}
                    className={`${
                      location.pathname === path
                        ? "text-brand"
                        : "text-subText hover:text-brand"
                    }  cursor-pointer text-xl font-pretendard font-bold whitespace-nowrap`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end w-[300px] ml-20 mr-20">
            {" "}
            <div
              onClick={handleLoginPage}
              className="flex items-center cursor-pointer h-12"
            >
              {nickname ? (
                <div className="flex gap-2 items-center w-20">
                  <CommentUserIcon />{" "}
                </div>
              ) : (
                <div className="min-w-[140px] whitespace-nowrap font-pretendard border-gray-400 border-2 hover:bg-gray-100 text-black text-sm lg:text-base px-4 py-2 h-10 rounded-2xl font-black">
                  로그인 / 회원가입
                </div>
              )}
            </div>
            {isLoggedIn && (
              <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {" "}
                <div
                  onClick={goAddRecipe}
                  className="font-pretendard border-1 border-brand text-brand font-bold cursor-pointer hover:bg-brandDark hover:text-white w-40 rounded-3xl h-12 flex items-center pl-5 text-lg"
                >
                  레시피 등록
                </div>
                <div className="absolute right-3 top-3">
                  {isHovered ? <UpArrowIcon /> : <DownArrowIcon />}
                </div>
              </div>
            )}
          </div>

          {/* 로그인 */}
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
            <div>
              <Menubar />
            </div>
            <div className="flex w-auto lg:w-38 items-center cursor-pointer h-12  hover:opacity-80">
              {nickname ? (
                <div className="flex items-center gap-4">
                  <div onClick={handleLoginPage}>
                    <CommentUserIcon />
                  </div>
                  <div>
                    <MenuIcon />
                  </div>
                </div>
              ) : (
                <div
                  className="flex items-center border-gray-100 hover:bg-gray-1
                00 text-white text-sm p-2  h-8 rounded-lg min-w-[140px] whitespace-nowrap"
                >
                  로그인 / 회원가입
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
