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
const RecipeDetailpage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [bookmark, setBookmark] = useState(false);
  const navigate = useNavigate();

  console.log("recipeId:", recipeId); // null이면 문제가 있음
  console.log("recipeId Type:", typeof recipeId);
  console.log("이미지 경로:", recipe?.images?.img_path);
  const commentList = [
    {
      comment_id: "6f9619ff-8b86-d011-b42d-00cf4fc964ff", // 16바이트 UUID (hex string)
      member_id: "8c4cb86e-4f4d-43fd-95fa-93f0adfb56c9", // 작성자 ID
      recipe_id: "1a79a4d6-5f9d-11ec-bf63-0242ac130002", // 댓글 단 레시피 ID
      comment_content: "이 레시피 진짜 맛있어요!", // 댓글 내용
      data_created: "2025-05-28T15:00:00Z", // 생성일 (ISO 8601)
      data_updated: "2025-05-28T15:00:00Z", // 수정일 (ISO 8601)
    },
    {
      comment_id: "7e0578cf-0e9d-4f3f-bc14-926d3dc042fe",
      member_id: "17f38d1c-b83b-4f7a-b179-7f5d47bb6f24",
      recipe_id: "1a79a4d6-5f9d-11ec-bf63-0242ac130002",
      comment_content: "간단해서 따라 하기 좋았어요~",
      data_created: "2025-05-28T16:10:00Z",
      data_updated: "2025-05-28T16:10:00Z",
    },
    {
      comment_id: "6f9619ff-8b86-d011-b42d-00cf4fc964ff", // 16바이트 UUID (hex string)
      member_id: "8c4cb86e-4f4d-43fd-95fa-93f0adfb56c9", // 작성자 ID
      recipe_id: "1a79a4d6-5f9d-11ec-bf63-0242ac130002", // 댓글 단 레시피 ID
      comment_content: "이 레시피 진짜 맛있어요!", // 댓글 내용
      data_created: "2025-05-28T15:00:00Z", // 생성일 (ISO 8601)
      data_updated: "2025-05-28T15:00:00Z", // 수정일 (ISO 8601)
    },
    {
      comment_id: "7e0578cf-0e9d-4f3f-bc14-926d3dc042fe",
      member_id: "17f38d1c-b83b-4f7a-b179-7f5d47bb6f24",
      recipe_id: "1a79a4d6-5f9d-11ec-bf63-0242ac130002",
      comment_content: "간단해서 따라 하기 좋았어요~",
      data_created: "2025-05-28T16:10:00Z",
      data_updated: "2025-05-28T16:10:00Z",
    },
  ];
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

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="w-full p-3 ">
      <div className="container mt-4 mb-4 ml-2    ">
        {/* ← 뒤로가기 아이콘 */}
        <div className="cursor-pointer mt-2" onClick={handleBackNavigate}>
          <BackIcon />
        </div>
      </div>
      <div className="w-full container flex justify-center max-w-[900px] px-4">
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
            <div className="flex gap-3">
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
          <div className="mt-12">
            <div className="flex gap-3">
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
                  <div className="font-gowun flex flex-col lg:flex-row gap-4">
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
            <div className=" flex lg:flex-row flex-col gap-3 lg:items-center">
              <div className="font-gowun  text-sm lg:text-2xl flex items-center gap-3">
                <CommentIcon /> 요리후기 ({commentList.length})
              </div>
              <div className="font-gowun text-md lg:text-xl">
                소중한 레시피에 후기를 남겨주세요
              </div>
            </div>
            <div className="mt-3">
              <div className="flex flex-col gap-3  ">
                {commentList.map((comment) => (
                  <div className="border-b pb-3">
                    {" "}
                    <div key={comment.comment_id} className="mt-2 flex gap-3">
                      <div>
                        <CommentProfileIcon />
                      </div>
                      <div className="lg:text-2xl font-gowun text-[#919191]">
                        {comment.member_id}
                      </div>
                      <div>|</div>
                      <div className="text-[#919191] lg:text-lg">
                        {formatTimestamp(comment.data_created)}
                      </div>
                    </div>
                    <div className="lg:text-2xl font-gowun mt-4">
                      {comment.comment_content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailpage;
