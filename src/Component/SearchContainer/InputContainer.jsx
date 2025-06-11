import React from "react";
import searchIcon from "./icon/searchIcon.svg";
const InputContainer = () => {
  return (
    <div className="w-full  absolute left-1/2 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 lg:w-[40%]">
      <div className="relative h-12">
        {" "}
        {/* 로그인 버튼 높이와 맞춤 */}
        <input
          className="w-full h-full pl-4 pr-10 rounded-full border border-gray-400 text-sm"
          placeholder="오늘의 레시피 검색"
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
