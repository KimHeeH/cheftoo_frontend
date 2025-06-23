import React from "react";
import Menubar from "../../Component/Menubar/Menubar";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const ScrapFolderDetail = () => {
  const { scrapId } = useParams(); // ← 이게 더 깔끔
  console.log(scrapId);

  useEffect(() => {
    const fetchScrapRecipe = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/member/scrap/recipe",

          { params: { scrapId }, withCredentials: true }
        );
      } catch (error) {
        console.error("fetchScrapRecipe 실패", error);
      }
    };
    fetchScrapRecipe();
  }, []);
  return (
    <div>
      <SearchContainer />
      <Menubar />
    </div>
  );
};

export default ScrapFolderDetail;
