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
import { NickNameProfileIcon } from "../../Component/Menubar/Icon/Icon";
import Loader from "../../Component/Loader";
import useNickname from "../../hooks/useNickname";

const Mypage = () => {
  const [buttonImg, setButtonImg] = useState(buttonImgLarge);
  const location = useLocation();
  const { item } = location.state || {};
  const [isHovered, setIsHovered] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { prevNickname } = useNickname();

  const kakaoLogin = useKakaoLogin("/mypage", "");

  console.log("MY Page", { item });
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
  useEffect(() => {
    const updateButtonImg = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setButtonImg(buttonImgSmall);
      } else {
        setButtonImg(buttonImgLarge);
      }
    };

    // 처음에 이미지 설정
    updateButtonImg();

    // 화면 크기가 변경될 때마다 이미지 업데이트
    window.addEventListener("resize", updateButtonImg);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => window.removeEventListener("resize", updateButtonImg);
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const status = await checkAuthGuard();
        setIsAuthenticated(status === 200);
      } catch (err) {
        // console.error("Authentication Check Error:", err);
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);
  if (isAuthenticated === null) {
    return <Loader />;
  }
  if (!isAuthenticated) {
    return (
      <div className="h-screen">
        <SearchContainer />
        <Menubar />
        <div className="container flex flex-col items-center mt-44 lg:mt-16">
          <div className="flex gap-2">
            <div className="w-[100px] lg:w-[150px]">
              <img className="w-full" src={todayIcon} alt="Today" />
            </div>
            <div className="w-[100px] lg:w-[150px]">
              <img className="w-full" src={recipeIcon} alt="Recipe" />
            </div>
          </div>
        </div>

        {/* 로그인 입력 필드 */}
        <div className="flex-grow flex flex-col justify-center items-center  container">
          <div className="mt-4 text-lg text-[#696868] lg:text-2xl lg:mt-8">
            로그인/회원가입
          </div>
          <div className="mt-8 text-center text-[#3B3A36] text-lg lg:text-2xl ">
            간편하게 로그인하고 <br />
            다양한 서비스를 이용해보세요.
          </div>
        </div>
        <div className="flex container mt-8 w-full lg:mt-16">
          {/* 카카오 버튼 */}
          <div
            className=" flex  justify-center items-center  w-full cursor-pointer"
            onClick={kakaoLogin}
          >
            <img
              className="w-2/3 lg:w-1/5 lg:h-10"
              src={buttonImg}
              alt="카카오버튼"
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <SearchContainer />
      <Menubar />
      <div className="hidden lg:block">
        {" "}
        <h2 className="text-2xl font-semibold text-center mt-10">
          {prevNickname}님👋 , 반가워요!
        </h2>
        <p className="text-gray-500 text-center mt-2">
          회원 정보를 관리하고, 등록한 레시피를 확인해보세요.
        </p>
      </div>

      <div className="flex flex-col items-center mt-8 lg:mt-16">
        {/* 프로필 영역 */}
        <div className="w-full flex flex-col justify-center items-center gap-2  ">
          <NickNameProfileIcon className="w-[20px] h-[20px] lg:w-[80px] lg:h-[80px]" />

          <div className="text-2xl lg:font-semibold font-gowun">
            {prevNickname}님
          </div>
          <div className="text-md text-gray-500">카카오 회원</div>
        </div>

        {/* 메뉴 리스트 */}
        <div className="p-4 lg:p-0 w-full max-w-[400px] mx-auto mt-10 space-y-4">
          <div
            className="px-5 py-4 bg-white rounded-lg border border-gray-200 text-lg lg:text-xl  cursor-pointer transition 
             hover:ring-2 hover:ring-orange-400 hover:border-transparent"
            onClick={goUpdateNickname}
          >
            닉네임 변경
          </div>

          <div
            className="px-5 py-4 bg-white rounded-lg border border-gray-200 text-lg lg:text-xl  cursor-pointer transition 
             hover:ring-2 hover:ring-orange-400 hover:border-transparent"
            onClick={goMyRecipe}
          >
            등록한 레시피
          </div>
          <div
            className="px-5 py-4 bg-white rounded-lg border border-gray-200 text-lg lg:text-xl  cursor-pointer hover:ring-2 hover:ring-orange-400 hover:border-transparent
"
            onClick={() => console.log("로그아웃")}
          >
            로그아웃
          </div>
          <div
            className="mb-5 px-5 py-4 bg-white rounded-lg  border border-gray-200 text-lg lg:text-xl  cursor-pointer text-red-500 hover:ring-2 hover:ring-red-400 hover:border-transparent
"
            onClick={() => console.log("회원탈퇴")}
          >
            회원탈퇴
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
