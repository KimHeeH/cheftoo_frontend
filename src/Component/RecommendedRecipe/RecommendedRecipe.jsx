import React from "react";
import { useState } from "react";
import "./RecommendedRecipe.style.css";
import firstImg from "./img/firstImg.png";
import secondImg from "./img/image.png";
import thirdImg from "./img/image-1.png";
import forthImg from "./img/image-2.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import cookbook from "./img/cookbook.png";
import RecipeSlider from "../Slider/RecipeSlider";
import { Pencil } from "lucide-react";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import backgroundImg from "./img/bgImg1.png";
import InputContainer from "../SearchContainer/InputContainer";
import { useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";

const RecommendedRecipe = () => {
  const kakaoLoginHandler = useKakaoLogin("/recipe", "/add");
  const [popularRecipeList, setPopularRecipeList] = useState([]);
  const [youtubeList, setYoutubeList] = useState([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchYoutubeVideo = async () => {
  //     const apiKey = `${process.env.REACT_APP_YOUTUBE_API_KEY}`;
  //     const query = "백종원 레시피";
  //     const maxResults = 5;

  //     const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=간단 요리 레시피&type=video&videoDuration=medium&order=viewCount&maxResults=5&key=${apiKey}`;

  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setYoutubeList(data?.items ?? []);
  //     console.log("유투브 리스트", youtubeList);
  //   };
  //   fetchYoutubeVideo();
  // }, []);

  // const handleClick = async () => {
  //   try {
  //     const status = await checkAuthGuard();
  //     if (status === 200) {
  //       navigate("/add");
  //     } else {
  //       alert("로그인이 필요합니다.");
  //       kakaoLoginHandler();
  //     }
  //   } catch (error) {
  //     console.error("인증 오류:", error);
  //     alert("로그인이 필요합니다.");
  //     kakaoLoginHandler();
  //   }
  // };
  const fetchPopularRecipe = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/recipe/popular-top10`
      );
      setPopularRecipeList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("인기 레시피 불러오기 오류");
    }
  };
  useEffect(() => {
    fetchPopularRecipe();
  }, []);

  return (
    <div className="relative p-3 lg:overflow-x-hidden overflow-y-auto lg:mt-0 lg:mb-24 ">
      <div className="container lg:mt-8">
        {" "}
        <h2 className="text-lg lg:text-2xl font-semibold text-[#3B3A36] ">
          <span className="text-orange-500 mr-1">핫이슈</span> 레시피
        </h2>
        <p className="text-gray-500 mt-2 text-base lg:text-lg">
          요즘 유튜브에서 핫한 요리 영상들을 모았어요!
        </p>
      </div>

      <div className="container flex gap-10 overflow-x-auto no-scrollbar py-4">
        {youtubeList.map((video) => (
          <div
            key={video?.id?.videoId}
            className="min-w-[100px] lg:min-w-[500px] h-[160px] lg:h-[300px]"
          >
            <YouTube
              videoId={video?.id?.videoId}
              opts={{ width: "100%", height: "160" }}
            />
          </div>
        ))}
      </div>
      <div className="pl-6 lg:pl-0 container mt-12 mb-6lg:mb-0 border-t pt-4">
        <h2 className="text-lg lg:text-2xl font-semibold text-[#3B3A36]">
          {" "}
          인기 레시피
        </h2>
        <p className="text-gray-500  text-base lg:text-lg">
          지금 가장 인기있는 레시피들을 만나보세요!
        </p>
      </div>
      <div className="w-full">
        <RecipeSlider popularRecipeList={popularRecipeList} />
      </div>
    </div>
  );
};

export default RecommendedRecipe;
