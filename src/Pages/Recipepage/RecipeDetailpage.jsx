import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackIcon } from "../../Component/Icon/Icon";
const RecipeDetailpage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState([]);
  const navigate = useNavigate();
  console.log("recipeId:", recipeId); // null이면 문제가 있음
  console.log("recipeId Type:", typeof recipeId);
  console.log("이미지 경로:", recipe?.images?.img_path);
  const handleBackNavigate = () => {
    navigate("/recipe");
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
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[900px] px-4">
        <div className="mt-12 flex items-start gap-4">
          {/* ← 뒤로가기 아이콘 */}
          <div className="cursor-pointer mt-2" onClick={handleBackNavigate}>
            <BackIcon />
          </div>

          {/* 실제 콘텐츠 */}
          <div className="w-full">
            <div className="text-xl lg:text-3xl mt-2">
              {recipe.recipe_title}
            </div>
            <div className="mt-4 text-base lg:text-2xl">
              <p>{recipe.recipe_content}</p>
            </div>

            <div className="mt-8 h-[500px] border-1">
              <img
                src={recipe.images?.img_path
                  ?.replace("C:/main_images", "http://localhost:8080/images")
                  .replaceAll("\\", "/")}
                alt="대표 이미지"
                className="w-full max-h-[500px] object-cover rounded-xl border"
              />
            </div>

            {/* 재료 */}
            <div className="mt-12">
              <div className="text-xl lg:text-2xl font-bold">재료</div>
              <div className="mt-4 border-t border-black  text-lg lg:text-xl bg-[#FDFDFD]">
                <div className="flex items-center h-12 lg:h-16 border-b border-gray-300">
                  <div className="w-1/2 pl-4">
                    {recipe?.ingredients?.ingredients_name}
                  </div>
                  <div className="w-1/2">
                    {recipe?.ingredients?.ingredients_num}
                  </div>
                </div>
              </div>
            </div>

            {/* 조리 순서 */}
            <div className="mt-12">
              <div className="text-xl lg:text-2xl font-bold">조리순서</div>
              {recipe?.cooking_order
                ?.slice()
                .reverse()
                .map((order, i) => (
                  <div
                    key={i}
                    className="mt-4 bg-[#FBFBFB] p-4 border rounded-lg"
                  >
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="text-base lg:text-xl font-bold">
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
    </div>
  );
};

export default RecipeDetailpage;
