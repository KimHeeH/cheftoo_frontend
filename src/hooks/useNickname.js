import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const useNickname = () => {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/member", {
          withCredentials: true,
        });
        setNickname(response.data);
      } catch (error) {
        console.error("닉네임 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNickname();
  }, []);
  return { nickname, loading };
};

export default useNickname;
