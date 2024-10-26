import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Scrappage from "./Pages/Scrappage/Scrappage";
import Searchpage from "./Pages/Searchpage/Searchpage";
import Mypage from "./Pages/Mypage/Mypage";
import Recipepage from "./Pages/Recipepage/Recipepage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/recipe" element={<Recipepage />}></Route>
      <Route path="/search" element={<Searchpage />}></Route>
      <Route path="/mypage" element={<Mypage />}></Route>
      <Route path="/star" element={<Scrappage />}></Route>
    </Routes>
  );
}

export default App;
