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

let isRefreshing = false;

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 이거 붙어야 함
  }
  return config;
});

export const setupInterceptors = (resetNickname, navigate) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

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
          navigate?.("/mypage");
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
