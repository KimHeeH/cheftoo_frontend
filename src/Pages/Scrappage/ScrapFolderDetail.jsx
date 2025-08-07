import React, { useState } from "react";
import Menubar from "../../Component/Menubar/Menubar";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import {
  BackIcon,
  FolderOpenIcon,
  SelectedBoxIcon,
} from "../../Component/Menubar/Icon/Icon";
import { BoxIcon } from "../../Component/Menubar/Icon/Icon";
import { useNavigate } from "react-router-dom";
import img from "../Recipepage/img/pasta.jpg";
import { DeleteIcon } from "../../Component/Menubar/Icon/Icon";
import { useLocation } from "react-router-dom";

const ScrapFolderDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrap_name } = location.state || {}; // null-safe
  const { scrapId } = useParams();
  const [selectedIds, setSelectedIds] = useState([]);
  const [scrapRecipe, setScrapRecipe] = useState([]);
  console.log(scrapId);
  console.log(scrap_name);
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
  const handleBackNavigate = () => {
    navigate(-1);
  };
  useEffect(() => {
    fetchScrapRecipe();
  }, []);
  const handleRecipeDetail = (recipe_id) => {
    navigate(`/recipes/${recipe_id}`);
  };
  return (
    <div className="font-pretendard">
      <SearchContainer />
      <Menubar />

      {/* 뒤로가기 아이콘 */}

      <div className="px-3">
        <div className="container mt-4 mb-4 ml-2">
          <div className="cursor-pointer mt-2" onClick={handleBackNavigate}>
            <BackIcon />
          </div>
        </div>{" "}
        <div className="container text-md lg:text-xl mt-6 font-semibold">
          나의 스크랩 레시피
        </div>
        {/* 스크랩 폴더 이름 박스 */}
        <div className="flex flex-col items-center justify-center gap-3 max-w-[500px] h-36 mx-auto border rounded-[2rem] mt-6">
          <FolderOpenIcon />
          <div className="text-xl">{scrap_name}</div>
        </div>
        {/* 전체선택 + 삭제 버튼 */}
        <div className="container flex justify-between items-center mt-8">
          <div className="flex items-center gap-2 text-lg">
            <div
              className="cursor-pointer h-full flex items-center"
              onClick={toggleAllBox}
            >
              {isAllSelected ? <SelectedBoxIcon /> : <BoxIcon />}
            </div>
            <div className="text-sm lg:text-base">
              {isAllSelected ? "전체해제" : "전체선택"}
            </div>
          </div>

          <div
            className="bg-brand hover:bg-brandDark cursor-pointer border  w-fit px-4 lg:w-28 flex items-center justify-center gap-2  rounded-xl  h-10 lg:h-12"
            onClick={() => deleteRecipe(scrapRecipe.scrap_id, selectedIds)}
          >
            <div className="text-sm lg:text-lg text-white">삭제</div>
          </div>
        </div>
        {/* 레시피 리스트 */}
        <div className="container grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8 mt-6 pb-20">
          {scrapRecipe?.recipe_list?.map((recipe) => (
            <div
              key={recipe.scrap_id}
              className="flex flex-col  rounded-md hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="p-2 flex justify-center w-full items-center relative">
                <div className="w-full relative">
                  <img
                    src={recipe.img_path}
                    alt="img"
                    onClick={() => handleRecipeDetail(recipe?.recipe_id)}
                    className="w-full h-[120px] lg:h-[190px] object-cover rounded-md"
                  />
                  <div
                    className="absolute top-2 left-2 z-10"
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
              <div className="px-4 pb-4 flex flex-col gap-1">
                <div className="text-sm lg:text-2xl font-semibold">
                  {recipe?.recipe_title}
                </div>
                <div className="text-xs lg:text-lg text-gray-600">
                  {recipe?.recipe_content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 페이지 제목 */}
    </div>
  );
};

export default ScrapFolderDetail;
