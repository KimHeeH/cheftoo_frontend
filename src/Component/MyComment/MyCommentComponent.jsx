import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const MyCommentComponent = () => {
  const [comments, setComments] = useState([]);

  const fetchComment = async () => {
    try {
      const response = await axiosInstance.get("/member/comment");
      setComments(response.data); // 댓글 리스트 저장
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
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">나의 댓글</h2>
      <div className="space-y-5">
        {comments.map((comment) => (
          <div
            key={comment.comment_id}
            className="border border-gray-200 p-4 rounded-xl shadow-sm hover:scale-105 transition-all duration-300 bg-white"
          >
            <div className="text-sm text-gray-500 mb-1">
              🗓 {formatTimestamp(comment.data_created)}
            </div>
            <div className="text-md text-gray-700 font-medium mb-1">
              🍴 {comment.nick_name || "레시피 제목 없음"}
            </div>
            <div className="text-base text-gray-900">
              💬 {comment.comment_content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCommentComponent;
