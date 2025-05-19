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
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/recipe" element={<Recipepage />} />
      <Route path="/search" element={<Searchpage />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/scrap" element={<Scrappage />} />
      <Route path="/add" element={<RecipeAddpage />} />
      <Route path="/nickname" element={<Nicknamepage />} />
      <Route path="/oauth/kakao/callback" element={<KakaoRedirect />} />
      <Route path="/recipes/:recipeId" element={<RecipeDetailpage />} />
    </Routes>
  );
}

export default App;
