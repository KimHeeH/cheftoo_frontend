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
    <div className="font-pretendard ">
      <div className="flex">
        {" "}
        <div className="flex flex-col w-full gap-2   text-lg lg:text-2xl font-semibold ">
          <div> 나의 레시피 </div>{" "}
          <span className="text-xs lg:text-sm text-gray-400 font-medium">
            내가 등록한 레시피를 확인해보세요
          </span>
        </div>
        <div className="w-full flex justify-end ">
          {" "}
          <div
            onClick={deleteRecipe}
            className="flex justify-center items-center border rounded-xl w-20 lg:w-28 text-white bg-brand hover:bg-brandDark cursor-pointer text-sm lg:text-base font-medium h-12"
          >
            삭제{" "}
          </div>{" "}
        </div>
      </div>

      <div className="flex flex-row sm:items-center justify-between mt-6 gap-4 sm:gap-6">
        <div className="flex items-center h-10 gap-2">
          <div className="cursor-pointer" onClick={toggleAllBox}>
            {isAllSelected ? <SelectedBoxIcon /> : <BoxIcon />}
          </div>
          <div className="text-sm lg:text-base">
            {isAllSelected ? "전체해제" : "전체선택"}
          </div>
        </div>
      </div>

      {/* 레시피 리스트 */}
      <div className="mt-6 gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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
      {myRecipe.length === 0 && (
        <div className="z-99 flex justify-center items-center text-center text-gray-400  h-[200px] lg:w-full lg:h-[200px] lg:border-1 ">
          아직 등록한 레시피가 없습니다.
          <br />
          당신만의 레시피를 등록해보세요.
        </div>
      )}
    </div>
  );
};

export default MyRecipeComponent;
