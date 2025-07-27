import { useLocation } from "react-router-dom";
import { useState } from "react";
import todayIcon from "../img/Today.svg";
import recipeIcon from "../img/Recipe.svg";
import SearchContainer from "../../../Component/SearchContainer/SearchContainer";
import Menubar from "../../../Component/Menubar/Menubar";
import axios from "axios";
import axiosInstance from "../../../api/axiosInstance";
import useNickname from "../../../hooks/useNickname";
import { useEffect } from "react";
// import { setNickname } from "../../../store/userSlice";
// import { useDispatch } from "react-redux";
import { useRecoilState } from "recoil";
import { nicknameState } from "../../../recoil/nicknameAtom";
const NicknamePage = () => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const searchParams = new URLSearchParams(location.search);
  const isNewUser = searchParams.get("isNewUser") === "true";
  const [nextNickname, setNextNickname] = useState("");
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const updateNickname = async (nickname) => {
    try {
      const res = await axiosInstance.put("/auth/nickname", null, {
        params: { nickname },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      alert("닉네임이 변경되었습니다.");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/auth/nickname`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log("닉네임 응답", response.data, typeof response.data);
      setNickname(response.data);
      console.log("setNickname 진행 후 nicknameState 값:", nickname);
      localStorage.setItem("nickname", response.data);
      console.log("nickname", nickname);
      // dispatch(setNickname(nickname));

      console.log("닉네임 변경 성공");
    } catch (err) {
      console.error("닉네임 변경 실패", err);
    }
  };
  useEffect(() => {
    if (!nextNickname && nickname) {
      setNextNickname(nickname);
    }
  }, [nickname]);

  return (
    <div>
      <div className="py-3 border-b border-gray-200 lg:border-0">
        <SearchContainer />
      </div>
      <Menubar />
      <div className="container flex flex-col items-center mt-44 lg:mt-16">
        <div className="flex gap-2">
          <div className="w-[100px] lg:w-[150px]">
            <img className="w-full" src={todayIcon} alt="Today" />
          </div>
          <div className="w-[100px] lg:w-[150px]">
            <img className="w-full" src={recipeIcon} alt="Recipe" />
          </div>
        </div>
      </div>

      {/* 로그인 입력 필드 */}
      <div className="flex  flex-col justify-center items-center container">
        <div className="mt-8 font-bold text-center text-[#3B3A36] text-lg lg:text-md ">
          변경할 닉네임을 입력해주세요{" "}
        </div>
      </div>
      <div className="flex  container lg:h-[49px] justify-center mt-5 mb-5 lg:mt-16">
        <input
          type="text"
          onChange={(e) => setNextNickname(e.target.value)}
          value={nextNickname}
          placeholder={nickname}
          className="border w-[700px] border-gray-300 rounded-lg px-4 py-2  h-[100%] focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-500 "
        />{" "}
      </div>
      <div className="flex container justify-center">
        {" "}
        <div
          // onClick={() => insertNickname(nickname)}
          className="w-1/3 h-[38px] lg:h-[40px] font-bold text-lg  cursor-pointer flex justify-center items-center rounded-md lg:w-[160px] lg:mt-8 bg-orange-500  hover:bg-orange-600 text-white "
          onClick={() => updateNickname(nextNickname)}
        >
          변경
        </div>
      </div>
    </div>
  );
};

export default NicknamePage;
