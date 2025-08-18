import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  BackIcon,
  CommentUserIcon,
  FolderNameIcon,
} from "../../Component/Menubar/Icon/Icon";
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
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
const RecipeDetailpage = () => {
  const { recipeId } = useParams();
  const location = useLocation();
  const commentRef = useRef(null);
  useEffect(() => {
    if (location.state?.scrollToComment && commentRef.current) {
      setTimeout(() => {
        commentRef.current.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location.key]);
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
  const [selectedScrapId, setSelectedScrapId] = useState(null);
  const navigate = useNavigate();
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
    if (!timestamp) return "";

    const [datePart, timePart] = timestamp.split(" ");
    if (!datePart || !timePart) return "";

    const [year, month, day] = datePart.split("-").map((v) => parseInt(v, 10));
    const [hours, minutes] = timePart.split(":").map((v) => parseInt(v, 10));

    // 2자리로 맞추기
    const yy = String(year).padStart(2, "0");
    const mm = String(month).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    const hh = String(hours).padStart(2, "0");
    const min = String(minutes).padStart(2, "0");

    return `${yy}/${mm}/${dd} ${hh}:${min}`;
  }

  const handleBackNavigate = () => {
    navigate(-1);
  };
  const handleActiveBookmark = async (recipeId) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인 후 이용 가능한 기능입니다.");
      navigate("/mypage");
      return;
    }
    setBookmark(!bookmark);
    setSelectedRecipeId(recipeId);
    if (bookmark) {
      try {
        const response = await axiosInstance.delete(`member/scrap/recipe`, {
          headers: { "Content-type": "application/json" },
          data: {
            scrapId: selectedScrapId,
            recipeIdList: [recipeId],
          },
        });
        await fetchRecipe();
        setSelectedScrapId(null);
      } catch (err) {
        console.error("북마크 ");
      }
    }
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
      setBookmark(true);
      setSelectedScrapId(scrapId);
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
  const fetchRecipe = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/recipe/${recipeId}`,

        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      response.data.scrap ? setBookmark(true) : setBookmark(false);
      setRecipe(response.data);
    } catch (error) {
      console.error("레시피 가져오기 실패", error);
    }
  };
  useEffect(() => {
    if (!recipeId) return;

    fetchRecipe();
  }, [recipeId]);

  const fetchComment = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/recipe/${recipeId}/comment/`,
        { withCredentials: true }
      );

      const sortedComment = response.data.sort((a, b) => {
        return (
          new Date(a.data_created).getTime() -
          new Date(b.data_created).getTime()
        );
      });
      setCommentList(sortedComment);
      console.log(response.data);
    } catch (error) {
      console.error("레시피 댓글 가져오기 실패", error);
    }
  };

  //   try {
  //     const response = await axiosInstance.put(
  //       "/comment",
  //       {
  //         commentId: , // ← 이거 필수
  //         content: "수정된 내용",
  //       },
  //       { withCredentials: true }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.errpr("updateComment 오류", error);
  //   }
  // };
  useEffect(() => {
    if (recipeId) fetchComment();
  }, [recipeId]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

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
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

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
      <SearchContainer />
      <div className="container mt-4 mb-4 ml-2">
        {/* ← 뒤로가기 아이콘 */}
        <div className="cursor-pointer mt-2" onClick={handleBackNavigate}>
          <BackIcon />
        </div>
      </div>

      <div className="w-full max-w-full px-2 lg:px-4 lg:max-w-[900px] mx-auto font-pretendard pb-20">
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
              onClick={() => handleActiveBookmark(recipe.recipe_id)}
            >
              {bookmark ? <SelectedBigBookmarkIcon /> : <BigBookmarkIcon />}
            </button>
          </div>

          {/* 내용 */}
          <p className="text-gray-700 text-sm lg:text-2xl leading-relaxed mt-2">
            {recipe.recipe_content}
          </p>

          {/* 댓글/북마크 수 */}
          <div className="flex gap-4 text-xs lg:text-xl text-subText mt-2">
            <span>
              댓글 <span className="text-darkText">{commentList.length}</span>
            </span>
            <span>
              북마크 <span className="text-darkText">{recipe.scrap_count}</span>
            </span>
          </div>
        </div>

        {/* 재료 */}
        <div className="mt-10">
          <div className="flex gap-2 mb-4 bg-brand  px-3 py-1.5 rounded-md items-center w-fit">
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
          <div className="flex gap-2 mb-4 bg-brand px-3 py-1.5 rounded-md items-center w-fit">
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
          <div className="flex gap-2 mb-4 bg-brand px-3 py-1.5 rounded-md items-center w-fit">
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
                  className={`cursor-pointer p-3 border-b hover:bg-[#F5F5F5] ${
                    selectedStepIndex === i ? "bg-[#EAF6F2]" : ""
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
          <div className="flex flex-wrap gap-3 items-center text-base lg:text-2xl font-semibold mb-4">
            <span>요리후기</span>
            <span className="text-brand ">{commentList.length}</span>
            <span className="text-xs lg:text-base font-normal text-subText">
              소중한 레시피에 후기를 남겨주세요
            </span>
          </div>

          {/* 댓글 작성 */}
          <div className="bg-[#EAF6F2] border rounded-xl p-3 shadow-sm">
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
                className="bg-brand hover:bg-brandDark text-white px-4 py-1.5 rounded-lg text-sm lg:text-base font-semibold transition-transform active:scale-95"
              >
                등록
              </button>
            </div>
          </div>
          <div ref={commentRef} id="comments">
            {" "}
            {commentList.map((comment) => (
              <div
                key={comment.comment_id}
                className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 mb-4 mt-4"
              >
                {/* 상단: 프로필, 닉네임, 날짜, 메뉴 버튼 */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <CommentUserIcon />
                    <span className="text-lg font-semibold text-gray-800">
                      {comment.nick_name}
                    </span>
                    <span className="text-base text-gray-400">
                      {" "}
                      {comment.data_created
                        ? formatTimestamp(comment?.data_created)
                        : "날짜 없음"}
                    </span>
                  </div>

                  <div className="relative">
                    <button onClick={() => openMenuBar(comment.comment_id)}>
                      {commentIds === comment.comment_id ? (
                        <XIcon />
                      ) : (
                        <DotMenuIcon />
                      )}
                    </button>
                    {commentIds === comment.comment_id && (
                      <div className="absolute right-0 top-8 w-28 bg-white border border-gray-300 rounded-lg shadow-md z-10">
                        <div
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => deleteComment(comment.comment_id)}
                        >
                          삭제
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 본문 */}
                <div className="text-gray-700 text-lg">
                  {comment.comment_content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isScrapModalOpen && bookmark && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="w-[90%] max-w-[480px] bg-white p-6 rounded-2xl shadow-lg">
            {/* 모달 헤더 */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">폴더 선택</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <XIcon />
              </button>
            </div>

            {/* 폴더 리스트 */}
            <div className="flex flex-col gap-2">
              {folders.map((folder) => (
                <div
                  key={folder.scrap_id}
                  onClick={() => handleScrapToFolder(folder.scrap_id)}
                  className="flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer hover:bg-orange-50 transition"
                >
                  <FolderNameIcon fill="#10B981" />
                  <span className="text-base font-medium text-gray-800">
                    {folder.scrap_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailpage;
