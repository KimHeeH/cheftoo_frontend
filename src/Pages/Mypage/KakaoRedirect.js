import { useEffect } from "react";
import axios from "axios";

function KakaoRedirect() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");
    if (authorizationCode) {
      // 인가 코드를 백엔드에 전송
      axios
        .post("https://your-backend.com/api/auth/kakao", {
          code: authorizationCode,
        })
        .then((response) => {
          console.log("Backend Response:", response.data);
          // 이후 사용자 정보 저장 또는 리디렉션 처리
        })
        .catch((error) => {
          console.error("Error:", error.response?.data || error.message);
        });
    } else {
      console.error("Authorization code not found.");
    }
  }, []);
  return <div>로그인 중</div>;
}
export default KakaoRedirect;
