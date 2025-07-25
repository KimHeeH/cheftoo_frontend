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

const RecipeSlider = ({ popularRecipeList }) => {
  const recipeNameList = [
    "봉골레 파스타",
    "제육볶음 한상",
    "시금치 김밥",
    "피자 컵케이크",
  ];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(popularRecipeList);
  return (
    <div className="relative container ">
      {popularRecipeList.length > 0 ? (
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
          {popularRecipeList.map((recipe, index) => (
            <SwiperSlide key={recipe.recipe_id} style={{ width: "100%" }}>
              <div
                className="p-2 relative w-full h-[250px] lg:h-[500px] overflow-hidden rounded-xl"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={recipe?.img_path || firstImg} // img_path가 없을 경우 기본 이미지
                  alt={`slide-${index}`}
                  className={`w-full h-full object-cover rounded-xl transition-transform duration-300 ${
                    hoveredIndex == index ? "scale-105 brightness-75" : ""
                  }`}
                />
                {hoveredIndex === index && (
                  <div className="absolute bottom-4 left-4 bg-black/20 p-2 rounded-lg z-10">
                    <span className="text-white text-base lg:text-2xl font-bold drop-shadow-lg">
                      {recipe.recipe_title}
                    </span>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center text-gray-400">인기 레시피가 없습니다</div>
      )}
    </div>
  );
};

export default RecipeSlider;
