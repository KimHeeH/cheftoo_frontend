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
  CookingOrderIcon,
  IngredientIcon,
  SelectedBigBookmarkIcon,
} from "../../Component/Menubar/Icon/Icon";
import { DotMenuIcon } from "../../Component/Menubar/Icon/Icon";
import { XIcon } from "../../Component/Menubar/Icon/Icon";
import axiosInstance from "../../api/axiosInstance";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import { useMe } from "../../contexts/MeContext";
const RecipeDetailpage = () => {
  const { recipeId } = useParams();
  const location = useLocation();
  const { me } = useMe();
  const [isNoFolderModalOpen, setIsNoFolderModalOpen] = useState(false);
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

    if (bookmark) {
      try {
        if (!selectedScrapId) {
          alert(
            "스크랩 정보를 찾을 수 없습니다. 스크랩 페이지에서 삭제해주세요"
          );
          return;
        }
        await axiosInstance.delete(`member/scrap/recipe`, {
          headers: { "Content-Type": "application/json" },
          data: { scrapId: selectedScrapId, recipeIdList: [recipeId] },
        });
        setBookmark(false);
        setSelectedScrapId(null);
        await fetchRecipe();
        setSelectedScrapId(null);
      } catch (err) {
        console.error("북마크 해제 실패", err);
        alert("북마크 해제에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
      return;
    }
    if (!folders || folders.length === 0) {
      setIsNoFolderModalOpen(true);
      return;
    }
    setSelectedRecipeId(recipeId);

    setIsScrapModalOpen(true);
    const latestFolders = await fetchFolders();
    if (!latestFolders || latestFolders.length === 0) {
      setIsNoFolderModalOpen(true);
      return;
    }
    setSelectedRecipeId(recipeId);
    setIsScrapModalOpen(true);
  };
  const fetchFolders = async () => {
    const res = await axiosInstance.get("/member/scrap");
    const mapped = res.data.map((folder, index) => ({
      ...folder,
      index: index + 1,
    }));
    setFolders(mapped);
    return mapped;
  };

  const uploadComment = async () => {
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
        `${process.env.REACT_APP_API_BASE_URL}/recipe/${recipeId}`,

        {
          withCredentials: true,
        }
      );
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
    } catch (error) {
      console.error("레시피 댓글 가져오기 실패", error);
    }
  };

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
    <main className="w-full p-3" id="main" role="main">
      <section aria-label="메뉴바">
        {" "}
        <SearchContainer />
      </section>

      <nav className="container mt-4 mb-4 ml-2" aria-label="페이지 이동">
        {/* ← 뒤로가기 아이콘 */}
        <button
          type="button"
          className="cursor-pointer mt-2"
          onClick={handleBackNavigate}
          aria-label="이전 페이지로 이동"
        >
          <BackIcon />
        </button>
      </nav>

      <article
        className="w-full max-w-full px-2 lg:px-4 lg:max-w-[900px] mx-auto font-pretendard pb-20"
        aria-labelledby="recipe"
      >
        <div>
          {/* 대표 이미지 */}
          <figure>
            <div className="w-full aspect-[3/2] lg:aspect-[16/9] rounded-xl overflow-hidden border bg-gray-100">
              <img
                className="w-full h-full object-cover"
                src={recipe?.images?.img_path}
                alt={
                  recipe?.recipe_title
                    ? `${recipe.recipe_title} 대표 이미지`
                    : "대표 이미지"
                }
              />
            </div>
          </figure>

          {/* 제목 & 북마크 */}
          <header className="flex justify-between items-start gap-2 mt-3">
            <h2 className="text-lg lg:text-3xl font-bold leading-tight text-gray-900 max-w-[80%]">
              {recipe.recipe_title}
            </h2>
            <button
              type="button"
              className={`w-8 h-8 lg:w-14 lg:h-16 border rounded-lg flex justify-center items-center cursor-pointer
          transition-transform duration-150 active:scale-95 hover:shadow-md
          ${bookmark ? "bg-[#FDFDFD]" : "bg-white border-gray-300"}`}
              onClick={() => handleActiveBookmark(recipe.recipe_id)}
              aria-pressed={bookmark}
              aria-label={bookmark ? "스크랩 해제" : "스크랩"}
              title={bookmark ? "스크랩 해제" : "스크랩"}
            >
              {bookmark ? <SelectedBigBookmarkIcon /> : <BigBookmarkIcon />}
            </button>
          </header>

          {/* 내용 */}
          <p className="text-gray-700 text-sm lg:text-2xl leading-relaxed mt-2">
            {recipe.recipe_content}
          </p>

          {/* 댓글/북마크 수 */}
          <small
            className="flex gap-4 text-xs lg:text-xl text-subText mt-2"
            aria-label="레시피 메타 정보"
          >
            <span>
              댓글 <span className="text-darkText">{commentList.length}</span>
            </span>
            <span>
              북마크 <span className="text-darkText">{recipe.scrap_count}</span>
            </span>
          </small>
        </div>

        {/* 재료 */}
        <section className="mt-10" aria-labelledby="ingredients-heading">
          <div className="flex gap-2 mb-4 bg-brand  px-3 py-1.5 rounded-md items-center w-fit">
            <IngredientIcon />
            <span className="text-white text-sm lg:text-xl font-semibold">
              재료
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-2">
            {recipe?.ingredients?.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <span className="text-sm lg:text-lg text-gray-800 font-medium">
                  {item.ingredients_name}
                </span>
                <span className="text-sm lg:text-lg text-gray-500">
                  {item.ingredients_num}
                </span>
              </li>
            ))}
          </ul>
        </section>
        {/* 재료 */}
        <section className="mt-10" aria-labelledby="sauce-heading">
          <div className="flex gap-2 mb-4 bg-brand px-3 py-1.5 rounded-md items-center w-fit">
            <IngredientIcon />
            <span className="text-white text-sm lg:text-xl font-semibold">
              양념
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-2">
            {recipe?.sauce?.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <span className="text-sm lg:text-lg text-gray-800 font-medium">
                  {item.sauce_name}
                </span>
                <span className="text-sm lg:text-lg text-gray-500">
                  {item.quantity}
                </span>
              </li>
            ))}
          </ul>
        </section>
        {/* 조리 순서 */}
        <section className="mt-10" aria-labelledby="steps-heading">
          <div className="flex gap-2 mb-4 bg-brand px-3 py-1.5 rounded-md items-center w-fit">
            <CookingOrderIcon />
            <span className="text-white text-sm lg:text-xl font-semibold">
              조리순서
            </span>
          </div>

          {/* 모바일: 세로 스택 / 데스크탑: 가로 레이아웃 */}
          <div className="flex flex-col lg:flex-row lg:gap-4">
            <div className="w-full lg:w-1/2 lg:h-[500px] overflow-y-auto">
              <ol>
                {sortedCookingOrder.map((order, i) => (
                  <li
                    key={i}
                    className={`cursor-pointer p-3 border-b hover:bg-[#F5F5F5] ${
                      selectedStepIndex === i ? "bg-[#EAF6F2]" : ""
                    }`}
                    onClick={() => setSelectedStepIndex(i)}
                    aria-current={selectedStepIndex === i ? "step" : undefined}
                  >
                    <div className="font-bold text-base lg:text-lg">
                      Step {order.order}
                    </div>
                    <div className="text-sm lg:text-base">{order.content}</div>
                  </li>
                ))}
              </ol>
            </div>
            <figure className="w-full mt-4 lg:mt-0 h-[250px] lg:h-auto   overflow-hidden     lg:w-1/2 flex justify-center items-center border-1">
              {sortedCookingOrder?.[selectedStepIndex]?.img_path ? (
                <img
                  src={sortedCookingOrder[selectedStepIndex].img_path}
                  alt="조리 이미지"
                  className="w-full h-full  object-cover"
                />
              ) : (
                <div className="text-gray-500 text-sm">이미지가 없습니다</div>
              )}
            </figure>
          </div>
        </section>

        {/* 댓글 영역 */}
        <section
          className="mt-10 border-t pt-6"
          aria-labelledby="comments-heading"
        >
          <header className="flex flex-wrap gap-3 items-center text-base lg:text-2xl font-semibold mb-4">
            <span>요리후기</span>
            <span className="text-brand ">{commentList.length}</span>
            <span className="text-xs lg:text-base font-normal text-subText">
              소중한 레시피에 후기를 남겨주세요
            </span>
          </header>

          {/* 댓글 작성 */}
          <div className="bg-[#EAF6F2] border rounded-xl p-3 shadow-sm">
            <label className="sr-only" htmlFor="comment-input">
              댓글 입력
            </label>

            <textarea
              className="w-full rounded-lg text-sm lg:text-lg resize-none p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brandDark"
              placeholder="댓글을 남겨주세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={uploadComment}
                className="bg-brand hover:bg-brandDark text-white px-4 py-1.5 rounded-lg text-sm lg:text-base font-semibold transition-transform active:scale-95"
              >
                등록
              </button>
            </div>
          </div>
          <div aria-live="polite">
            {commentList.map((comment) => {
              const myId = me;
              const canDelete = String(myId) === String(comment.member_id);
              return (
                <article
                  key={comment.comment_id}
                  className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 mb-4 mt-4"
                  aria-labelledby={`cmt-${comment.comment_id}-author`}
                >
                  {/* 상단: 프로필, 닉네임, 날짜, 메뉴 버튼 */}
                  <header className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <CommentUserIcon className="w-8 h-8 lg:w-10 lg:h-10" />
                      <span className="text-lg font-semibold text-gray-800">
                        {comment.nick_name}
                      </span>
                      <time
                        className="text-base text-gray-400"
                        dateTime={comment?.data_created || undefined}
                        aria-label="작성일시"
                      >
                        {" "}
                        {comment.data_created
                          ? formatTimestamp(comment?.data_created)
                          : "날짜 없음"}
                      </time>
                    </div>
                    {canDelete && (
                      <div className="relative">
                        <button
                          type="button"
                          aria-haspopup="menu"
                          aria-expanded={commentIds === comment.comment_id}
                          aria-controls={`menu-${comment.comment_id}`}
                          aria-label={
                            commentIds === comment.comment_id
                              ? "메뉴 닫기"
                              : "메뉴 열기"
                          }
                          onClick={() => openMenuBar(comment.comment_id)}
                        >
                          {commentIds === comment.comment_id ? (
                            <XIcon />
                          ) : (
                            <DotMenuIcon />
                          )}
                        </button>
                        {commentIds === comment.comment_id && (
                          <div className="absolute right-0 top-8 w-28 bg-white border border-gray-300 rounded-lg shadow-md z-10">
                            <button
                              type="button"
                              role="menuitem"
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => deleteComment(comment.comment_id)}
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </header>

                  {/* 본문 */}
                  <div className="text-gray-700 text-lg">
                    {comment.comment_content}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </article>
      {isNoFolderModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="w-[90%] max-w-[420px] bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">스크랩 폴더가 없어요</h3>
            <p className="text-gray-600 mb-6">
              레시피를 스크랩하려면 먼저 폴더를 만들어야 해요.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsNoFolderModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={() => {
                  setIsNoFolderModalOpen(false);
                  navigate("/mypage");
                }}
                className="px-4 py-2 rounded-lg bg-brand text-white hover:bg-brandDark"
              >
                폴더 만들러 가기
              </button>
            </div>
          </div>
        </div>
      )}

      {isScrapModalOpen && (
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
                  className="flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer hover:bg-[#EAF6F2] transition"
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
    </main>
  );
};

export default RecipeDetailpage;
