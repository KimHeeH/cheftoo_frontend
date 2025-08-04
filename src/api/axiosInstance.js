// axiosInstance.js
import axios from "axios";
import { useNavigate } from "react-router-dom";
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  withCredentials: true,
});

const refreshAccessToken = async (navigate) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const res = await axiosInstance.post("/auth/refresh", null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res.data);
    const newAccessToken = res.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (err) {
    const status = err?.response?.status;
    if (status === 401) {
      console.warn("토큰이 만료되었거나 유효하지 않습니다.");
    } else if (status === 500) {
      console.error("서버 에러 : 토큰 갱신 실패");
    } else {
      console.error("알 수 없는 에러 발생", err);
    }
    if (navigate) {
      alert("로그인을 다시 해주세요");
      navigate("/mypage");
    }
    throw err;
  }
};

let isRefreshing = false;

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setupInterceptors = (resetNickname, navigate) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 403) {
        alert("로그인 후 이용 가능한 서비스입니다.");
        resetNickname?.();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("nickname");
        navigate("/mypage");
      }
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isRefreshing
      ) {
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          isRefreshing = false;
          return axiosInstance(originalRequest);
        } catch (err) {
          isRefreshing = false;
          resetNickname?.();
          localStorage.removeItem("accessToken");
          localStorage.removeItem("nickname");
          if (navigate) {
            // alert("로그인이 만료되었습니다. 다시 로그인 해주세요.");

            navigate("/mypage");
          }
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
