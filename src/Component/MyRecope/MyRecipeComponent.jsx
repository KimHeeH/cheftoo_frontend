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
      <div className="flex  sm:flex-row sm:items-center justify-between mt-6 gap-6">
        <div className="flex items-center gap-2">
          <div className="cursor-pointer" onClick={toggleAllBox}>
            {isAllSelected ? <SelectedBoxIcon /> : <BoxIcon />}
          </div>
          <div className="text-sm lg:text-base">
            {isAllSelected ? "전체해제" : "전체선택"}
          </div>
        </div>
        <div
          className="cursor-pointer border w-20 lg:w-32 flex items-center gap-1 justify-center bg-brand rounded-md h-8 lg:h-12 hover:bg-brandDark"
          onClick={deleteRecipe}
        >
          <DeleteIcon />
          <span className="text-sm lg:text-xl text-white ">삭제</span>
        </div>
      </div>

      {/* 레시피 리스트 */}
      <div className="mt-6 gap-12 mb-40 grid grid-cols-2 lg:w-full">
        {myRecipe.map((recipe) => (
          <div
            onClick={() => handleRecipeDetail(recipe.recipe_id)}
            className="flex flex-col  gap-4 lg:gap-8 items-start lg:w-full cursor-pointer"
            key={recipe.recipe_id}
          >
            {/* 이미지 박스 */}
            <div className="relative w-full  aspect-[4/3] overflow-hidden rounded-3xl rounded-tl-none">
              <img
                src={recipe.img_path}
                className="lg:w-full h-[180px] lg:h-full object-cover rounded-md"
                alt="recipe"
              />
              <div
                className="absolute top-0 left-0 cursor-pointer"
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

            {/* 텍스트 */}
            <div className=" flex flex-col w-full">
              <div className="text-xl lg:text-2xl font-semibold">
                {recipe.recipe_title}
              </div>
              <div className="text-sm lg:text-lg text-gray-600 mt-1">
                {recipe.recipe_content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipeComponent;
