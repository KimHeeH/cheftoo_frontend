import { useEffect } from "react";
import axios from "axios";
function KakaoRedirect() {
  useEffect(() => {
    console.log("🔄 useEffect 실행됨!");

    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");
      const state = urlParams.get("state");

      console.log("🔑 authorizationCode:", authorizationCode); // ✅ 받은 code 값 확인

      if (authorizationCode) {
        const response = await axios.get(
          "http://localhost:8080/oauth/kakao/callback",
          { params: { code: authorizationCode, state: state } }
        );
        console.log(" 백엔드에서 자동으로 처리 중...");
      } else {
        console.error("Authorization code not found.");
      }
    };
    fetchData();
  }, []);

  return <div>로그인 중...</div>;
}

export default KakaoRedirect;
