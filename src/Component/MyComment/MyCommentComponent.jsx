import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
const MyCommentComponent = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const handleRecipeDetail = (recipe_id) => {
    navigate(`/recipes/${recipe_id}`);
  };
  const fetchComment = async () => {
    try {
      const response = await axiosInstance.get("/member/comment");
      setComments(response.data);

      console.log(response.data);
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
    <div className="max-w-[700px] mx-auto px-4 py-6 font-pretendard">
      <h2 className="  text-2xl font-semibold mb-6 text-gray-800">나의 댓글</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {comments.map((comment) => (
          <div
            key={comment.comment_id}
            onClick={() => handleRecipeDetail(comment.recipe_id)}
            className="cursor-pointer flex flex-col border border-gray-200 rounded-xl shadow-sm hover:scale-105 transition-all duration-300 bg-white overflow-hidden"
          >
            <img
              src={comment.img_path}
              alt={comment.recipe_title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="px-4 pt-3 text-lg font-bold text-gray-900 truncate">
              {comment.recipe_title}
            </div>
            <div className="p-4 flex flex-col gap-1">
              <div className="text-sm text-gray-500">
                🗓 {formatTimestamp(comment.data_created)}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
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
