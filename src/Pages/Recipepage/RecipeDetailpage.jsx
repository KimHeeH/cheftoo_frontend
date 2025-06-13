import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackIcon } from "../../Component/Icon/Icon";
import img from "./img/pasta.jpg";
import {
  BigBookmarkIcon,
  CommentIcon,
  CommentProfileIcon,
  CookingOrderIcon,
  IngredientIcon,
  SelectedBigBookmarkIcon,
} from "../../Component/Menubar/Icon/Icon";
import { RecipeDetailProfileIcon } from "../../Component/Icon/Icon";
import { DotMenuIcon } from "../../Component/Menubar/Icon/Icon";
import { XIcon } from "../../Component/Menubar/Icon/Icon";
const RecipeDetailpage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [bookmark, setBookmark] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const openMenuBar = () => {
    console.log("openMenu 상태", openMenu);
    setOpenMenu(!openMenu);
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
  const handleActiveBookmark = () => {
    setBookmark(!bookmark);
    console.log("bookmark상태 값", bookmark);
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
  useEffect(() => {
    if (!recipeId) return;

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/recipes/${recipeId}`,
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
          <div className="relative mb-6">
            {" "}
            {/* 제목+내용+아이콘 감싸는 박스 */}
            {/* 제목 */}
            <div
              className="w-5/6 
            font-gowun text-xl lg:text-3xl border-b border-[#DCDCDC] pb-3"
            >
              {recipe.recipe_title}
            </div>
            {/* 내용 */}
            <div className="font-gowun mt-3 text-base lg:text-2xl w-4/5">
              <p>{recipe.recipe_content}</p>
            </div>
            {/* 북마크 아이콘 */}
            <div
              className={`absolute  right-[-15px]  top-1/3 lg:right-0 lg:top-1/2 -translate-y-1/2 w-12 h-16 lg:w-16 lg:h-19 border rounded-lg flex justify-center items-center cursor-pointer
              transition-transform duration-150 active: active:scale-90 hover:shadow-md
                            ${
                              bookmark
                                ? "bg-[#FDFDFD]"
                                : "bg-white border-gray-300"
                            }`}
              onClick={handleActiveBookmark}
            >
              {bookmark ? <SelectedBigBookmarkIcon /> : <BigBookmarkIcon />}
            </div>
          </div>

          <div className="mt-3 h-[300px] lg:h-[500px] border-1">
            <img
              src={img}
              // src={recipe.images?.img_path
              //   ?.replace("C:/main_images", "http://localhost:8080/images")
              //   .replaceAll("\\", "/")}
              alt="대표 이미지"
              className="w-full  h-[300px] lg:h-[500px] max-h-[500px] object-cover rounded-xl border"
            />
          </div>

          {/* 재료 */}
          <div className="mt-12">
            <div className="flex gap-3 mb-12mb-12">
              <div>
                <IngredientIcon />
              </div>
              <div className="font-gowun text-xl lg:text-2xl text-[#3B3A36]">
                재료
              </div>
            </div>
            <div className="font-gowun mt-4 border-t border-black  text-lg lg:text-xl bg-[#FDFDFD]">
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
              <div className="text-xl lg:text-2xl font-gowun text-[#3B3A36]">
                조리순서
              </div>
            </div>
            {recipe?.cooking_order
              ?.slice()
              .reverse()
              .map((order, i) => (
                <div
                  key={i}
                  className="m-2 mt-4 bg-[#FBFBFB] p-4 border rounded-lg"
                >
                  <div className="font-gowun flex flex-col lg:flex-row gap-2 lg:gap-4">
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
          <div className="mt-12 border-t border-1-[#919191] pt-8">
            <div className="mb-4 lg:mb-12 flex lg:flex-row flex-col gap-3 lg:items-center">
              <div className="font-gowun  text-xl lg:text-2xl flex items-center gap-3">
                <CommentIcon /> 요리후기 ({commentList.length})
              </div>
              <div className="font-gowun text-lg lg:text-xl">
                소중한 레시피에 후기를 남겨주세요
              </div>
            </div>
            <div className="mt-3 lg:mt-16">
              <div className="flex flex-col gap-3  ">
                {/* {commentList.map((comment) => (
                  <div className="border-b  pb-3 h-24 lg:h-32">
                    {" "}
                    <div key={comment.comment_id} className=" mt-2 flex gap-3">
                      <div>
                        <CommentProfileIcon />
                      </div>
                      <div className="text-xs lg:text-2xl font-gowun text-[#919191]">
                        {comment.member_id}
                      </div>
                      <div>|</div>
                      <div className="text-[#919191] text-xs lg:text-lg">
                        {formatTimestamp(comment.data_created)}
                      </div>
                    </div>
                    <div className="lg:text-2xl font-gowun mt-2">
                      {comment.comment_content}
                    </div>
                  </div>
                ))} */}
                {commentList.map((comment, key) => (
                  <div
                    className="flex flex-col  border-b  pt-8 pb-8 bg-[#fcfcfc]; rounded-lg  m-[20px]"
                    key={comment.comment_id}
                  >
                    <div className="flex items-center mb-3   ">
                      <div className="">
                        <RecipeDetailProfileIcon />
                      </div>
                      <div className="font-gowun ml-4 mr-4 text-xl min-w-[120px]">
                        {comment.nick_name}
                      </div>
                      <div className="mr-4 text-[#919191]"> | </div>
                      <div className="text-[#919191] min-w-[200px]">
                        {" "}
                        {comment.data_created
                          ? comment.data_created
                          : "25.05.22.16:40"}
                      </div>
                      <div className="w-full">
                        <div
                          className="relative flex justify-end w-full cursor-pointer "
                          onClick={openMenuBar}
                        >
                          <div className=" z-50 ">
                            {openMenu ? <XIcon /> : <DotMenuIcon />}
                          </div>

                          {openMenu && (
                            <div className="right-0 absolute flex flex-col bg-[#FEFEFE] border-1 w-48 h-20 mr-8 pl-2">
                              <div className="flex-1 flex items-center h-1/2 border-b">
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
                    <div className="font-gowun text-lg lg:text-xl">
                      {comment.comment_content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4 lg:gap-0 min-h-[40px] mt-8 lg:w-[900px] lg:min-h-[200px] ">
              <textarea
                className="w-full min-h-[30px] lg:min-h-[200px] lg:text-xl resize-none p-4  bg-[#FDFDFD] border-1"
                placeholder="댓글을 남겨주세요"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div
                className=" text-base lg:text-xl w-24 lg:w-[200px] lg:min-h-[200px] flex items-center   border-1 bg-[#FDFDFD] justify-center cursor-pointer"
                onClick={() => uploadComment()}
              >
                등록
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailpage;
