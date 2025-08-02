import React, { useState, useEffect } from "react";
import todayIcon from "./img/Today.svg";
import recipeIcon from "./img/Recipe.svg";
import buttonImgLarge from "./img/kakao_login_medium_wide.png";
import buttonImgSmall from "./img/kakao_login_medium_wide.png"; // 작은 화면용 이미지
import { useNavigate } from "react-router-dom"; // useNavigate import
import { useLocation } from "react-router-dom";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Menubar from "../../Component/Menubar/Menubar";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import {
  BookmarkIcon,
  CommentIcon,
  NickNameProfileIcon,
  SelectedRecipeIcon,
} from "../../Component/Menubar/Icon/Icon";
import Loader from "../../Component/Loader";
import { useRecoilState } from "recoil";
import { nicknameState } from "../../recoil/nicknameAtom";
import cookImg from "./img/cook-book.png";
import axiosInstance from "../../api/axiosInstance";
import MypageProfile from "./img/MypageProfile.png";
import MyRecipepage from "./MyRecipepage/MyRecipepage";
import MyRecipeComponent from "../../Component/MyRecope/MyRecipeComponent";
import MyCommentComponent from "../../Component/MyComment/MyCommentComponent";
const Mypage = () => {
  const [buttonImg, setButtonImg] = useState(buttonImgLarge);
  const [nickname, setNickname] = useRecoilState(nicknameState);

  const location = useLocation();
  const { item } = location.state || {};
  const [isHovered, setIsHovered] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [selected, setSelected] = useState("scrap");
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const kakaoLogin = useKakaoLogin("/mypage", "");

  const itemCheck = (item) => {
    if (item == "my") {
      setIsHovered("my");
    }
  };

  const navigate = useNavigate();
  const handlePage = () => {
    navigate("/");
  };
  const goUpdateNickname = () => {
    navigate("/updateNickname");
  };
  const goMyRecipe = () => {
    navigate("/myrecipe");
  };
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");

      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("nickname");
      }
    } catch (err) {
      console.error("로그아웃 오류", err);
    }
  };

  useEffect(() => {
    const updateButtonImg = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setButtonImg(buttonImgSmall);
      } else {
        setButtonImg(buttonImgLarge);
      }
    };

    updateButtonImg();

    window.addEventListener("resize", updateButtonImg);

    return () => window.removeEventListener("resize", updateButtonImg);
  }, []);

  useEffect(() => {
    if (!nickname) {
      const storedNickname = localStorage.getItem("nickname");
      if (storedNickname) {
        setNickname(storedNickname);
      }
    }
  }, [nickname, setNickname]);

  if (!isLoggedIn) {
    return (
      <div className="h-screen ">
        <SearchContainer />
        <Menubar />
        {/* 상단 로고 + 일러스트 */}
        <div className="font-pretendard">
          <div className=" container flex flex-col items-center mt-20 lg:mt-16 ">
            <div className="flex gap-2 mb-6">
              <div className="w-[100px] lg:w-[150px]">
                <img className="w-full" src={todayIcon} alt="Today" />
              </div>
              <div className="w-[100px] lg:w-[150px]">
                <img className="w-full" src={recipeIcon} alt="Recipe" />
              </div>
            </div>

            <div className="w-[180px] lg:w-[100px] mb-8">
              <img src={cookImg} alt="요리 일러스트" />
            </div>
          </div>
          {/* 로그인 안내 문구 */}
          <div className="flex-grow flex flex-col justify-center items-center container">
            <div className="mt-4 text-lg text-[#696868] lg:text-2xl lg:mt-8 font-semibold">
              로그인 / 회원가입
            </div>
            <div className=" mt-4 text-center text-[#3B3A36] text-base lg:text-2xl leading-relaxed">
              레시피를 저장하고, 나만의 요리 노트를 만들어보세요.{" "}
            </div>
          </div>
          {/* 카카오 로그인 버튼 */}
          <div className="flex container mt-8 w-full lg:mt-16">
            <div
              className="flex justify-center items-center w-full cursor-pointer"
              onClick={kakaoLogin}
            >
              <img
                className="w-2/3 lg:w-1/5 lg:h-10 shadow-md hover:shadow-lg transition transform hover:scale-105"
                src={buttonImg}
                alt="카카오 로그인"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="font-pretendard">
      <SearchContainer />
      <Menubar />
      <div className="hidden lg:block ">
        {" "}
        {/* <h2 className="text-2xl font-semibold text-center mt-10">
          {nickname}님 , 반가워요!
        </h2>
        <p className="text-gray-500 text-center mt-2">
          회원 정보를 관리하고, 등록한 레시피를 확인해보세요.
        </p> */}
      </div>

      <div className="flex flex-col items-center mt-8 lg:mt-16">
        {/* 프로필 영역 */}
        <div className="flex justify-center gap-4 ">
          {" "}
          <div className="w-full flex  justify-center items-center gap-2  ">
            <img src={MypageProfile} alt="프로필" className="w-24 lg:w-40" />
          </div>
          <div className="flex flex-col justify-center gap-2 ">
            <div className="flex w-[300px] items-center gap-4">
              {" "}
              <div className="text-2xl lg:font-semibold ">
                {nickname}님{" "}
                <span className="lg:text-base text-gray-500">
                  {" "}
                  - 카카오 회원
                </span>
              </div>
            </div>
            <div className=""></div>

            <div className="w-[300px] flex gap-2">
              <button
                className="rounded-xl w-32 border-2 h-8 text-darkText hover:bg-gray-100"
                onClick={() => setShowLogoutModal(true)}
              >
                로그아웃
              </button>
              <button
                className="rounded-xl w-32 border-2  h-8 text-darkText hover:bg-gray-100"
                onClick={goUpdateNickname}
              >
                회원정보 수정
              </button>
            </div>
          </div>
        </div>

        {/* 메뉴 리스트 */}
        <div className="font-Pretendard font-semibold p-4 lg:p-0 w-full flex max-w-[1000px] mx-auto mt-10  h-[130px] text-lg cursor-pointer">
          <div
            onClick={() => setSelected("scrap")}
            className={`gap-3 w-1/2 rounded-r-none rounded-l-[10rem]  border-2 border-gray-200 h-full   flex justify-center items-center ${
              selected === "scrap"
                ? "bg-brand text-white"
                : "bg-white border  text-gray-800"
            }`}
          >
            나의 레시피
          </div>

          <div
            onClick={() => setSelected("comment")}
            className={`gap-3 w-1/2 rounded-l-none rounded-r-[10rem]  border-2 border-gray-200 h-full  hover:bg-brand hover:border-white  hover:text-white flex justify-center items-center ${
              selected === "comment"
                ? "bg-brand text-white"
                : "bg-white border  text-black"
            }`}
          >
            나의 댓글
          </div>
        </div>
        <div className="w-full font-Pretendard border-t max-w-[1000px] mx-auto pt-4">
          {selected === "scrap" ? (
            <MyRecipeComponent />
          ) : (
            <MyCommentComponent />
          )}
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
            <h3 className="text-xl font-semibold mb-4">
              로그아웃 하시겠습니까?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={async () => {
                  await handleLogout();
                  setShowLogoutModal(false);
                  navigate("/");
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mypage;
