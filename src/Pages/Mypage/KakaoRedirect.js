import { useEffect } from "react";
import axios from "axios";

function KakaoRedirect() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    if (authorizationCode) {
      // ✅ GET 요청으로 변경
      axios
        .get(
          `http://localhost:8080/oauth/kakao/callback?code=${authorizationCode}`
        )
        .then((response) => {
          console.log("Backend Response:", response.data);
          // 이후 처리
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
