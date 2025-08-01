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
import { useEffect } from "react";
import axios from "axios";
import ScrapFolderDetail from "./Pages/Scrappage/ScrapFolderDetail";
import { useSetRecoilState } from "recoil";
import { nicknameState } from "./recoil/nicknameAtom";
import { useNavigate } from "react-router-dom";
import { setupInterceptors } from "./api/axiosInstance";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const resetNickname = useSetRecoilState(nicknameState);
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(resetNickname, navigate);
  }, []);
  return (
    <>
      {" "}
      <ToastContainer />
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
    </>
  );
}

export default App;
