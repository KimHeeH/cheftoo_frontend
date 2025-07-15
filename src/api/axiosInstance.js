// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 로그인 페이지로 이동

      localStorage.removeItem("nickname");

      window.location.href = "/mypage"; // 로그인 경로에 맞게 수정
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
