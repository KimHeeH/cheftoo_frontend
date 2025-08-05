import React, { useEffect } from "react";
import axios from "axios";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Menubar from "../../Component/Menubar/Menubar";
import useKakaoLogin from "../../hooks/useKakaoLogin";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RecipeCard from "../../Component/RecipeCard/RecipeCard";
import SearchIcon from "./img/SearchIconComponent.jsx";
import { motion } from "framer-motion";

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
      {/* 검색 + 결과 안내 */}
      <div className="font-pretendard">
        <div className="max-w-[1100px]  px-8 lg:p-20 mx-auto  mb-5 lg:h-[70px]">
          <div className="flex gap-2 lg:gap-4 mt-4 w-full lg:mt-0  h-[48px] lg:h-[70px] mb-8 ">
            {" "}
            <input
              className=" lg:text-xl  w-full rounded-l-[10rem] h-[48px] lg:h-full rounded-md bg-white pl-8 pr-12 text-base  border focus:ring-2 focus:ring-brand outline-none transition"
              placeholder="궁금한 레시피를 찾아보세요"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              onKeyDown={(e) => e.key === "Enter" && searchKeyword(keyword)}
            />
            <div
              onClick={() => searchKeyword(keyword)}
              className=" text-xs lg:text-xl cursor-pointer flex pl-4 lg:pl-8 gap-2 lg:gap-4 items-center relative rounded-r-[10rem] rounded-l-none w-[100px] lg:w-[150px] bg-brand text-white hover:scale-[1.05] "
            >
              {" "}
              검색
              <SearchIcon className=" absolute right-[10px] lg:right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition" />
            </div>
          </div>

          {keyword && (
            <div className="  mt-4 text-lg flex justify-between items-center mt-3 text-gray-600 text-base">
              <span>
                <span className=" font-semibold text-orange-600">
                  "{keyword}"
                </span>{" "}
                검색 결과
              </span>
              <button
                className=" text-gray-400 hover:text-gray-600 transition "
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
        <div>
          <div className="mx-auto max-w-[1700px] flex lg:pt-10 flex-col  justify-center w-full px-8 mb-28 ">
            {!keyword && (
              <div className="w-full flex justify-center  lg:text-2xl text-subText font-bold pb-4">
                찾으시는 레시피가 있으신가요?
              </div>
            )}
            <div></div>
            <div className="border-t pt-4 lg:px-8  grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10 w-full lg:max-w-[1700px]  lg:pb-[80px]">
              {displayData.length > 0 ? (
                displayData.map((recipe, i) => (
                  <motion.div
                    key={recipe.recipe_id}
                    className="w-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <RecipeCard recipe={recipe} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center text-gray-500 text-lg mt-10">
                  {isSearching
                    ? "검색 결과가 없습니다."
                    : "등록된 레시피가 없습니다."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipepage;
