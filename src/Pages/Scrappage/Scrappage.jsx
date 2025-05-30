import React from "react";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Menubar from "../../Component/Menubar/Menubar";
import img from "../Mypage/img/myRecipeImg.jpg";
import { BoxIcon } from "../../Component/Menubar/Icon/Icon";
import { SelectedBoxIcon } from "../../Component/Menubar/Icon/Icon";
import { DeleteIcon } from "../../Component/Menubar/Icon/Icon";
import { useState } from "react";
const Scrappage = () => {
  const [selectIds, setSelectIds] = useState([]);
  const dummyRecipes = [
    {
      recipe_id: "1",
      recipe_title: "감자조림",
      recipe_content: "달콤 짭조름한 감자조림 레시피",
    },
    {
      recipe_id: "2",
      recipe_title: "된장찌개",
      recipe_content: "진한 국물 맛의 된장찌개",
    },
  ];
  const toggleBox = (recipeId) => {
    setSelectIds((prevSelected) =>
      prevSelected.includes(recipeId)
        ? prevSelected.filter((id) => id !== recipeId)
        : [...prevSelected, recipeId]
    );
  };
  const toggleAllBox = () => {
    if (selectIds.length === dummyRecipes.length) {
      setSelectIds([]);
    } else {
      setSelectIds(dummyRecipes.map((recipe) => recipe.recipe_id));
    }
  };
  return (
    <div className="container ml-4">
      <SearchContainer />
      <Menubar />

      <div className="text-lg lg:ml-4 lg:text-xl mt-8">등록한 레시피</div>

      <div className="flex">
        <div className="ml-4 w-full flex gap-2 text-lg items-center mt-8">
          <div className="cursor-pointer" onClick={() => toggleAllBox}>
            {selectIds.length === dummyRecipes.length ? (
              <SelectedBoxIcon />
            ) : (
              <BoxIcon />
            )}
          </div>
          <div className="">
            {" "}
            {selectIds.length === dummyRecipes.length
              ? "전체해제 "
              : "전체선택"}
          </div>
        </div>
        <div className="mt-8 cursor-pointer border-1 w-32 flex items-center gap-2 justify-center rounded-md h-12">
          <div>
            <DeleteIcon />
          </div>
          <div>삭제</div>
        </div>
      </div>

      <div className="container">
        {dummyRecipes.map((recipe) => (
          <div key={recipe.recipe_id} className="flex gap-8 mt-4 items-center">
            <div className="flex justify-center items-center border-1">
              <div className="w-80 h-[200px] relative">
                <img src={img} className="w-full h-full" alt="img" />
                <div
                  className="absolute top-0 left-0 cursor-pointer"
                  onClick={() => toggleBox(recipe.recipe_id)}
                >
                  {selectIds.includes(recipe.recipe_id) ? (
                    <SelectedBoxIcon />
                  ) : (
                    <BoxIcon />
                  )}
                </div>
              </div>
            </div>
            <div className="font-gowun flex flex-col w-full">
              <div className="lg:text-2xl">{recipe.recipe_title}</div>
              <div className="lg:text-lg">{recipe.recipe_content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scrappage;
