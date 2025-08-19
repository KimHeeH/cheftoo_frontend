import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
const MyCommentComponent = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const handleRecipeDetail = (recipe_id) => {
    navigate(`/recipes/${recipe_id}`, { state: { scrollToComment: true } });
  };
  const fetchComment = async () => {
    try {
      const response = await axiosInstance.get("/member/comment");
      setComments(response.data);

      console.log(response.data.content);
    } catch (error) {
      console.error("fetchComment 오류", error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const formatTimestamp = (timestamp) => {
    const [datePart, timePart] = timestamp.split(" ");
    const [year, month, day] = datePart.split("-").map((v) => parseInt(v, 10));
    const [hours, minutes] = timePart.split(":").map((v) => parseInt(v, 10));

    return `${String(year).padStart(2, "0")}/${String(month).padStart(
      2,
      "0"
    )}/${String(day).padStart(2, "0")} ${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}`;
  };

  return (
    <div className="  font-pretendard">
      <div className="flex items-start">
        {" "}
        <div className="flex-1 min-w-0 flex flex-col gap-2 text-lg lg:text-2xl font-semibold">
          <div> 나의 댓글 </div>{" "}
          <span className="text-sm lg:text-lg text-gray-400 font-medium">
            나의 댓글 활동을 확인해봐요!
          </span>
        </div>
        <div className="shrink-0 ml-auto">
          <div className="flex justify-center items-center border rounded-xl w-20 lg:w-28 text-white bg-brand hover:bg-brandDark cursor-pointer text-sm lg:text-base font-medium h-12">
            삭제{" "}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:mt-5 pb-24 lg:pb-0 px-3">
        {comments.map((comment) => (
          <div
            key={comment.comment_id}
            onClick={() => handleRecipeDetail(comment.recipe_id)}
            className="cursor-pointer mt-8 lg:mt-0 flex flex-col border border-gray-200 rounded-xl shadow-sm hover:scale-105 transition-all duration-300 bg-white overflow-hidden"
          >
            <img
              src={comment.img_path}
              alt={comment.recipe_title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="px-4 pt-3 text-lg font-bold text-gray-900 truncate">
              {comment.recipe_title}
            </div>
            <div className="px-4 flex flex-col gap-1">
              <div className="text-sm text-gray-500">
                🗓 {formatTimestamp(comment.data_created)}
              </div>
              <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                <span className="font-semibold">
                  {comment.nick_name || "익명"}님
                </span>
                <span>💬 {comment.comment_content}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCommentComponent;
