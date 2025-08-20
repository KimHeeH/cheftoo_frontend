// src/Pages/Mypage/KakaoRedirect.js
import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { nicknameState } from "../../recoil/nicknameAtom";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Loader from "../../Component/Loader";

function KakaoRedirect() {
  const setNickname = useSetRecoilState(nicknameState);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state") || "";
      if (!code) return;

      try {
        // 백엔드 콜백 호출
        const res = await axios.get(
          process.env.REACT_APP_KAKAO_REDIRECT_URL_BACK,
          { params: { code, state }, withCredentials: true }
        );

        const data = res.data;
        console.log(data);
        // --- 신규 유저: "/terms"
        if (typeof data === "string") {
          const to = data.startsWith("/") ? data : `/${data}`;
          navigate(to, { replace: true });
          return;
        }

        // --- 기존 유저: JSON 응답 ---
        const accessToken = data && data.accessToken;
        const redirectTo = data && data.redirectTo;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }

        // 닉네임 로드
        try {
          const nickRes = await axiosInstance.get("/member/nickname", {
            headers: accessToken
              ? { Authorization: `Bearer ${accessToken}` }
              : {},
          });
          if (nickRes?.data) {
            setNickname(nickRes.data);
            localStorage.setItem("nickname", nickRes.data);
          }
        } catch (e) {
          console.warn("닉네임 요청 실패", e);
        }

        const to =
          typeof redirectTo === "string" && redirectTo.length > 0
            ? redirectTo.startsWith("/")
              ? redirectTo
              : `/${redirectTo}`
            : "/";

        navigate(to, { replace: true });
      } catch (e) {
        console.error("카카오 로그인 에러", e);
        navigate("/", { replace: true });
      }
    })();
  }, [navigate, setNickname]);

  return <Loader />;
}

export default KakaoRedirect;
