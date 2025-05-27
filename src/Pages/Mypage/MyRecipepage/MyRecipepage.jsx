import React, { useEffect } from "react";
import SearchContainer from "../../../Component/SearchContainer/SearchContainer";
import Menubar from "../../../Component/Menubar/Menubar";
import { useState } from "react";
import img from "../img/myRecipeImg.jpg";
import { DeleteIcon } from "../../../Component/Menubar/Icon/Icon";
import { BoxIcon } from "../../../Component/Menubar/Icon/Icon";
import axios from "axios";
import { SelectedBoxIcon } from "../../../Component/Menubar/Icon/Icon";
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
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`http://localhost:8080/recipes/${id}`, {
            withCredentials: true,
          })
        )
      );
      setMyRecipe((prev) =>
        prev.filter((r) => !selectedIds.includes(r.recipe_id))
      );
      setSelectedIds([]);
      console.log("deleteRecipe 성공");
    } catch (error) {
      console.error("deleteRecipe 오류");
    }
  };

  useEffect(() => {
    const fetchMyRecipe = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/recipes/member",
          {
            withCredentials: true,
          }
        );
        console.log("fetchMyRecipe값", response.data);
        setMyRecipe(response.data);
      } catch (error) {
        console.error("fetchMyRecipe 실패");
      }
    };
    fetchMyRecipe();
  }, []);
  return (
    <div className="container  ml-4">
      <SearchContainer />
      <Menubar />
      <div className="text-lg lg:ml-4  lg:text-xl  mt-8">등록한 레시피</div>
      <div className="flex">
        <div className="ml-4 w-full  flex gap-2 text-lg items-center mt-8 ">
          <div className="cursor-pointer" onClick={toggleAllBox}>
            {isAllSelected ? <SelectedBoxIcon /> : <BoxIcon />}
          </div>
          <div className=""> {isAllSelected ? "전체해제" : "전체선택"}</div>
        </div>
        <div
          className="mt-8 cursor-pointer border-1 w-32 flex items-center gap-2 justify-center rounded-md h-12"
          onClick={deleteRecipe}
        >
          <div>
            <DeleteIcon />
          </div>
          <div>삭제</div>
        </div>
      </div>

      <div className="container">
        {myRecipe.map((recipe) => (
          <div className="flex gap-8 mt-4 items-center">
            {" "}
            <div className="flex justify-center items-center  border-1">
              <div className="w-80 h-[200px] relative">
                {" "}
                <img src={img} className="w-full h-full" alt="img" />
                <div
                  className="absolute top-0 left-0 cursor-pointer"
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
            <div className="font-gowun flex flex-col w-full ">
              {" "}
              <div className="lg:text-2xl">{recipe.recipe_title}</div>
              <div className="lg:text-lg">{recipe.recipe_content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipepage;
