import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
export async function checkAuthGuard() {
  try {
    const response = await axiosInstance.get("/auth/check");
  } catch (error) {
    console.error("인증 상태 확인", error);
  }
}

export default checkAuthGuard;
