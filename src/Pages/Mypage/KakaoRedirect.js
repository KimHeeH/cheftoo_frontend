import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { nicknameState } from "../../recoil/nicknameAtom";
import axiosInstance from "../../api/axiosInstance";
function KakaoRedirect() {
  const setNickname = useSetRecoilState(nicknameState);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");
      const state = urlParams.get("state");

      if (!authorizationCode) {
        console.error("Authorization code not found.");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/oauth/kakao/callback`,
          {
            params: { code: authorizationCode, state: state },
            withCredentials: true,
          }
        );

        const accessToken = response.data.accessToken;
        if (accessToken) {
          // 로컬 스토리지에 액세스토큰 저장
          localStorage.setItem("accessToken", accessToken);

          // 응답받은 redirectURL로 페이지 이동

          try {
            const nicknameRes = await axiosInstance.get("/auth/nickname", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            console.log(nicknameRes.data);
            setNickname(nicknameRes.data); // recoil에 저장
            localStorage.setItem("nickname", nicknameRes.data);
          } catch (e) {
            console.error("닉네임 요청 실패", e);
          }

          const redirectTo = response.data.redirectTo;

          if (!redirectTo) {
            window.location.href = "/";
            return;
          }

          window.location.href = redirectTo;
        }
      } catch (error) {
        console.error("카카오 로그인 중 에러 발생");
      }
    };
    fetchData();
  }, []);

  return <div>로그인 중...</div>;
}

export default KakaoRedirect;
