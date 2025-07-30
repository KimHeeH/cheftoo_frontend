import React, { useState } from "react";
import Menubar from "../../Component/Menubar/Menubar";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { SelectedBoxIcon } from "../../Component/Menubar/Icon/Icon";
import { BoxIcon } from "../../Component/Menubar/Icon/Icon";
import { useNavigate } from "react-router-dom";
import img from "../Recipepage/img/pasta.jpg";
import { DeleteIcon } from "../../Component/Menubar/Icon/Icon";
const ScrapFolderDetail = () => {
  const navigate = useNavigate();
  const { scrapId } = useParams();
  const [selectedIds, setSelectedIds] = useState([]);
  const [scrapRecipe, setScrapRecipe] = useState([]);
  console.log(scrapId);

  const isAllSelected =
    scrapRecipe.recipe_list?.length > 0 &&
    selectedIds.length === scrapRecipe.recipe_list.length;

  const toggleBox = (recipeId) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(recipeId)
        ? prevSelected.filter((id) => id !== recipeId)
        : [...prevSelected, recipeId]
    );
  };
  const toggleAllBox = () => {
    const recipeList = scrapRecipe.recipe_list || [];
    if (selectedIds.length === recipeList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(recipeList.map((recipe) => recipe.recipe_id));
    }
  };
  const deleteRecipe = async (scrap_id, selectedIds) => {
    try {
      console.log(selectedIds);

      const response = await axiosInstance.delete("member/scrap/recipe", {
        data: {
          scrapId: scrap_id,
          recipeIdList: selectedIds,
        },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      alert("삭제가 완료되었습니다");
      await fetchScrapRecipe();
      console.log("삭제 성공:", response.data);
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };
  const fetchScrapRecipe = async () => {
    try {
      const response = await axiosInstance.get(
        `/member/scrap/${scrapId}/recipe`
      );
      setScrapRecipe(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("fetchScrapRecipe 실패", error);
    }
  };
  useEffect(() => {
    fetchScrapRecipe();
  }, []);
  const handleRecipeDetail = (recipe_id) => {
    navigate(`/recipes/${recipe_id}`);
  };
  return (
    <div>
      <SearchContainer />
      <Menubar />
      <div className="container text-md lg:text-xl mt-6 font-semibold">
        나의 스크랩 레시피
      </div>

      <div className="flex container">
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
          onClick={() => deleteRecipe(scrapRecipe.scrap_id, selectedIds)}
        >
          <div>
            <DeleteIcon />
          </div>
          <div className="text-sm mr-1 lg:text-lg">삭제</div>
        </div>
      </div>

      <div className="container">
        {scrapRecipe?.recipe_list?.map((recipe) => (
          <div
            key={recipe.scrap_id}
            className="flex h-[120px] lg:h-[180px]  lg:gap-8 lg:mt-12 items-center cursor-pointer hover:shadow-md "
          >
            {" "}
            <div className="p-2 flex lg:justify-center lg:items-center lg:h-full ">
              <div className="lg:w-80 lg:h-full relative">
                <img
                  src={recipe.img_path}
                  className="w-[200px] lg:w-full lg:h-[190px] object-cover rounded-md"
                  alt="img"
                  onClick={() => handleRecipeDetail(recipe?.recipe_id)}
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
              <div className="text-md lg:text-2xl">{recipe?.recipe_title}</div>
              <div className="text-sm lg:text-lg">{recipe?.recipe_content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrapFolderDetail;
