import React, { useEffect } from "react";
import axios from "axios";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Menubar from "../../Component/Menubar/Menubar";
import RecipeAddpage from "./add/RecipeAddpage";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RecipeCard from "../../Component/RecipeCard/RecipeCard";
import InputContainer from "../../Component/SearchContainer/InputContainer";
import searchIcon from "./img/searchIcon.svg";
import { XIcon } from "../../Component/Menubar/Icon/Icon";
const Recipepage = () => {
  const navigate = useNavigate();
  const kakaoLoginHandler = useKakaoLogin("/recipe", "/add");
  const [isHovered, setIsHovered] = useState(false);
  const [recipeData, setRecipeData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  console.log(keyword);
  const handleClick = async () => {
    try {
      const status = await checkAuthGuard();
      if (status === 200) {
        navigate("/add");
      } else {
        alert("로그인이 필요합니다.");
        kakaoLoginHandler();
      }
    } catch (error) {
      console.error("인증 오류:", error);
      alert("로그인이 필요합니다.");
      kakaoLoginHandler();
    }
  };
  const getReipceData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/recipe`,
        {
          withCredentials: true,
        }
      );
      setRecipeData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("레시피 조회 오류");
    }
  };
  const displayData = isSearching
    ? searchData?.content || []
    : recipeData?.content || [];

  const searchKeyword = async (keyword) => {
    if (!keyword.trim()) {
      setIsSearching(false);
      setSearchData([]);
      return;
    }
    try {
      setIsSearching(true);

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/recipe`,
        {
          params: { keyword },
        }
      );
      console.log(response.data);
      setSearchData(response.data);
    } catch (err) {
      console.error("검색 실패", err);
    }
  };

  useEffect(() => {
    getReipceData();
  }, []);
  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };
  const onToggleClick = () => {
    setIsHovered(!isHovered);
  };

  useEffect(() => {
    if (keyword.trim() === "") {
      setIsSearching(false);
    }
  }, [keyword]);

  return (
    <div>
      <SearchContainer />
      <Menubar />
      <div className="relative w-full  lg:h-12 flex justify-end  items-center"></div>
      {/* 검색 + 결과 안내 */}
      <div className="w-full max-w-[900px] mx-auto px-8 mb-5">
        <div className="font-pretendard text-xl lg:text-2xl font-bold text-gray-800 mb-4">
          오늘의 <span className="font-pretendard text-brand">한 끼</span>, 뭐
          먹지?{" "}
        </div>
        <div className="relative">
          {" "}
          <input
            className=" font-pretendard w-full h-[48px] rounded-md bg-white pl-4 pr-12 text-base  border focus:ring-2 focus:ring-brand outline-none transition"
            placeholder="궁금한 레시피를 찾아보세요"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            onKeyDown={(e) => e.key === "Enter" && searchKeyword(keyword)}
          />
          <img
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition"
            src={searchIcon}
            width={20}
            alt="검색"
            onClick={() => searchKeyword(keyword)}
          />
        </div>

        {keyword && (
          <div className="mt-4 flex justify-between items-center mt-3 text-gray-600 text-base">
            <span>
              <span className="font-pretendard font-semibold text-orange-600">
                "{keyword}"
              </span>{" "}
              검색 결과
            </span>
            <button
              className="font-pretendard text-gray-400 hover:text-gray-600 transition text-sm"
              onClick={() => {
                setKeyword("");
                setIsSearching(false);
              }}
            >
              전체보기
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-center w-full px-4 mb-28">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 lg:gap-10 w-full lg:max-w-[900px]  lg:pb-[80px]">
          {displayData.length > 0 ? (
            displayData.map((recipe) => (
              <div key={recipe.recipe_id} className="w-full">
                <RecipeCard recipe={recipe} />
              </div>
            ))
          ) : (
            <div className="font-pretendard col-span-2 text-center text-gray-500 text-lg mt-10">
              {isSearching
                ? "검색 결과가 없습니다."
                : "등록된 레시피가 없습니다."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipepage;
