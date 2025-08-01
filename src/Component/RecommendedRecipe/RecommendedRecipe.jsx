import React from "react";
import { useState } from "react";
import "./RecommendedRecipe.style.css";
import { useNavigate } from "react-router-dom";
import RecipeSlider from "../Slider/RecipeSlider";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import { useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import { DotEmpty, DotFilled } from "../Slider/Icon/Icon";
import firstImg from "./img/firstImg.png";
const RecommendedRecipe = () => {
  const kakaoLoginHandler = useKakaoLogin("/recipe", "/add");
  const [popularRecipeList, setPopularRecipeList] = useState([]);
  const [youtubeList, setYoutubeList] = useState([]);
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);
  const handleRecipeDetail = (recipe_id) => {
    navigate(`/recipes/${recipe_id}`);
  };
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
      // console.log(response.data);
    } catch (error) {
      console.error("인기 레시피 불러오기 오류");
    }
  };
  useEffect(() => {
    fetchPopularRecipe();
  }, []);

  useEffect(() => {
    const fetchYoutubeVideo = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/youtube/home-videos"
      );
      setYoutubeList(response.data);
      console.log(response.data);
    };
    fetchYoutubeVideo();
  });
  return (
    <div className=" flex flex-col w-full mt-8 lg:px-28 relative lg:bg-[#f9fafb] px-6 lg:mt-0 lg:mb-24 ">
      <div className="flex w-full mt-8 lg:h-[680px]">
        {" "}
        <div className="flex flex-col lg:h-2/3 justify-center w-1/3 lg:pl-0  mt-12 mb-6 lg:mb-0 pt-4">
          <span className="font-pretendard text-3xl mb-8 font-bold text-brandDark">
            오늘은 어떤 요리를?
          </span>
          <h2 className="text-lg font-pretendard lg:text-[45px] font-semibold text-[darkText]">
            {" "}
            <span className="font-pretendard text-darkText">
              인기 만점
            </span>{" "}
            레시피
          </h2>
          <p className="font-pretendard mt-3 text-subText text-base lg:text-xl font-semibold">
            지금 가장 인기있는 레시피들을 만나보세요!
          </p>
          <button className="mt-4 bg-brand rounded-3xl text-white text-xl h-16 w-80 hover:scale-105 duration-300 font-bold">
            레시피 더보기
          </button>
        </div>
        <div className="w-2/3 h-full">
          <div className="relative ">
            {popularRecipeList.length > 0 ? (
              <Swiper
                slidesPerView={1.3}
                grabCursor={true}
                spaceBetween={20}
                modules={[Autoplay]}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                loop={false}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    slidesPerView: 1.1,
                  },
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                    slidesPerView: 1.2,
                  },
                  1024: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    slidesPerView: 1.3,
                  },
                }}
              >
                {popularRecipeList.map((recipe, index) => (
                  <SwiperSlide key={recipe.recipe_id}>
                    <div className="flex flex-col">
                      {" "}
                      <div
                        onClick={() => handleRecipeDetail(recipe.recipe_id)}
                        className="p-2 h-[250px] lg:h-[600px] rounded-3xl"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <img
                          src={recipe?.img_path || firstImg} // img_path가 없을 경우 기본 이미지
                          alt={`slide-${index}`}
                          className={`lg:w-full lg:h-full object-cover rounded-3xl transition-all duration-300 ${
                            hoveredIndex === index
                              ? "scale-105 hover:rounded-[2.5rem] "
                              : "rounded-3xl"
                          }`}
                        />
                      </div>
                      <div className="flex flex-col">
                        {" "}
                        <div className=" p-2z-10">
                          <span className="text-darkText text-lg lg:text-3xl font-bold ">
                            {recipe.recipe_title}
                          </span>
                        </div>
                        <div className=" p-2 z-10">
                          <span className="text-subText text-lg lg:text-2xl font-bold ">
                            {recipe.recipe_content}
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                {popularRecipeList.length > 1 && (
                  <div className="flex justify-center mt-4 gap-2">
                    {popularRecipeList.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => swiperRef?.slideToLoop(index)}
                        className="focus:outline-none"
                      >
                        {activeIndex === index ? <DotFilled /> : <DotEmpty />}
                      </button>
                    ))}
                  </div>
                )}
              </Swiper>
            ) : (
              <div className="font-pretendard text-center text-gray-400">
                인기 레시피가 없습니다
              </div>
            )}
          </div>{" "}
        </div>
      </div>

      <div className=" lg:mt-8">
        <h2 className="text-lg lg:text-3xl font-pretendard font-semibold text-darkText">
          <span className="text-brand mr-1 font-pretendard">핫이슈</span> 레시피
        </h2>
        <p className="text-[subText] font-pretendard mt-2 text-base lg:text-xl">
          요즘 유튜브에서 핫한 요리 영상들을 모았어요!
        </p>
      </div>

      <div className=" flex gap-10 overflow-x-auto no-scrollbar py-4">
        {/* {youtubeList.map((video) => (
          <div
            key={video?.id?.videoId}
            className="min-w-[100px] lg:min-w-[500px] h-[160px] lg:h-[300px]"
          >
            <YouTube
              videoId={video?.id?.videoId}
              opts={{ width: "100%", height: "160" }}
            />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default RecommendedRecipe;
