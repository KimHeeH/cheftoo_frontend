import { useEffect } from "react";
import axios from "axios";
import CheckNewUser from "./CheckNewUser";
function KakaoRedirect() {
  console.log("🔄 useEffect 실행됨!"); // ✅ useEffect가 실행되는지 확인

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const authorizationCode = urlParams.get("code");

  //   if (authorizationCode) {
  //     axios
  //       .get(
  //         `http://localhost:8080/oauth/kakao/callback?code=${authorizationCode}`
  //       )
  //       .then((response) => {
  //         console.log("Backend Response:", response.data);
  //         CheckNewUser(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error.response?.data || error.message);
  //       });
  //   } else {
  //     console.error("Authorization code not found.");
  //   }
  // }, []);

  return <div>로그인 중</div>;
}

export default KakaoRedirect;
