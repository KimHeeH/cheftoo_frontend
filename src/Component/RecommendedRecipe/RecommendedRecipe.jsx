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
  const renderVideos = (videoIds) => {
    videoIds.forEach((id) => {
      console.log("렌더링할 비디오 ID:", id);
      // 실제 렌더링 작업
    });
  };
  useEffect(() => {
    const loadYoutubeVideos = async () => {
      const cached = localStorage.getItem("youtubeVideos");

      // 캐시가 없으면 → 무조건 API 2개 호출해서 저장
      if (!cached) {
        try {
          const versionRes = await fetch(
            "http://localhost:8080/api/youtube/version"
          );
          const version = await versionRes.text();

          const videosRes = await fetch(
            "http://localhost:8080/api/youtube/home-videos"
          );
          const data = await videosRes.json();

          localStorage.setItem(
            "youtubeVideos",
            JSON.stringify({
              version,
              videoIds: data.video_id_list,
            })
          );
          setYoutubeList(data.video_id_list);
        } catch (error) {
          console.error("유튜브 영상 로드 실패 (초기)", error);
        }
        return;
      }

      // 캐시가 있을 경우 → 버전 비교
      try {
        const { version: cachedVersion, videoIds } = JSON.parse(cached);

        const versionRes = await fetch(
          "http://localhost:8080/api/youtube/version"
        );
        const version = await versionRes.text();

        if (version !== cachedVersion) {
          const videosRes = await fetch(
            "http://localhost:8080/api/youtube/home-videos"
          );
          const data = await videosRes.json();

          localStorage.setItem(
            "youtubeVideos",
            JSON.stringify({
              version,
              videoIds: data.video_id_list,
            })
          );
          setYoutubeList(data.video_id_list);
        } else {
          setYoutubeList(videoIds); // 버전 같으면 캐시 사용
        }
      } catch (error) {
        console.error("유튜브 영상 로드 실패", error);
        const { videoIds } = JSON.parse(cached);
        setYoutubeList(videoIds); // fallback
      }
    };

    loadYoutubeVideos();
  }, []);

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
  const goRecipePage = () => {
    navigate("/recipe");
  };
  useEffect(() => {
    fetchPopularRecipe();
  }, []);

  // useEffect(() => {
  //   const fetchYoutubeVideo = async () => {
  //     const response = await axios.get(
  //       "http://localhost:8080/api/youtube/home-videos"
  //     );
  //     setYoutubeList(response.data);
  //     console.log(response.data);
  //   };
  //   fetchYoutubeVideo();
  // });
  return (
    <div className=" flex flex-col lg:flex-col w-full mt-8 lg:px-28 relative lg:bg-[#f9fafb] px-6 lg:mt-0 lg:mb-24 ">
      <div className="flex lg:gap-3 lg:flex-row flex-col w-full mt-8 h-[550px] lg:h-[680px]">
        {" "}
        <div className="flex flex-col lg:h-2/3 w-full justify-center lg:w-1/3 lg:pl-0  lg:mt-12 lg:mb-6 lg:mb-0 lg:pt-4 pr-4 ">
          <span className="font-pretendard text-xl lg:text-3xl lg:mb-8 font-bold text-brandDark">
            오늘도 수고했어요{" "}
          </span>
          <h2
            className="text-2xl  font-pretendard lg:text-[45px] font-bold mt-2 lg:font-semibold text-[darkText] leading-tight
"
          >
            {" "}
            <span className="lg:text-[40px] font-pretendard text-darkText">
              따뜻한 한 끼, <br />
              인기 레시피로 함께해요{" "}
            </span>{" "}
          </h2>
          <p
            className="hidden lg:block font-pretendard lg:mt-3 text-subText text-base lg:text-xl font-semibold leading-snug
"
          >
            지금 가장 인기있는 레시피들을 만나보세요!
          </p>
          <div className="flex w-full justify-end lg:justify-start mb-2">
            {" "}
            <button
              onClick={() => goRecipePage()}
              className="lg:flex lg:gap-3 justify-center items-center mt-2 lg:mt-4 bg-brand rounded-3xl text-white text-sm lg:text-2xl h-8 lg:h-16 w-20 lg:w-80 hover:scale-105 duration-300 font-bold"
            >
              <span className="hidden lg:block">레시피</span> 더보기
            </button>
          </div>
        </div>
        <div className="lg:w-2/3 h-full">
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
                    centeredSlides: true,
                  },
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                    slidesPerView: 1.2,
                    centeredSlides: false,
                  },
                  1024: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    slidesPerView: 1.3,
                    centeredSlides: false,
                  },
                }}
              >
                {popularRecipeList.map((recipe, index) => (
                  <SwiperSlide
                    className="!h-auto"
                    autoHeight={true}
                    key={recipe.recipe_id}
                  >
                    <div className="flex flex-col gap-4  lg:gap-0 h-full">
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
                          className={`h-full w-full lg:w-full lg:h-full object-cover rounded-3xl transition-all duration-300 ${
                            hoveredIndex === index
                              ? "scale-105 hover:rounded-[2.5rem] "
                              : "rounded-3xl"
                          }`}
                        />
                      </div>
                      <div className="px-4  flex flex-col">
                        {" "}
                        <div className=" lg:p-2 z-10">
                          <span className=" font-pretendard text-darkText text-base lg:text-3xl font-bold ">
                            {recipe.recipe_title}
                          </span>
                        </div>
                        <div className=" lg:p-2 z-10">
                          <span className=" font-pretendard text-subText text-sm  lg:text-2xl font-bold ">
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
              <div className="font-pretendard flex items-center h-full w-full text-center text-gray-400">
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

      <div className="flex gap-10 overflow-x-auto no-scrollbar py-4">
        {youtubeList.map((videoId, index) => (
          <div
            key={index}
            className="min-w-[100px] lg:min-w-[500px] h-[160px] lg:h-[300px]"
          >
            <YouTube
              videoId={videoId}
              opts={{ width: "100%", height: "160" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedRecipe;
