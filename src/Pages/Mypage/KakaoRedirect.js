import { useEffect } from "react";

function KakaoRedirect() {
  useEffect(() => {
    console.log("🔄 useEffect 실행됨!");

    // 현재 URL에서 `code` 값 추출
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    console.log("🔑 authorizationCode:", authorizationCode); // ✅ 받은 code 값 확인

    if (authorizationCode) {
      console.log("✅ 백엔드에서 자동으로 처리 중...");
    } else {
      console.error("❌ Authorization code not found.");
    }
  }, []);

  return <div>로그인 중...</div>;
}

export default KakaoRedirect;
