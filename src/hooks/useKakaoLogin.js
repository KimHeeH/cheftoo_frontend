import { useEffect, useState } from "react";

const useKakaoLogin = (prevPage, nextPage = null) => {
  const [kakaoURL, setKakaoURL] = useState("");

  useEffect(() => {
    const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const state = encodeURIComponent(
      JSON.stringify({ prevPage: prevPage, nextPage: nextPage })
    );
    if (CLIENT_ID && REDIRECT_URI) {
      const url = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${state}`;
      setKakaoURL(url);
    }
  }, [prevPage, nextPage]);

  const kakaoLoginHandler = () => {
    if (kakaoURL) {
      window.location.href = kakaoURL;
    }
  };
  return kakaoLoginHandler;
};

export default useKakaoLogin;
