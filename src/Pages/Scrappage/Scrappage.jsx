import React from "react";
import Navbar from "../../Component/Navbar/Navbar";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Menubar from "../../Component/Menubar/Menubar";
import "./Scrappage.style.css";
const Scrappage = () => {
  return (
    <div>
      <SearchContainer />
      <Menubar />
      <div className="mt-8 container">저장 레시피</div>
    </div>
  );
};

export default Scrappage;
