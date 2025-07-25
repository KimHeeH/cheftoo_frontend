import React, { useState } from "react";
import Menubar from "../../Component/Menubar/Menubar";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { SelectedBoxIcon } from "../../Component/Menubar/Icon/Icon";
import { BoxIcon } from "../../Component/Menubar/Icon/Icon";
import img from "../Recipepage/img/pasta.jpg";
const ScrapFolderDetail = () => {
  const { scrapId } = useParams();
  const [scrapRecipe, setScrapRecipe] = useState([]);
  console.log(scrapId);

  useEffect(() => {
    const fetchScrapRecipe = async () => {
      try {
        const response = await axiosInstance.get(
          `/member/scrap/${scrapId}/recipe`
        );
        setScrapRecipe(response.data.recipe_list);
        console.log(response.data);
      } catch (error) {
        console.error("fetchScrapRecipe 실패", error);
      }
    };
    fetchScrapRecipe();
  }, []);
  return (
    <div>
      <SearchContainer />
      <Menubar />
      <div className="flex">
        {/* <div className="ml-4 w-full h-[20px] flex gap-2 text-lg items-center mt-8 ">
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
        </div> */}
        {/* <div
          className="mt-8 cursor-pointer border-1 w-24 lg:w-32 flex items-center gap-2 justify-center rounded-md h-10 lg:h-12"
          onClick={deleteRecipe}
        >
          <div>
            <DeleteIcon />
          </div>
          <div className="text-sm mr-1 lg:text-lg">삭제</div>
        </div> */}
      </div>

      <div className="container">
        {scrapRecipe.map((recipe) => (
          <div className="flex h-[120px] lg:h-auto  lg:gap-8 lg:mt-12 items-center">
            {" "}
            <div className="flex lg:justify-center lg:items-center lg:h-full ">
              <div className="lg:w-80 lg:h-full relative">
                <img
                  src={recipe.img_path}
                  className="w-[200px] lg:w-full lg:h-full rounded-md"
                  alt="img"
                />
                {/* <div
                  className="absolute top-0 left-0 z-10 cursor-pointer" // 위치 보정
                  onClick={() => toggleBox(recipe.recipe_id)}
                > */}
                {/* {selectedIds.includes(recipe.recipe_id) ? (
                    <SelectedBoxIcon />
                  ) : (
                    <BoxIcon />
                  )} */}
                {/* </div> */}
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
