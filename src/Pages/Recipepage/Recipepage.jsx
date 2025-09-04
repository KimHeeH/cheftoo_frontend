import React, { useEffect } from "react";
import axios from "axios";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Menubar from "../../Component/Menubar/Menubar";
import { useState } from "react";
import RecipeCard from "../../Component/RecipeCard/RecipeCard";
import SearchIcon from "./img/SearchIconComponent.jsx";
import { motion } from "framer-motion";

const Recipepage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const PAGE_SIZE = 12;
  const [page, setPage] = useState(0);
  const [recipeData, setRecipeData] = useState({
    content: [],
    total_pages: 0,
    number: 0,
  });
  const [searchData, setSearchData] = useState({
    content: [],
    total_pages: 0,
    number: 0,
  });
  const meta = isSearching ? searchData : recipeData;

  const displayData = meta?.content || [];
  const currentPage = meta?.number ?? 0;

  const totalPages = meta?.total_pages ?? 0;

  useEffect(() => {
    getReipceData(0);
  }, []);
  useEffect(() => {
    if (keyword.trim() === "") {
      setIsSearching(false);
    }
  }, [keyword]);
  /*<전체 레시피 조회 >*/
  const getReipceData = async (p = 0) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/recipe`,
        { params: { page: p, size: PAGE_SIZE }, withCredentials: true }
      );
      setRecipeData(response.data);
      setPage(p);

      console.log(response.data);
    } catch (error) {
      console.error("레시피 조회 오류");
    }
  };

  /*<검색 버튼 눌렀을때 >*/
  const searchKeyword = async (keyword, p = 0) => {
    if (!keyword.trim()) {
      setIsSearching(false);
      setSearchData({ content: [], total_pages: 0, number: 0 });
      return getReipceData(0);
    }
    try {
      setIsSearching(true);

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/recipe`,
        {
          params: { keyword: keyword, page: p, size: PAGE_SIZE },
        }
      );
      console.log(response.data);
      setIsSearching(true);
      setSearchData(response.data);
      setPage(p);
    } catch (err) {
      console.error("검색 실패", err);
    }
  };

  const goPage = (next) => {
    if (next < 0 || next >= totalPages) return;
    if (isSearching) searchKeyword(keyword, next);
    else getReipceData(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getVisiblePages = (current, total) => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i);
    const start = Math.max(0, Math.min(current - 2, total - 5));
    return Array.from({ length: 5 }, (_, i) => start + i);
  };

  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };
  const onToggleClick = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div>
      <SearchContainer />
      <Menubar />
      {/* 검색 + 결과 안내 */}
      <div className="font-pretendard">
        <div className="max-w-[1100px]  px-8 lg:p-20 mx-auto  mb-5 lg:h-[70px]">
          <div className="flex gap-2 lg:gap-4 mt-4 w-full lg:mt-0  h-[48px] lg:h-[70px] mb-8 ">
            {" "}
            <input
              className=" text-sm lg:text-xl  w-full rounded-l-[10rem] h-[48px] lg:h-full rounded-md bg-white pl-8 pr-12 text-base  border focus:ring-2 focus:ring-brand outline-none transition"
              placeholder="궁금한 레시피를 찾아보세요"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              onKeyDown={(e) => e.key === "Enter" && searchKeyword(keyword, 0)}
            />
            <div
              onClick={() => searchKeyword(keyword, 0)}
              className="transition-all duration-300 text-xs lg:text-xl cursor-pointer flex pl-4 lg:pl-8 gap-2 lg:gap-4 items-center relative rounded-r-[10rem] rounded-l-none w-[100px] lg:w-[150px] bg-brand text-white hover:scale-[1.05] "
            >
              {" "}
              검색
              <SearchIcon className=" absolute right-[10px] lg:right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition" />
            </div>
          </div>

          {keyword && (
            <div className="  mt-4 text-lg flex justify-between items-center mt-3 text-gray-600 text-base  ">
              <span>
                <span className=" font-semibold text-orange-600">
                  "{keyword}"
                </span>{" "}
                검색 결과
              </span>
              <button
                className=" text-gray-400 hover:text-gray-600 transition "
                onClick={async () => {
                  setKeyword("");
                  setIsSearching(false);
                  await getReipceData(0);
                }}
              >
                전체보기
              </button>
            </div>
          )}
        </div>
        <div>
          <div className="mx-auto max-w-[1700px] flex lg:pt-16 flex-col  justify-center w-full px-8 ">
            {!keyword && (
              <div className="w-full flex justify-center  lg:text-2xl text-subText font-bold pb-4">
                찾으시는 레시피가 있으신가요?
              </div>
            )}
            <div className="border-t lg:pt-8 pt-4 lg:px-8 grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10 w-full lg:max-w-[1700px]  lg:pb-[20px]">
              {displayData.length > 0 ? (
                displayData.map((recipe, i) => (
                  <motion.div
                    key={recipe.recipe_id}
                    className="w-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    // viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    {" "}
                    <RecipeCard recipe={recipe} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center py-16 md:py-24">
                  <p className="text-gray-500 text-lg">
                    {isSearching
                      ? "검색 결과가 없습니다."
                      : "등록된 레시피가 없습니다."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {totalPages >= 1 && (
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

          {getVisiblePages(currentPage, totalPages).map((p) => (
            <button
              key={p}
              onClick={() => goPage(p)}
              className={`px-3 h-9 rounded-lg border text-sm ${
                p === currentPage
                  ? "bg-brand text-white border-brand"
                  : "hover:bg-gray-50"
              }`}
            >
              {p + 1}
            </button>
          ))}

          <button
            onClick={() => goPage(currentPage + 1)}
            disabled={currentPage + 1 >= totalPages}
            className="px-3 h-9 rounded-lg border text-sm disabled:opacity-40"
          >
            다음
          </button>
          <button
            onClick={() => goPage(totalPages - 1)}
            disabled={currentPage + 1 >= totalPages}
            className="px-3 h-9 rounded-lg border text-sm disabled:opacity-40"
          >
            마지막
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipepage;
