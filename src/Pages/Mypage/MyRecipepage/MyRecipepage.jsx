import React, { useEffect } from "react";
import SearchContainer from "../../../Component/SearchContainer/SearchContainer";
import Menubar from "../../../Component/Menubar/Menubar";
import { useState } from "react";
import img from "../img/myRecipeImg.jpg";
import { DeleteIcon } from "../../../Component/Menubar/Icon/Icon";
import { BoxIcon } from "../../../Component/Menubar/Icon/Icon";
import axios from "axios";
import { SelectedBoxIcon } from "../../../Component/Menubar/Icon/Icon";
import axiosInstance from "../../../api/axiosInstance";
const MyRecipepage = () => {
  //   const [selectAll, setSelectAll] = useState(false);
  //   const [selectRecipe, setSelectRecipe] = useState(false);
  const [myRecipe, setMyRecipe] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const isAllSelected =
    myRecipe.length > 0 && selectedIds.length === myRecipe.length;

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
      console.log(selectedIds);
      await Promise.all(
        selectedIds.map((RecipeId, index) =>
          axiosInstance.delete(`/recipe/${RecipeId}`)
        )
      );
      alert("삭제가 완료되었습니다");
      await fetchMyRecipe();

      setSelectedIds([]);
      console.log("deleteRecipe 성공");
    } catch (error) {
      console.error("deleteRecipe 오류");
    }
  };
  const fetchMyRecipe = async () => {
    try {
      const response = await axiosInstance.get("/recipe/member");
      setMyRecipe(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("fetchMyRecipe 실패");
    }
  };
  useEffect(() => {
    fetchMyRecipe();
  }, []);
  return (
    <div className="container  ml-4">
      <SearchContainer />
      <Menubar />
      <div className="text-md ml-4 lg:ml-4  lg:text-xl  mt-8">
        등록한 레시피
      </div>
      <div className="flex">
        <div className="ml-4 w-full h-[20px] flex gap-2 text-lg items-center mt-8 ">
          <div
            className="cursor-pointer h-full flex justify-center"
            onClick={toggleAllBox}
          >
            {isAllSelected ? <SelectedBoxIcon /> : <BoxIcon />}
          </div>
          <div className="text-sm lg:text-base h-full">
            {" "}
            {isAllSelected ? "전체해제" : "전체선택"}
          </div>
        </div>
        <div
          className="mt-8 cursor-pointer border-1 w-24 lg:w-32 flex items-center gap-2 justify-center rounded-md h-10 lg:h-12"
          onClick={deleteRecipe}
        >
          <div>
            <DeleteIcon />
          </div>
          <div className="text-sm mr-1 lg:text-lg">삭제</div>
        </div>
      </div>

      <div className="container">
        {myRecipe.map((recipe) => (
          <div
            className="flex h-[120px] lg:h-auto  lg:gap-8 lg:mt-12 items-center"
            key={recipe.recipe_id}
          >
            {" "}
            <div className="flex lg:justify-center lg:items-center lg:h-full ">
              <div className="lg:w-80 lg:h-full relative">
                <img
                  src={img}
                  className="w-[200px] lg:w-full lg:h-full"
                  alt="img"
                />
                <div
                  className="absolute top-0 left-0 z-10 cursor-pointer"
                  onClick={() => toggleBox(recipe.recipe_id)}
                >
                  {selectedIds.includes(recipe.recipe_id) ? (
                    <SelectedBoxIcon />
                  ) : (
                    <BoxIcon />
                  )}
                </div>
              </div>
            </div>
            <div className="font-gowun ml-4 flex lg:h-auto flex-col w-full">
              {" "}
              <div className="text-md lg:text-2xl">{recipe.recipe_title}</div>
              <div className="text-sm lg:text-lg">{recipe.recipe_content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipepage;
