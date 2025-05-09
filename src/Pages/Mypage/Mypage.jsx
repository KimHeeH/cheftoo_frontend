import React, { useState, useEffect } from "react";
import { BackIcon } from "../../Component/Icon/Icon";
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
import { NickNameProfileIcon } from "../../Component/Icon/Icon";
const Mypage = () => {
  const [buttonImg, setButtonImg] = useState(buttonImgLarge);
  const location = useLocation();
  const { item } = location.state || {};
  const [isHovered, setIsHovered] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        setIsAuthenticated(status == 200);
      } catch (err) {
        console.error("Authentication Check Error:", err);
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);
  if (isAuthenticated === null) {
    return <div>로딩 중..</div>;
  }
  if (!isAuthenticated) {
    return (
      <div>
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
        <div className="flex flex-col justify-center items-center container">
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

      <div className="container flex flex-col items-center mt-16">
        <h2 className="  text-xl lg:text-2xl font-bold mb-4">마이페이지</h2>
        <div className="w-full">
          <div className="flex container flex-col  w-full">
            <div className="w-full flex justify-center">
              {" "}
              <NickNameProfileIcon />
              <div className=" text-2xl flex items-center  w-1/2 ml-8">
                {" "}
                찹쌀떡님
              </div>
            </div>
            <div className="w-full  justify-center text-2xl">닉네임 변경</div>
            <div className="w-full justify-center text-2xl">등록한 레시피</div>
            <div className="w-full justify-center text-2xl">로그아웃</div>
            <div className="w-full justify-center text-2xl">회원탈퇴</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
