import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
const MyCommentComponent = () => {
  const PAGE_SIZE = 12;
  const [page, setPage] = useState(0);

  const [comments, setComments] = useState({
    content: [],
    number: 0,
    size: PAGE_SIZE,
    has_next: false,
  });
  const currentPage = comments.number || 0;
  const hasNext = !!comments.has_next;

  const goPage = (next) => {
    if (next < 0) return;

    if (next > currentPage && !hasNext) return;
    fetchComment(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigate = useNavigate();
  const handleRecipeDetail = (recipe_id) => {
    navigate(`/recipes/${recipe_id}`, { state: { scrollToComment: true } });
  };
  const fetchComment = async (p = 0) => {
    try {
      const { data } = await axiosInstance.get("/member/comment", {
        params: { page: p, size: PAGE_SIZE },
        withCredentials: true,
      });

      const normalized = {
        content: Array.isArray(data.content) ? data.content : [],
        number: typeof data.number === "number" ? data.number : p,
        size: typeof data.size === "number" ? data.size : PAGE_SIZE,
        has_next: !!data.has_next,
      };
      setComments(normalized);
      console.log(comments);
    } catch (e) {
      console.error("fetchComment 오류", e);
    }
  };

  const getVisiblePages = (current, total) => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i);
    const start = Math.max(0, Math.min(current - 2, total - 5));
    return Array.from({ length: 5 }, (_, i) => start + i);
  };
  useEffect(() => {
    fetchComment(0);
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
        <div className="flex-1 min-w-0 flex flex-col lg:gap-2 text-lg lg:text-2xl font-semibold">
          <div> 나의 댓글 </div>{" "}
          <span className="text-sm lg:text-lg text-gray-400 font-medium">
            나의 댓글 활동을 확인해봐요!
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:mt-5 pb-24 lg:pb-0 px-3">
        {comments.content.map((comment) => (
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
              <div className="flex items-start gap-2 mb-2 text-sm text-gray-700">
                <span className="font-semibold min-w-[60px] max-w-[100px] truncate">
                  {comment.nick_name || "익명"}님
                </span>
                <span className="flex-1 overflow-hidden">
                  <span className="line-clamp-2 break-words">
                    💬 {comment.comment_content}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {comments.content.length > 0 && (
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

          <span className="px-3 h-9 inline-flex items-center rounded-lg border bg-brand text-white text-sm">
            {currentPage + 1}
          </span>

          <button
            onClick={() => goPage(currentPage + 1)}
            disabled={!hasNext}
            className="px-3 h-9 rounded-lg border text-sm disabled:opacity-40"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCommentComponent;
