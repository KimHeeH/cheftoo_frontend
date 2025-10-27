import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
const accessToken = localStorage.getItem("accessToken");
const MeContext = createContext(null);
export function MeProvider({ children }) {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  //로그인한 멤버 id 조회
  const refetch = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/member/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMe(res.data);
    } catch (e) {
      setMe(null); // 401 등
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);
  return (
    <MeContext.Provider value={{ me, loading, refetch }}>
      {children}
    </MeContext.Provider>
  );
}
export function useMe() {
  const ctx = useContext(MeContext);
  if (!ctx) throw new Error("useMe must be used within MeProvider");
  return ctx;
}
