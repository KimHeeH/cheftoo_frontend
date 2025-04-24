import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export async function checkAuthGuard() {
  try {
    const response = await axios.get("http://localhost:8080/auth/check", {
      withCredentials: true,
    });

    if (response.status === 401) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      return response.status;
    } else {
      return response.status;
    }
  } catch (error) {
    console.error("인증 상태 확인", error);
  }
}

export default checkAuthGuard;
