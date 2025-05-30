import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import firstImg from "../RecommendedRecipe/img/firstImg.png";
import secondImg from "../RecommendedRecipe/img/image.png";
import thirdImg from "../RecommendedRecipe/img/image-1.png";
import forthImg from "../RecommendedRecipe/img/image-2.png";
const imageList = [firstImg, secondImg, thirdImg, forthImg];

const RecipeSlider = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={3}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      className="my-10 container"
    >
      {imageList.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={`slide-${index}`}
            className="rounded-xl object-cover w-full h-[500px] hover:scale-105 transition-transform duration-300"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecipeSlider;
