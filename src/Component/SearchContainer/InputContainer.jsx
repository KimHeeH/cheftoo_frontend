import React from "react";
import searchIcon from "./icon/searchIcon.svg";
import { useState } from "react";
const InputContainer = () => {
  const [keyword, setKeyword] = useState("");
  console.log(keyword);
  return (
    <div className="w-full  absolute left-1/2 -translate-x-1/2  lg:w-[50%] px-2">
      <div className="relative h-[52px]">
        {" "}
        {/* 로그인 버튼 높이와 맞춤 */}
        <input
          className="w-full h-full  bg-[#F7F7F7] pl-4 pr-10 rounded-lg  text-sm"
          placeholder="궁금한 레시피를 찾아보세요"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        <img
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          src={searchIcon}
          width={20}
          alt="검색"
        />
      </div>
    </div>
  );
};

export default InputContainer;
