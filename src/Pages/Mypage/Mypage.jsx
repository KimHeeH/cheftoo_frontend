import React, { useState, useEffect } from "react";
import buttonImgLarge from "./img/kakao_login_medium_wide.png";
import buttonImgSmall from "./img/kakao_login_medium_wide.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Menubar from "../../Component/Menubar/Menubar";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import Loader from "../../Component/Loader";
import { useRecoilState } from "recoil";
import { nicknameState } from "../../recoil/nicknameAtom";
import axiosInstance from "../../api/axiosInstance";
import MypageProfile from "./img/MypageProfile.png";
import MyRecipeComponent from "../../Component/MyRecope/MyRecipeComponent";
import MyCommentComponent from "../../Component/MyComment/MyCommentComponent";
import MyScrapComponent from "../../Component/MyScrap/MyScrapComponent";
const Mypage = () => {
  const [buttonImg, setButtonImg] = useState(buttonImgLarge);
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [selected, setSelected] = useState("scrap");
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const kakaoLogin = useKakaoLogin("/mypage", "");

  const navigate = useNavigate();

  const openEditMenu = () => {
    setIsEditMenuOpen(true);
  };

  const updateNickname = () => {
    navigate("/updateNickname");
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
  const handleMemberDelete = async () => {
    try {
      const response = await axiosInstance.delete("/member/me");
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("nickname");
      }
    } catch (err) {
      console.error("회원탈퇴 오류", err);
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
      <div className="h-screen font-pretendard">
        <SearchContainer />
        <Menubar />

        {/* 로그인 화면 */}
        <div className="flex flex-col justify-center items-center text-center h-[80vh] px-4">
          {/* 타이틀 */}
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">
            카카오로 로그인 해주세요!
          </h1>

          {/* 설명 문구 */}
          <p className="text-subText text-base lg:text-xl leading-relaxed mb-8">
            카카오 계정으로 로그인하고
            <br className="hidden lg:block" />
            모든 기능을 바로 사용해보세요
          </p>

          {/* 카카오 로그인 버튼 */}
          <div className="cursor-pointer" onClick={kakaoLogin}>
            <img
              className="w-60 lg:w-72 h-12 shadow-md hover:shadow-lg transition-transform hover:scale-105"
              src={buttonImg}
              alt="카카오 로그인"
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="font-pretendard">
      <SearchContainer />
      <Menubar />

      <div className="flex flex-col items-center mt-8 lg:mt-16 px-4 font-pretendard">
        {/* 프로필 영역 */}
        <div className="flex flex-col lg:flex-row items-center gap-6 max-w-[1000px] w-full">
          <img
            src={MypageProfile}
            alt="프로필"
            className="w-24 lg:w-36 rounded-full"
          />
          <div className="flex flex-col gap-2 items-center lg:items-start">
            <div className="flex ">
              {" "}
              <div className="text-xl lg:text-2xl font-semibold text-center lg:text-left">
                {nickname}님{" "}
                <span className="text-base text-gray-500">- 카카오 회원</span>
              </div>
            </div>

            <div className="flex gap-3 mt-1" onClick={() => openEditMenu()}>
              {!isEditMenuOpen && (
                <div className="flex gap-3">
                  {" "}
                  <button className="font-semibold rounded-xl px-4 py-2 border border-gray-300 text-sm text-gray-800 hover:bg-gray-100">
                    회원정보 수정
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLogoutModal(true);
                    }}
                    className="font-semibold rounded-xl px-4 py-2 border border-gray-300 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 메뉴 탭 */}
        {!isEditMenuOpen ? (
          <div className="max-w-[1200px]">
            {" "}
            <div className="min-w-[400px] lg:min-w-[1200px] relative shadow-md flex mt-10 max-w-[1200px] w-full border border-gray-200 rounded-full overflow-hidden text-base lg:text-lg font-semibold">
              {/* 애니메이션용 백그라운드 */}
              <div
                className={`absolute top-0 left-0 w-1/3 h-full bg-brand rounded-full transition-transform duration-300 ease-in-out z-0`}
                style={{
                  transform:
                    selected === "recipe"
                      ? "translateX(100%)"
                      : selected === "comment"
                      ? "translateX(200%)"
                      : "translateX(0%)",
                }}
              />
              {/* 탭 버튼들 */}

              <div
                onClick={() => setSelected("scrap")}
                className={`w-1/3 h-12 lg:h-20 flex items-center justify-center cursor-pointer relative z-10 transition-colors duration-300 ${
                  selected === "scrap" ? "text-white" : "text-gray-700"
                }`}
              >
                나의 스크랩
              </div>
              <div
                onClick={() => setSelected("recipe")}
                className={`w-1/3 h-12 lg:h-20 flex items-center justify-center cursor-pointer relative z-10 transition-colors duration-300 ${
                  selected === "recipe" ? "text-white" : "text-gray-700"
                }`}
              >
                나의 레시피
              </div>
              <div
                onClick={() => setSelected("comment")}
                className={`w-1/3 h-12 lg:h-20 flex items-center justify-center cursor-pointer relative z-10 transition-colors duration-300 ${
                  selected === "comment" ? "text-white" : "text-gray-700"
                }`}
              >
                나의 댓글
              </div>
            </div>
            <div className="w-full mt-6 border-t pt-6 px-3 lg:px-0">
              <div className="mx-auto w-full max-w-[1000px]">
                {selected === "recipe" ? (
                  <MyRecipeComponent />
                ) : selected === "scrap" ? (
                  <MyScrapComponent />
                ) : (
                  <MyCommentComponent />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[900px] mx-auto mt-8 grid gap-4 mb-20">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-900">
                계정 설정
              </h3>
              <button
                onClick={() => setIsEditMenuOpen(false)}
                className="text-sm px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition"
              >
                돌아가기
              </button>
            </div>

            {/* 옵션 카드들 */}
            <button
              onClick={() => updateNickname()}
              className="group flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-4 hover:border-brand hover:bg-brand/5 focus:outline-none focus:ring-2 focus:ring-brand/30 transition"
            >
              <div
                className="flex items-center gap-3"
                onClick={() => updateNickname()}
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200">
                  ✏️
                </span>
                <div className="text-left">
                  <div className="font-semibold">닉네임 변경</div>
                </div>
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition">
                ›
              </span>
            </button>

            <button
              onClick={() => setShowWithdrawModal(true)}
              className="group flex items-center justify-between rounded-2xl border px-4 py-4
                 border-red-300/70 text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-300/70">
                  ⚠️
                </span>
                <div className="text-left">
                  <div className="font-semibold">회원탈퇴</div>
                  <div className="text-sm text-gray-500">
                    모든 데이터가 영구 삭제돼요.
                  </div>
                </div>
              </div>
              <span className="opacity-0 group-hover:opacity-100 transition">
                ›
              </span>
            </button>
          </div>
        )}
      </div>
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[100%] max-w-sm">
            <h3 className="text-lg font-semibold mb-4">
              회원탈퇴 시 관련된 모든 데이터가 삭제됩니다. <br></br>회원탈퇴
              하시겠어요?{" "}
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={async () => {
                  await handleMemberDelete();
                  setShowLogoutModal(false);
                  navigate("/");
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
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
