import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackIcon, FolderNameIcon } from "../../Component/Menubar/Icon/Icon";
import img from "./img/pasta.jpg";
import {
  BigBookmarkIcon,
  CommentIcon,
  CookingOrderIcon,
  IngredientIcon,
  SelectedBigBookmarkIcon,
} from "../../Component/Menubar/Icon/Icon";
import { RecipeDetailProfileIcon } from "../../Component/Menubar/Icon/Icon";
import { DotMenuIcon } from "../../Component/Menubar/Icon/Icon";
import { XIcon } from "../../Component/Menubar/Icon/Icon";
import axiosInstance from "../../api/axiosInstance";
const RecipeDetailpage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [bookmark, setBookmark] = useState(false);
  const [commentIds, setCommnetIds] = useState("");
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [isScrapModalOpen, setIsScrapModalOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [folders, setFolders] = useState([]);
  const [scrapList, setScrapList] = useState([]);
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const [mainImg, setMainImg] = useState(null);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const sortedCookingOrder = recipe?.cooking_order
    ? [...recipe.cooking_order].sort((a, b) => a.order - b.order)
    : [];

  const openMenuBar = (commentId) => {
    setCommnetIds((prev) => (prev === commentId ? null : commentId));
    setOpenMenu(!openMenu);
  };
  const closeModal = () => {
    setIsScrapModalOpen(false);
  };
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month}.${day} ${hours}:${minutes}`;
  }
  const handleBackNavigate = () => {
    navigate("/recipe");
  };
  const handleActiveBookmark = async (recipeId) => {
    setBookmark(!bookmark);
    setSelectedRecipeId(recipeId);
    setIsScrapModalOpen(true);
  };
  const uploadComment = async () => {
    console.log("setCommnet", comment);
    try {
      const response = await axiosInstance.post(
        `/recipe/${recipeId}/comment`,
        { commentContent: comment },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setComment([]);
      alert("댓글이 등록되었습니다");

      fetchComment();
    } catch (error) {
      console.error("uploadComment Fail", error);
    }
  };
  const handleScrapToFolder = async (scrapId) => {
    try {
      await axiosInstance.post(
        `member/scrap/${scrapId}/recipe/${recipe.recipe_id}`
      );

      alert("스크랩이 완료되었습니다.");
      setIsScrapModalOpen(false);
    } catch (error) {
      console.error("스크랩 실패", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axiosInstance.delete(
        `/recipe/comment/${commentId}`
      );
      alert("댓글이 삭제되었습니다");

      fetchComment();
    } catch (error) {
      console.error("댓글 삭제 실패", error);
    }
  };

  useEffect(() => {
    if (!recipeId) return;

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/recipe/${recipeId}`,

          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setRecipe(response.data);
      } catch (error) {
        console.error("레시피 가져오기 실패", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const fetchComment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/recipe/comment/${recipeId}`,
        { withCredentials: true }
      );
      setCommentList(response.data);
    } catch (error) {
      console.error("레시피 댓글 가져오기 실패", error);
    }
  };
  useEffect(() => {
    if (recipeId) fetchComment();
  }, [recipeId]);
  useEffect(() => {
    const fetchRecipeScrap = async () => {
      try {
        const response = await axiosInstance.get("/member/scrap", {});
        const mappedFolders = response.data.map((folder, index) => ({
          ...folder,
          scrap_name: folder.scrap_name,
          scrap_id: folder.scrap_id,
          index: index + 1,
        }));
        setFolders(mappedFolders);
      } catch (error) {
        console.error("fetchRecipeScrap Error", error);
      }
    };
    fetchRecipeScrap();
  }, []);

  useEffect(() => {
    const fetchScrap = async () => {
      try {
        const response = await axiosInstance.get("/member/scrap");
      } catch (error) {
        console.error("스크랩 레시피 오류", error);
      }
    };
    fetchScrap();
  }, []);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="w-full p-3">
      <div className="container mt-4 mb-4 ml-2">
        {/* ← 뒤로가기 아이콘 */}
        <div className="cursor-pointer mt-2" onClick={handleBackNavigate}>
          <BackIcon />
        </div>
      </div>

      <div className="w-full max-w-full px-2 lg:px-4 lg:max-w-[900px] mx-auto">
        <div>
          {/* 대표 이미지 */}
          <div className="w-full aspect-[3/2] lg:aspect-[16/9] rounded-xl overflow-hidden border bg-gray-100">
            <img
              className="w-full h-full object-cover"
              src={recipe?.images?.img_path}
              alt="대표 이미지"
            />
          </div>

          {/* 제목 & 북마크 */}
          <div className="flex justify-between items-start gap-2 mt-3">
            <h2 className="text-lg lg:text-3xl font-bold leading-tight text-gray-900 max-w-[80%]">
              {recipe.recipe_title}
            </h2>
            <button
              className={`w-8 h-8 lg:w-12 lg:h-12 border rounded-lg flex justify-center items-center cursor-pointer
          transition-transform duration-150 active:scale-95 hover:shadow-md
          ${bookmark ? "bg-[#FDFDFD]" : "bg-white border-gray-300"}`}
              onClick={() => handleActiveBookmark(recipe.recipeId)}
            >
              {bookmark ? <SelectedBigBookmarkIcon /> : <BigBookmarkIcon />}
            </button>
          </div>

          {/* 내용 */}
          <p className="text-gray-700 text-sm lg:text-lg leading-relaxed mt-2">
            {recipe.recipe_content}
          </p>

          {/* 댓글/북마크 수 */}
          <div className="flex gap-4 text-xs lg:text-sm text-gray-500 mt-2">
            <span>댓글 {commentList.length}</span>
            <span>북마크 {commentList.length}</span>
          </div>
        </div>

        {/* 재료 */}
        <div className="mt-10">
          <div className="flex gap-2 mb-4 bg-orange-400 px-3 py-1.5 rounded-md items-center w-fit">
            <IngredientIcon />
            <span className="text-white text-sm lg:text-xl font-semibold">
              재료
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {recipe?.ingredients?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <span className="text-sm lg:text-lg text-gray-800 font-medium">
                  {item.ingredients_name}
                </span>
                <span className="text-sm lg:text-lg text-gray-500">
                  {item.ingredients_num}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* 재료 */}
        <div className="mt-10">
          <div className="flex gap-2 mb-4 bg-orange-400 px-3 py-1.5 rounded-md items-center w-fit">
            <IngredientIcon />
            <span className="text-white text-sm lg:text-xl font-semibold">
              양념
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {recipe?.sauce?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <span className="text-sm lg:text-lg text-gray-800 font-medium">
                  {item.sauce_name}
                </span>
                <span className="text-sm lg:text-lg text-gray-500">
                  {item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* 조리 순서 */}
        <div className="mt-10">
          <div className="flex gap-2 mb-4 bg-orange-400 px-3 py-1.5 rounded-md items-center w-fit">
            <CookingOrderIcon />
            <span className="text-white text-sm lg:text-xl font-semibold">
              조리순서
            </span>
          </div>

          {/* 모바일: 세로 스택 / 데스크탑: 가로 레이아웃 */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2">
              {sortedCookingOrder.map((order, i) => (
                <div
                  key={i}
                  className={`cursor-pointer p-3 border-b hover:bg-gray-100 ${
                    selectedStepIndex === i ? "bg-orange-100" : ""
                  }`}
                  onClick={() => setSelectedStepIndex(i)}
                >
                  <div className="font-bold text-base lg:text-lg">
                    Step {order.order}
                  </div>
                  <div className="text-sm lg:text-base">{order.content}</div>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-1/2 flex justify-center items-center border-1">
              {sortedCookingOrder?.[selectedStepIndex]?.img_path ? (
                <img
                  src={sortedCookingOrder[selectedStepIndex].img_path}
                  alt="조리 이미지"
                  className="w-full max-w-[400px] rounded-xl object-cover"
                />
              ) : (
                <div className="text-gray-500 text-sm">이미지가 없습니다</div>
              )}
            </div>
          </div>
        </div>

        {/* 댓글 영역 */}
        <div className="mt-10 border-t pt-6">
          <div className="flex flex-wrap gap-2 items-center text-base lg:text-2xl font-semibold mb-4">
            <CommentIcon />
            <span>요리후기</span>
            <span className="text-orange-500">{commentList.length}</span>
            <span className="text-xs lg:text-base font-normal text-gray-500">
              소중한 레시피에 후기를 남겨주세요
            </span>
          </div>

          {/* 댓글 작성 */}
          <div className="bg-[#FDFDFD] border rounded-xl p-3 shadow-sm">
            <textarea
              className="w-full rounded-lg text-sm lg:text-lg resize-none p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="댓글을 남겨주세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={uploadComment}
                className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm lg:text-base font-semibold transition-transform active:scale-95"
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailpage;
