import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const useNickname = () => {
  const [prevNickname, setPrevNickname] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/auth/nickname",
          {
            withCredentials: true,
          }
        );
        console.log("닉네임 응답 전체:", response);

        setPrevNickname(response.data);
      } catch (error) {
        console.error("닉네임 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNickname();
  }, []);
  return { prevNickname, loading };
};

export default useNickname;
