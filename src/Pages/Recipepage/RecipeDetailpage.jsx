import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackIcon } from "../../Component/Icon/Icon";
import img from "./img/pasta.jpg";
import {
  BigBookmarkIcon,
  SelectedBigBookmarkIcon,
} from "../../Component/Menubar/Icon/Icon";
const RecipeDetailpage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [bookmark, setBookmark] = useState(false);
  const navigate = useNavigate();
  console.log("recipeId:", recipeId); // null이면 문제가 있음
  console.log("recipeId Type:", typeof recipeId);
  console.log("이미지 경로:", recipe?.images?.img_path);
  const handleBackNavigate = () => {
    navigate("/recipe");
  };
  const handleActiveBookmark = () => {
    setBookmark(!bookmark);
    console.log("bookmark상태 값", bookmark);
  };
  useEffect(() => {
    if (!recipeId) return;

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/recipes/${recipeId}`,
          { withCredentials: true }
        );
        console.log(response.data);
        setRecipe(response.data);
      } catch (error) {
        console.error("레시피 가져오기 실패", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="w-full p-3 ">
      <div className="container mt-4 mb-4 ml-2    ">
        {/* ← 뒤로가기 아이콘 */}
        <div className="cursor-pointer mt-2" onClick={handleBackNavigate}>
          <BackIcon />
        </div>
      </div>
      <div className="w-full container flex justify-center max-w-[900px] px-4">
        {/* 실제 콘텐츠 */}
        <div>
          <div className="relative mb-6">
            {" "}
            {/* 제목+내용+아이콘 감싸는 박스 */}
            {/* 제목 */}
            <div
              className="w-5/6 
            font-gowun text-xl lg:text-2xl border-b border-[#DCDCDC] pb-2"
            >
              {recipe.recipe_title}
            </div>
            {/* 내용 */}
            <div className="font-gowun mt-4 text-base lg:text-lg w-4/5">
              <p>{recipe.recipe_content}</p>
            </div>
            {/* 북마크 아이콘 */}
            <div
              className={`absolute  right-[-15px]  top-1/3 lg:right-0 lg:top-1/2 -translate-y-1/2 w-12 h-16 lg:w-16 lg:h-19 border rounded-lg flex justify-center items-center cursor-pointer
              transition-transform duration-150 active: active:scale-90 hover:shadow-md
                            ${
                              bookmark
                                ? "bg-[#FDFDFD]"
                                : "bg-white border-gray-300"
                            }`}
              onClick={handleActiveBookmark}
            >
              {bookmark ? <SelectedBigBookmarkIcon /> : <BigBookmarkIcon />}
            </div>
          </div>

          <div className="mt-3 h-[300px] lg:h-[500px] border-1">
            <img
              src={img}
              // src={recipe.images?.img_path
              //   ?.replace("C:/main_images", "http://localhost:8080/images")
              //   .replaceAll("\\", "/")}
              alt="대표 이미지"
              className="w-full  h-[300px] lg:h-[500px] max-h-[500px] object-cover rounded-xl border"
            />
          </div>

          {/* 재료 */}
          <div className="mt-12">
            <div className="font-gowun text-xl lg:text-2xl">재료</div>
            <div className="font-gowun mt-4 border-t border-black  text-lg lg:text-xl bg-[#FDFDFD]">
              <div className="flex items-center h-12 lg:h-16 border-b border-gray-300">
                <div className="w-1/2 flex justify-center">
                  {recipe?.ingredients?.ingredients_name}
                </div>
                <div className="w-1/2 flex justify-center">
                  {recipe?.ingredients?.ingredients_num}
                </div>
              </div>
            </div>
          </div>

          {/* 조리 순서 */}
          <div className="mt-12">
            <div className="text-xl lg:text-2xl font-gowun">조리순서</div>
            {recipe?.cooking_order
              ?.slice()
              .reverse()
              .map((order, i) => (
                <div
                  key={i}
                  className="m-2 mt-4 bg-[#FBFBFB] p-4 border rounded-lg"
                >
                  <div className="font-gowun flex flex-col lg:flex-row gap-4">
                    <div className="w-1/5 text-base lg:text-xl font-bold">
                      Step {order.order}
                    </div>
                    <div className="text-base lg:text-lg w-full">
                      {order.content}
                    </div>
                    {/* {order.img_path && (
                        <img
                          src={order.img_path
                            ?.replace(
                              "C:/main_images",
                              "http://localhost:8080/images"
                            )
                            .replaceAll("\\", "/")}
                          className="w-full lg:w-[200px] h-[150px] object-cover rounded border"
                        />
                      )} */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailpage;
