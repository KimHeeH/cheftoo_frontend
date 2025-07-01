import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Scrappage from "./Pages/Scrappage/Scrappage";
import Searchpage from "./Pages/Searchpage/Searchpage";
import Mypage from "./Pages/Mypage/Mypage";
import Recipepage from "./Pages/Recipepage/Recipepage";
import RecipeAddpage from "./Pages/Recipepage/add/RecipeAddpage";
import KakaoRedirect from "./Pages/Mypage/KakaoRedirect";
import Nicknamepage from "./Pages/Mypage/Nicknamepage";
import RecipeDetailpage from "./Pages/Recipepage/RecipeDetailpage";
import UpdateNicknamepage from "./Pages/Mypage/NicknamePage/UpdateNicknamepage";
import MyRecipepage from "./Pages/Mypage/MyRecipepage/MyRecipepage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setNickname } from "./store/userSlice";
import ScrapFolderDetail from "./Pages/Scrappage/ScrapFolderDetail";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const res = await axios.get("http://localhost:8080/auth/nickname", {
          withCredentials: true,
        });
        dispatch(setNickname(res.data)); // Redux에 저장
        console.log(res.data);
      } catch (err) {
        console.error("닉네임 가져오기 실패", err);
      }
    };

    fetchNickname();
  }, []);
  return (
    <div className="bg-[#FFFDF7]">
      {" "}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipe" element={<Recipepage />} />
        <Route path="/search" element={<Searchpage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/scrap" element={<Scrappage />} />
        <Route path="/add" element={<RecipeAddpage />} />
        <Route path="/nickname" element={<Nicknamepage />} />
        <Route path="/updateNickname" element={<UpdateNicknamepage />} />
        <Route path="/myrecipe" element={<MyRecipepage />} />
        <Route path="/oauth/kakao/callback" element={<KakaoRedirect />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetailpage />} />
        <Route path="/scrap/:scrapId" element={<ScrapFolderDetail />} />
      </Routes>
    </div>
  );
}

export default App;
