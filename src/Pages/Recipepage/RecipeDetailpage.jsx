import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackIcon, FolderNameIcon } from "../../Component/Menubar/Icon/Icon";
import img from "./img/pasta.jpg";
import {
  BigBookmarkIcon,
  CommentIcon,
  CommentProfileIcon,
  CookingOrderIcon,
  IngredientIcon,
  SelectedBigBookmarkIcon,
} from "../../Component/Menubar/Icon/Icon";
import { RecipeDetailProfileIcon } from "../../Component/Menubar/Icon/Icon";
import { DotMenuIcon } from "../../Component/Menubar/Icon/Icon";
import { XIcon } from "../../Component/Menubar/Icon/Icon";
const RecipeDetailpage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [bookmark, setBookmark] = useState(false);
  const [commentIds, setCommnetIds] = useState("");
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [isScrapModalOpen, setIsScrapModalOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [folders, setFolders] = useState([]);
  const [scrapList, setScrapList] = useState([]);
  const navigate = useNavigate();

  const openMenuBar = (commentId) => {
    setCommnetIds((prev) => (prev === commentId ? null : commentId));
    console.log("openMenu 상태", openMenu);
    setOpenMenu(!openMenu);
  };
  const closeModal = () => {
    setIsScrapModalOpen(false);
  };
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0~11이라 +1)
    const day = String(date.getDate()).padStart(2, "0"); // 일
    const hours = String(date.getHours()).padStart(2, "0"); // 시
    const minutes = String(date.getMinutes()).padStart(2, "0"); // 분

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
      const response = await axios.post(
        `http://localhost:8080/recipe/${recipeId}/comment`,
        { commentContent: comment },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }, // 추가!
        }
      );
      console.log(response.data);
      setComment([]);
      alert("댓글이 등록되었습니다");
    } catch (error) {
      console.error("uploadComment Fail", error);
    }
  };
  const handleScrapToFolder = async (scrapId) => {
    try {
      console.log(scrapId);
      await axios.post(
        "http://localhost:8080/member/scrap/recipe",
        {
          scrapId: scrapId,
          recipeId: recipe.recipeId,
        },
        { withCredentials: true }
      );
      alert("스크랩 완료!");
      setIsScrapModalOpen(false);
    } catch (error) {
      console.error("스크랩 실패", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/recipe/comment/${commentId}`,
        { withCredentials: true }
      );
      alert("댓글이 삭제되었습니다");
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
          { withCredentials: true }
        );
        console.log(response.data);
        setRecipe(response.data);
      } catch (error) {
        console.error("레시피 가져오기 실패", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);
  useEffect(() => {
    const fetchCommnet = async () => {
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
    fetchCommnet();
  }, [commentList]);
  useEffect(() => {
    const fetchRecipeScrap = async () => {
      try {
        const response = await axios.get("http://localhost:8080/member/scrap", {
          withCredentials: true,
        });
        const mappedFolders = response.data.map((folder, index) => ({
          ...folder,
          scrap_name: folder.scrap_name,
          scrap_id: folder.scrap_id,
          index: index + 1,
        }));
        setFolders(mappedFolders);
        console.log(mappedFolders);
        // console.log(response.data);
      } catch (error) {
        console.error("fetchRecipeScrap Error", error);
      }
    };
    fetchRecipeScrap();
  }, []);

  useEffect(() => {
    const fetchScrap = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/member/scrap/recipe",
          { withCredentials: true }
        );
        console.log(response.data);
      } catch (error) {
        console.error("스크랩 레시피 오류", error);
      }
    };
    fetchScrap();
  }, []);
  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="w-full p-3 ">
      <div className="container mt-4 mb-4 ml-2    ">
        {/* ← 뒤로가기 아이콘 */}
        <div className="cursor-pointer mt-2" onClick={handleBackNavigate}>
          <BackIcon />
        </div>
      </div>
      <div className="w-full max-w-full px-4 lg:max-w-[900px] mx-auto">
        {/* 실제 콘텐츠 */}
        <div>
          <div className=" mb-6 flex w-full">
            <div className=" w-1/2 mt-3 h-[300px] lg:h-[500px] border-1">
              <img
                src={img}
                // src={recipe.images?.img_path
                //   ?.replace("C:/main_images", "http://localhost:8080/images")
                //   .replaceAll("\\", "/")}
                alt="대표 이미지"
                className="w-full  h-[300px] lg:h-[500px] max-h-[500px] object-cover rounded-xl border"
              />
            </div>{" "}
            <div className="w-1/2 relative">
              <div className="w-full ml-4 mt-3 relative">
                <div
                  className="w-2/3 pl-2
            text-xl lg:text-3xl  pb-3 border-b border-gray-300"
                >
                  {recipe.recipe_title}
                  <div
                    className={`absolute  right-[-15px]  top-1/3 lg:right-0 lg:top-0 w-12 h-16 lg:w-16 lg:h-20 border rounded-lg flex justify-center items-center cursor-pointer
              transition-transform duration-150 active: active:scale-90 hover:shadow-md
                            ${
                              bookmark
                                ? "bg-[#FDFDFD]"
                                : "bg-white border-gray-300"
                            }`}
                    onClick={() => handleActiveBookmark(recipe.recipeId)}
                  >
                    {bookmark ? (
                      <SelectedBigBookmarkIcon />
                    ) : (
                      <BigBookmarkIcon />
                    )}
                  </div>
                </div>
                {/* 내용 */}
                <div className="mt-12 text-sm lg:text-2xl ">
                  <p>{recipe.recipe_content}</p>
                </div>
              </div>
              <div className="flex ml-4 absolute bottom-0 text-xl">
                <p className="font-semibold text-xl ml-2">
                  댓글 {commentList.length}
                </p>
                <p className="font-semibold text-xl ml-2">
                  북마크 {commentList.length}
                </p>
              </div>
            </div>
            {/* 제목+내용+아이콘 감싸는 박스 */}
            {/* 제목 */}
            {/* 북마크 아이콘 */}
          </div>

          {/* 재료 */}
          <div className="mt-12">
            <div className="flex gap-3 mb-12">
              <div>
                <IngredientIcon />
              </div>
              <div className=" text-xl lg:text-2xl text-[#3B3A36]">재료</div>
            </div>
            <div className=" mt-4 border-t border-black  text-lg lg:text-xl bg-[#FDFDFD]">
              <div className="flex items-center h-12 lg:h-16 border-b border-gray-300">
                <div className="w-1/2 flex justify-center">
                  {recipe?.ingredients?.ingredients_name}
                </div>
                <div className="w-1/2 flex justify-center">
                  {recipe?.ingredients?.ingredients_num}
                </div>
              </div>
            </div>
          </div>

          {/* 조리 순서 */}
          <div className="mt-12 ">
            <div className="flex gap-3 mb-12">
              <div>
                <CookingOrderIcon />
              </div>
              <div className="text-xl lg:text-2xl  text-[#3B3A36]">
                조리순서
              </div>
            </div>
            <div>
              {" "}
              {recipe?.cooking_order
                ?.slice()
                .reverse()
                .map((order, i) => (
                  <div
                    key={i}
                    className="w-1/2 m-2 mt-4 bg-[#FBFBFB] p-4 border rounded-lg"
                  >
                    <div className=" flex flex-col lg:flex-row gap-2 lg:gap-4">
                      <div className="w-1/5 text-base lg:text-xl font-bold">
                        Step {order.order}
                      </div>
                      <div className="text-base lg:text-lg w-full">
                        {order.content}
                      </div>
                      {/* {order.img_path && (
                        <img
                          src={order.img_path
                            ?.replace(
                              "C:/main_images",
                              "http://localhost:8080/images"
                            )
                            .replaceAll("\\", "/")}
                          className="w-full lg:w-[200px] h-[150px] object-cover rounded border"
                        />
                      )} */}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-12 border-t border-1-[#919191] pt-8">
            <div className="flex lg:flex-row flex-col gap-3 lg:items-center">
              <div className=" text-xl lg:text-2xl flex items-center gap-3">
                <div>
                  <CommentIcon />
                </div>
                <div>요리후기</div>{" "}
                <div className="text-orange-500 font-semibold">
                  {commentList.length}
                </div>
              </div>
              <div className=" text-lg lg:text-xl">
                소중한 레시피에 후기를 남겨주세요
              </div>
            </div>
            <div className="mt-1 lg:mt-16">
              <div className="flex flex-col gap-3  ">
                <div className="flex gap-4 lg:gap-0 min-h-[40px] mt-8 lg:w-[900px] lg:min-h-[100px] ">
                  <textarea
                    className="w-full rounded-xl min-h-[30px] lg:min-h-[100px] lg:text-xl resize-none p-4  bg-[#FDFDFD] border-1"
                    placeholder="댓글을 남겨주세요"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div
                    className="rounded-xl text-base lg:text-xl w-24 lg:w-[200px] lg:min-h-[100px] flex items-center   border-1 bg-[#FDFDFD] justify-center cursor-pointer"
                    onClick={() => uploadComment()}
                  >
                    등록
                  </div>
                </div>
                {commentList.map((comment, key) => (
                  <div
                    className="flex flex-col  border-b  pt-4 pb-4 bg-[#fcfcfc]; rounded-lg  m-[10px]"
                    key={comment.comment_id}
                  >
                    <div className="flex items-center mb-3   ">
                      <div className="">
                        <RecipeDetailProfileIcon />
                      </div>
                      <div className=" ml-4 mr-1 lg:mr-4 text-sm lg:text-xl min-w-[80px]">
                        {comment.nick_name}
                      </div>
                      <div className="mr-1 lg:mr-4 text-[#919191]"> | </div>
                      <div className="text-sm  lg:text-base text-[#919191] min-w-[200px]">
                        {" "}
                        {comment.data_created
                          ? comment.data_created
                          : "25.05.22.16:40"}
                      </div>
                      <div className="w-full">
                        <div
                          className="relative flex justify-end w-full cursor-pointer "
                          onClick={() => openMenuBar(comment.comment_id)}
                        >
                          <div className="absolute right-5  z-50 ">
                            {commentIds === comment.comment_id ? (
                              <XIcon />
                            ) : (
                              <DotMenuIcon />
                            )}
                          </div>

                          {commentIds === comment.comment_id && (
                            <div className="right-5  absolute flex flex-col bg-[#FEFEFE] border-1 w-28 lg:w-48 h-20 mr-8 pl-2">
                              <div
                                className="flex-1 flex items-center h-1/2 border-b"
                                onClick={() =>
                                  deleteComment(comment.comment_id)
                                }
                              >
                                삭제
                              </div>
                              <div className="flex-1 flex items-center h-1/2">
                                수정
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className=" text-lg lg:text-xl">
                      {comment.comment_content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isScrapModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center ">
          <div className="w-[500px] bg-white p-6 rounded-2xl">
            <div className="flex justify-between items-center h-8 mb-8 ">
              {" "}
              <div className="text-xl h-full">폴더 선택</div>
              <div
                onClick={() => closeModal()}
                className="cursor-pointer h-full"
              >
                <XIcon />
              </div>
            </div>

            {folders.map((folder) => (
              <div className="flex gap-3 items-center mt-3 h-14 border-b cursor-pointer focus:shadow-lg transition-transform duration-150 active: active:scale-90 hover:shadow-md p-4 ">
                <div>
                  <FolderNameIcon fill="#FA590F" />
                </div>
                <button
                  className="flex text-xl"
                  key={folder.scrap_id}
                  onClick={() => handleScrapToFolder(folder.scrap_id)}
                >
                  {folder.scrap_name}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailpage;
