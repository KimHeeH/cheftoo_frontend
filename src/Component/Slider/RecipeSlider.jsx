import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useState } from "react";
import firstImg from "../RecommendedRecipe/img/firstImg.png";
import secondImg from "../RecommendedRecipe/img/image.png";
import thirdImg from "../RecommendedRecipe/img/image-1.png";
import forthImg from "../RecommendedRecipe/img/image-2.png";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import Icon, { DotEmpty, DotFilled } from "./Icon/Icon";
const imageList = [firstImg, secondImg, thirdImg, forthImg];
const recipeNameList = [
  "봉골레 파스타",
  "제육볶음 한상",
  "시금치 김밥",
  "피자 컵케이크",
];

const RecipeSlider = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative container">
      <Swiper
        modules={[Autoplay]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        className="lg:my-10 container w-full"
      >
        {imageList.map((src, index) => (
          <SwiperSlide key={index} style={{ width: "100%" }}>
            <div
              className=" p-2 relative w-full h-[250px] lg:h-[500px] overflow-hidden rounded-xl "
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={src}
                alt={`slide-${index}`}
                className={`w-full h-full object-cover rounded-xl transition-transform duration-300 ${
                  hoveredIndex == index ? "scale-105 brightness-75" : ""
                } `}
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center justify-center lg:hidden">
                {imageList.map((_, i) => (
                  <span key={i} className="w-3 h-3">
                    {i === activeIndex ? <DotFilled /> : <DotEmpty />}
                  </span>
                ))}
              </div>

              {hoveredIndex === index && (
                <div className="absolute bottom-4 left-4 bg-black/20 flex items-end  z-10">
                  <span className="text-white text-base  lg:text-2xl font-bold drop-shadow-lg">
                    {recipeNameList[index]}
                  </span>
                </div>
              )}

              <div></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecipeSlider;
