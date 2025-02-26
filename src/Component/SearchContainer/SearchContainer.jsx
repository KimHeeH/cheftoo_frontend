import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import todaysIcon from "../img/Today’s.svg";
import recipeIcon from "../img/Recipe.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchContainer.style.css";
import { useNavigate } from "react-router-dom";
import searchIcon from "./icon/searchIcon.svg";
import userIcon from "./icon/user.svg";
const SearchContainer = () => {
  const navigate = useNavigate();
  const handleLoginPage = () => {
    navigate("/mypage");
  };
  return (
    <div className="container mt-16">
      <div className="">
        <div className="align-items-center">
          <div className="flex">
            <div className="flex w-[300px] ">
              <img
                className="w-[120px] mr-2"
                src={todaysIcon}
                alt="Today’s Icon"
              />
              <img className="w-[120px]" src={recipeIcon} alt="Recipe Icon" />
            </div>

            <div className="flex w-1/2 relative h-[50px] items-center ">
              <input
                className=" border border-[#808080] rounded-full w-full h-full pl-4 mr-4"
                placeholder="궁금한 레시피를 찾아보세요"
              />

              <img
                className="absolute transform-translate-y-1/2 right-8"
                width="20"
                src={searchIcon}
                alt="searchIcon"
              />
            </div>
            <div
              className="flex flex-row text-[#808080] cursor-pointer justify-end w-64"
              onClick={handleLoginPage}
            >
              <div>
                <img src={userIcon} alt="userIcon" />
              </div>
              <div>로그인 / 회원가입</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
