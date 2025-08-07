import React from "react";
import axiosInstance from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, BoxIcon, SelectedBoxIcon } from "../Menubar/Icon/Icon";
const MyRecipeComponent = () => {
  const navigate = useNavigate();
  const [myRecipe, setMyRecipe] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const isAllSelected =
    myRecipe.length > 0 && selectedIds.length === myRecipe.length;
  const handleRecipeDetail = (recipe_id) => {
    navigate(`/recipes/${recipe_id}`);
  };
  const toggleBox = (recipeId) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(recipeId)
        ? prevSelected.filter((id) => id !== recipeId)
        : [...prevSelected, recipeId]
    );
  };

  const toggleAllBox = () => {
    if (selectedIds.length === myRecipe.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(myRecipe.map((recipe) => recipe.recipe_id));
    }
  };

  const deleteRecipe = async () => {
    try {
      await Promise.all(
        selectedIds.map((id) => axiosInstance.delete(`/recipe/${id}`))
      );
      alert("삭제가 완료되었습니다");
      await fetchMyRecipe();
      setSelectedIds([]);
    } catch (error) {
      console.error("deleteRecipe 오류");
    }
  };

  const fetchMyRecipe = async () => {
    try {
      const response = await axiosInstance.get("/recipe/member");
      setMyRecipe(response.data);
    } catch (error) {
      console.error("fetchMyRecipe 실패");
    }
  };

  useEffect(() => {
    fetchMyRecipe();
  }, []);
  return (
    <div className="font-pretendard max-w-[1000px] mx-auto">
      <div className="text-2xl font-semibold">나의 레시피</div>
      <div className="flex flex-row sm:items-center justify-between mt-6 gap-4 sm:gap-6">
        <div className="flex items-center h-10 gap-2">
          <div className="cursor-pointer" onClick={toggleAllBox}>
            {isAllSelected ? <SelectedBoxIcon /> : <BoxIcon />}
          </div>
          <div className="text-sm lg:text-base">
            {isAllSelected ? "전체해제" : "전체선택"}
          </div>
        </div>
        <div
          className="cursor-pointer border w-fit px-4 flex items-center gap-2 bg-brand rounded-md h-10 lg:h-12 hover:bg-brandDark hover:scale-[1.05]"
          onClick={deleteRecipe}
        >
          <div className="hidden lg:block">
            <DeleteIcon />
          </div>
          <span className="text-sm lg:text-base text-white">삭제</span>
        </div>
      </div>

      {/* 레시피 리스트 */}
      <div className="mt-6 gap-8 mb-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {myRecipe.map((recipe) => (
          <div
            key={recipe.recipe_id}
            onClick={() => handleRecipeDetail(recipe.recipe_id)}
            className="bg-white rounded-2xl rounded-tl-none shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col overflow-hidden"
          >
            {/* 이미지 */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img
                src={recipe.img_path}
                alt="recipe"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute top-0 left-0"
                onClick={(e) => {
                  toggleBox(recipe.recipe_id);
                  e.stopPropagation();
                }}
              >
                {selectedIds.includes(recipe.recipe_id) ? (
                  <SelectedBoxIcon />
                ) : (
                  <BoxIcon />
                )}
              </div>
            </div>

            {/* 텍스트 영역 */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 truncate">
                {recipe.recipe_title}
              </h3>
              <p className="text-sm lg:text-base text-gray-600 line-clamp-2">
                {recipe.recipe_content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipeComponent;
