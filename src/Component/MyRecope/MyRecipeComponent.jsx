import React from "react";
import axiosInstance from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, BoxIcon, SelectedBoxIcon } from "../Menubar/Icon/Icon";
const MyRecipeComponent = () => {
  const navigate = useNavigate();
  const [myRecipe, setMyRecipe] = useState({
    content: [],
    total_pages: 0,
    number: 0,
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const PAGE_SIZE = 12;
  const [page, setPage] = useState(0);
  const meta = myRecipe;

  const displayData = meta?.content || [];
  const currentPage = meta?.number ?? 0;

  const totalPages = meta?.total_pages ?? 0;
  const isAllSelected =
    myRecipe.length > 0 && selectedIds.length === myRecipe.length;
  const handleRecipeDetail = (recipe_id) => {
    navigate(`/recipes/${recipe_id}`);
  };
  const goPage = (next) => {
    if (next < 0 || next >= totalPages) return;
    fetchMyRecipe(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getVisiblePages = (current, total) => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i);
    const start = Math.max(0, Math.min(current - 2, total - 5));
    return Array.from({ length: 5 }, (_, i) => start + i);
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

  const fetchMyRecipe = async (p = 0) => {
    try {
      const response = await axiosInstance.get("/recipe/member", {
        params: { page: p, size: PAGE_SIZE },
        withCredentials: true,
      });
      console.log("myRecipe response:", response.data);

      setMyRecipe(response.data);
      setPage(p);
    } catch (error) {
      console.error("fetchMyRecipe 실패");
    }
  };

  useEffect(() => {
    fetchMyRecipe(0);
  }, []);
  return (
    <div className="font-pretendard ">
      {" "}
      <div className="flex items-start">
        {" "}
        <div className="flex-1 min-w-0 flex flex-col lg:gap-2 text-lg lg:text-2xl font-semibold">
          <div> 나의 레시피 </div>
          <span className="text-sm lg:text-lg text-gray-400 font-medium">
            내가 등록한 레시피를 확인해보세요
          </span>
        </div>
        {myRecipe.length > 0 && (
          <div className="shrink-0 ml-auto">
            <div
              onClick={deleteRecipe}
              className="flex justify-center items-center border rounded-xl w-20 lg:w-28 text-white bg-brand hover:bg-brandDark cursor-pointer text-sm lg:text-base font-medium h-12"
            >
              삭제
            </div>
          </div>
        )}
      </div>
      {myRecipe.length > 0 && (
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
      )}
      {/* 레시피 리스트 */}
      <div className="mt-6 gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-3 pb-24 lg:pb-0">
        {myRecipe?.content?.map((recipe) => (
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
            <div className="px-4 py-2 flex flex-col">
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 truncate">
                {recipe.recipe_title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {totalPages >= 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => goPage(0)}
            disabled={currentPage === 0}
            className="px-3 h-9 rounded-lg border text-sm disabled:opacity-40"
          >
            처음
          </button>
          <button
            onClick={() => goPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-3 h-9 rounded-lg border text-sm disabled:opacity-40"
          >
            이전
          </button>

          {getVisiblePages(currentPage, totalPages).map((p) => (
            <button
              key={p}
              onClick={() => goPage(p)}
              className={`px-3 h-9 rounded-lg border text-sm ${
                p === currentPage
                  ? "bg-brand text-white border-brand"
                  : "hover:bg-gray-50"
              }`}
            >
              {p + 1}
            </button>
          ))}

          <button
            onClick={() => goPage(currentPage + 1)}
            disabled={currentPage + 1 >= totalPages}
            className="px-3 h-9 rounded-lg border text-sm disabled:opacity-40"
          >
            다음
          </button>
          <button
            onClick={() => goPage(totalPages - 1)}
            disabled={currentPage + 1 >= totalPages}
            className="px-3 h-9 rounded-lg border text-sm disabled:opacity-40"
          >
            마지막
          </button>
        </div>
      )}
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
