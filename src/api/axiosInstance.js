// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const res = await axiosInstance.post("/auth/refresh", null, {
      withCredentials: true,
    });
    console.log(res.data);
    const newAccessToken = res.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (err) {
    throw err;
  }
};

export const setupInterceptors = (resetNickname, navigate) => {
  // 요청 인터셉터
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status >= 400 &&
        error.response.status <= 405 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          resetNickname?.();
          localStorage.removeItem("accessToken");
          localStorage.removeItem("nickname");
          alert("다시 로그인해주세요");
          navigate?.("/mypage");
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
