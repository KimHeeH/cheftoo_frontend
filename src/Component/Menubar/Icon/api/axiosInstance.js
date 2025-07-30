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
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res.data);
    const newAccessToken = res.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (err) {
    if (navigate) {
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
