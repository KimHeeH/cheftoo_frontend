import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const useAuthGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch("http://localhost:8080/auth/check", {
          method: "GET",
          credentials: "include",
        });
        if (response.status === 401) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          navigate("oauth/kakao/login");
        }
      } catch (error) {
        console.error("인증 상태 확인", error);
        navigate("oauth/kakao/login");
      }
    }
  }, [navigate]);
};

export default useAuthGuard;
