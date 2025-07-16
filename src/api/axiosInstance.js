// axiosInstance.js
import axios from "axios";
import { useResetRecoilState } from "recoil";
import { nicknameState } from "../recoil/nicknameAtom";
import { useNavigate } from "react-router-dom";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const setupInterceptors = (resetNickname, navigate) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status >= 400 && error.response.status <= 403) {
        resetNickname(); // 닉네임 리셋
        localStorage.removeItem("accessToken"); // accessToken 삭제
        localStorage.removeItem("nickname"); // nickname 삭제
        alert("다시 로그인해주세요");
        navigate("/mypage"); // 로그인 페이지로
      }
      return Promise.reject(error);
    }
  );
};
export default axiosInstance;
