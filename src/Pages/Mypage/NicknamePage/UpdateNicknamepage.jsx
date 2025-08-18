import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const searchParams = new URLSearchParams(location.search);
  const isNewUser = searchParams.get("isNewUser") === "true";
  const [nextNickname, setNextNickname] = useState("");
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const goBackPage = () => {
    navigate(-1);
  };
  const updateNickname = async (nickname) => {
    try {
      const res = await axiosInstance.put("/member/nickname", null, {
        params: { nickname },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });
      alert("닉네임이 변경되었습니다.");
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/member/nickname`,
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
    <div className="font-pretendard">
      <div className="py-3 border-b border-gray-200 lg:border-0">
        <SearchContainer />
      </div>

      <div className="flex  flex-col justify-center items-center container">
        <div className="mt-8 font-semibold text-center text-[#3B3A36] text-lg lg:text-2xl ">
          변경할 닉네임을 입력해주세요{" "}
        </div>
      </div>
      <div className="flex  container lg:h-[49px] justify-center mt-5 mb-5 lg:mt-16">
        <input
          type="text"
          onChange={(e) => setNextNickname(e.target.value)}
          value={nextNickname}
          placeholder={nickname}
          className="border w-[700px] border-gray-300 rounded-xl px-4 py-2  h-[100%] focus:outline-none focus:ring-2 focus:ring-brand text-gray-500 "
        />{" "}
      </div>
      <div className="flex  justify-between max-w-[400px] mx-auto">
        <div
          // onClick={() => insertNickname(nickname)}
          className="w-1/3 h-10 lg:h-12 font-bold text-lg  cursor-pointer flex justify-center items-center rounded-md lg:w-40 lg:mt-8 bg-gray-100 hover:bg-gray-200 "
          onClick={() => goBackPage()}
        >
          나가기
        </div>{" "}
        <div
          // onClick={() => insertNickname(nickname)}
          className="w-1/3 h-10 lg:h-12 font-bold text-lg  cursor-pointer flex justify-center items-center rounded-md lg:w-40 lg:mt-8 bg-brand  hover:bg-brandDark text-white "
          onClick={() => updateNickname(nextNickname)}
        >
          변경
        </div>
      </div>
    </div>
  );
};

export default NicknamePage;
