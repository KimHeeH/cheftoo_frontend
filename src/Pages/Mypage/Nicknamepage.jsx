import { useLocation } from "react-router-dom";
import todayIcon from "./img/Today.svg";
import recipeIcon from "./img/Recipe.svg";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Menubar from "../../Component/Menubar/Menubar";
const NicknamePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isNewUser = searchParams.get("isNewUser") === "true";

  console.log("닉네임 페이지 isNewUser:", isNewUser); // 👈 이거로 확인해봐!
  const insertNickname = () => {};
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
      <div className="flex flex-col justify-center items-center container">
        <div className="mt-8 font-bold text-center text-[#3B3A36] text-lg lg:text-md ">
          처음 방문해 주셨네요!
          <br />
          사용하실 닉네임을 입력해주세요.
        </div>
      </div>
      <div className="flex container lg:h-[45px] justify-center mt-5 mb-5 lg:mt-16">
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          className="border  border-gray-300 rounded-lg px-4 py-2 w-[500px] h-[100%] focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />{" "}
      </div>
      <div className="flex container justify-center">
        {" "}
        <div
          onClick={() => insertNickname()}
          className="w-1/3 h-[33px] font-bold text-lg lg:h-12 cursor-pointer flex justify-center items-center rounded-md lg:w-[160px] lg:mt-8 bg-orange-500  hover:bg-orange-600 text-white h-[58px]"
        >
          완료
        </div>
      </div>
    </div>
  );
};

export default NicknamePage;
