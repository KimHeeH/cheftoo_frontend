import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import { motion } from "framer-motion";
import { CircleXIcon } from "../Menubar/Icon/Icon";
import axiosInstance from "../../api/axiosInstance";
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

  const railRef = useRef(null);
  const [playingId, setPlayingId] = useState(null);
  const VideoCard = ({ id, isPlaying, onPlay }) => {
    return (
      <div className="group relative w-[260px] lg:w-[500px] h-[160px] lg:h-[300px] flex-shrink-0 snap-start rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
        {!isPlaying ? (
          <button
            type="button"
            onClick={onPlay}
            className="w-full h-full text-left"
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt="youtube thumbnail"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-full bg-white/90 p-3 shadow group-hover:scale-105 transition">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        ) : (
          <div className="w-full h-full">
            <YouTube
              videoId={id}
              className="w-full h-full"
              opts={{
                width: "100%",
                height: "100%",
                playerVars: { autoplay: 1, rel: 0, modestbranding: 1 },
              }}
            />
          </div>
        )}
      </div>
    );
  };

  // 좌우 스크롤
  const scrollRail = (dir = 1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: "smooth" });
  };

  const extractYoutubeIds = (payload) => {
    const text = Array.isArray(payload?.video_id_list)
      ? String(payload.video_id_list[0] ?? "")
      : String(payload ?? "");
    const ids = text.match(/[A-Za-z0-9_-]{11}/g) || [];
    return Array.from(new Set(ids));
  };

  useEffect(() => {
    const loadYoutubeVideos = async () => {
      const cached = localStorage.getItem("youtubeVideos");
      console.log(cached);

      // 캐시 없음 → 버전 + 영상 목록 호출 후 저장
      if (!cached) {
        try {
          const [versionRes, videosRes] = await Promise.all([
            axiosInstance.get("/youtube/version", { responseType: "text" }),
            axiosInstance.get("/youtube/home-videos"),
          ]);

          const version = versionRes.data;

          const ids = extractYoutubeIds(videosRes.data);

          localStorage.setItem(
            "youtubeVideos",
            JSON.stringify({ version, videoIds: ids })
          );
          setYoutubeList(ids);
        } catch (error) {
          console.error("유튜브 영상 로드 실패 (초기)", error);
        }
        return;
      }

      // 캐시 있음 → 버전 비교
      try {
        const { version: cachedVersion, videoIds } = JSON.parse(cached);

        const versionRes = await axiosInstance.get("/youtube/version", {
          responseType: "text",
        });
        const version = versionRes.data;
        console.log(versionRes.data);
        if (version !== cachedVersion) {
          const videosRes = await axiosInstance.get("/youtube/home-videos");
          console.log(
            "videosRes.data?.video_id_list",
            videosRes.data?.video_id_list
          );

          const ids = extractYoutubeIds(videosRes.data);

          localStorage.setItem(
            "youtubeVideos",
            JSON.stringify({ version, videoIds: ids })
          );
          setYoutubeList(ids);
        } else {
          setYoutubeList(Array.isArray(videoIds) ? videoIds : []);
        }
      } catch (error) {
        console.error("유튜브 영상 로드 실패", error);
        try {
          const { videoIds } = JSON.parse(cached);
          setYoutubeList(Array.isArray(videoIds) ? videoIds : []);
        } catch {}
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

  return (
    <div className=" flex flex-col lg:flex-col w-full mt-8 lg:px-28 relative lg:bg-[#f9fafb] px-6 lg:mt-0 lg:mb-24 ">
      <div className="flex lg:gap-3 lg:flex-row flex-col w-full mt-8 h-[500px] lg:h-[680px]">
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
              className="hidden lg:blocklg:flex lg:gap-3 justify-center items-center mt-2 lg:mt-4 bg-brand rounded-3xl text-white text-sm lg:text-2xl h-8 lg:h-16 w-20 lg:w-80 hover:scale-105 duration-300 font-bold"
            >
              <span className="hidden lg:block">레시피</span> 더보기
            </button>
          </div>
        </div>
        <div className="lg:w-2/3 flex items-center justify-center mt-4  lg:mb-0 lg:mt-0">
          <div className="relative w-full">
            {popularRecipeList.length > 0 ? (
              <Swiper
                className="h-[310px] lg:h-[680px]"
                slidesPerView={1.3}
                grabCursor
                spaceBetween={20}
                modules={[Autoplay]}
                loop={false}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    centeredSlides: true,
                  },
                  640: {
                    slidesPerView: 1.2,
                    spaceBetween: 50,
                    centeredSlides: false,
                  },
                  1024: {
                    slidesPerView: 1.3,
                    spaceBetween: 15,
                    centeredSlides: false,
                  },
                }}
              >
                {popularRecipeList.map((recipe, index) => (
                  <SwiperSlide key={recipe.recipe_id} className="h-full">
                    {" "}
                    {/* ✅ slide 높이 고정 */}
                    <div className="flex flex-col gap-4 h-full">
                      <div
                        key={recipe.recipe_id}
                        className="h-[250px] lg:h-[600px]"
                      >
                        <div
                          onClick={() => handleRecipeDetail(recipe.recipe_id)}
                          className="p-2 h-full rounded-3xl w-full"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <img
                            src={recipe?.img_path || firstImg}
                            alt={`slide-${index}`}
                            className={`h-full w-full object-cover rounded-3xl transition-all duration-300 ${
                              hoveredIndex === index
                                ? "scale-105 hover:rounded-[2.5rem]"
                                : "rounded-3xl"
                            }`}
                          />
                        </div>
                      </div>

                      {/* 텍스트 영역 */}
                      <div className="px-4 flex flex-col">
                        <div className="lg:p-2 z-10">
                          <span className="font-pretendard text-darkText text-base lg:text-3xl font-bold">
                            {recipe.recipe_title}
                          </span>
                        </div>
                        <div className="lg:p-2 z-10">
                          <span className="font-pretendard text-subText text-sm lg:text-2xl font-bold">
                            {recipe.recipe_content}
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="font-pretendard flex flex-col gap-3 items-center justify-center h-[600px] w-full text-center text-gray-400">
                <CircleXIcon />
                <div>인기 레시피가 없습니다</div>
              </div>
            )}
          </div>
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

      <div className="relative px-20">
        {/* 좌측/우측 페이드 그라데이션 */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white lg:from-[#f9fafb] to-transparent" />

        {/* 좌/우 버튼 (모바일에서는 숨김) */}
        <button
          type="button"
          aria-label="왼쪽으로 이동"
          onClick={() => scrollRail(-1)}
          className="z-[99] hidden lg:grid place-items-center absolute -left-1 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white shadow ring-1 ring-black/5 hover:scale-105 transition"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="오른쪽으로 이동"
          onClick={() => scrollRail(1)}
          className="z-[99] hidden lg:grid place-items-center absolute -right-1 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white shadow ring-1 ring-black/5 hover:scale-105 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>

        {/* 비디오레일 */}
        <div
          ref={railRef}
          className="flex gap-4 lg:gap-6 overflow-x-auto no-scrollbar py-4 px-1 scroll-smooth snap-x snap-mandatory"
        >
          {youtubeList?.map((videoId) => (
            <VideoCard
              key={videoId}
              id={videoId}
              isPlaying={playingId === videoId}
              onPlay={() => setPlayingId(videoId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedRecipe;
