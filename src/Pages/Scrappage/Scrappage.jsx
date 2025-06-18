import React, { useState } from "react";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import Menubar from "../../Component/Menubar/Menubar";
import {
  DotMenuIcon,
  FolderIcon,
  FolderNameIcon,
  XIcon,
} from "../../Component/Menubar/Icon/Icon";
import axios from "axios";
import { useEffect } from "react";

const Scrappage = () => {
  const [folders, setFolders] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [saveFolderName, setSaveFolderName] = useState(null);
  useEffect(() => {
    const fetchRecipeScrap = async () => {
      try {
        const response = await axios.get("http://localhost:8080/member/scrap", {
          withCredentials: true,
        });
        const mappedFolders = response.data.map((folder, index) => ({
          ...folder,
          scrap_name: folder.scrap_name,
          scrap_id: folder.scrap_id,
          index: index + 1,
        }));
        console.log(mappedFolders);
        setFolders(mappedFolders);
        console.log(response.data);
      } catch (error) {
        console.error("fetchRecipeScrap Error", error);
      }
    };
    fetchRecipeScrap();
  }, []);
  const handleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };
  const saveBtnAble = (id) => {
    setSaveFolderName((prev) => (prev === id ? id : id));
  };
  const deleteScrap = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/member/scrap/${id}`,

        { withCredentials: true }
      );
      alert("삭제 완료되었습니다");
      setFolders((prev) => prev.filter((folder) => folder.scrap_id !== id)); // ✅ 상태 직접 수정
    } catch (error) {
      console.error("deleteRecipeScrap Error", error);
    }
  };
  const addRecipeScrap = async (name, tempId) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/member/scrap",
        { scrapName: name },
        { withCredentials: true }
      );

      const realScrapId = response.data.scrap_id; // ✅ 서버가 준 진짜 UUID

      // 📌 기존 폴더 상태에서 임시 id를 가진 폴더를 실제 UUID로 바꿔줌
      setFolders((prev) =>
        prev.map((folder) =>
          folder.scrap_id === tempId
            ? { ...folder, scrap_id: realScrapId, isNew: false }
            : folder
        )
      );
    } catch (error) {
      console.error("addRecipeScrap 실패", error);
    }
  };

  const addFolder = () => {
    const newFolder = {
      scrap_id: Date.now(),
      scrap_name: "",
      isNew: true,
    };
    setFolders((prev) => [...prev, newFolder]);
    alert("새 폴더의 이름을 설정해주세요");
  };
  const handleNameChange = (id, newName) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.scrap_id === id ? { ...folder, scrap_name: newName } : folder
      )
    );
  };
  const updateScrapName = async (id, name) => {
    try {
      await axios.put(
        `http://localhost:8080/member/scrap/${id}`,
        {
          scrapName: name,
        },
        { withCredentials: true }
      );
      alert("이름 변경 완료");
      setFolders((prev) =>
        prev.map((folder) =>
          folder.scrap_id === id ? { ...folder, isNew: false } : folder
        )
      );
      setOpenMenuId(null);
    } catch (error) {
      console.error("updateScrapName 실패", error);
    }
  };
  return (
    <div className="container ml-4">
      <SearchContainer />
      <Menubar />
      <div className="relative h-screen">
        {/* 폴더 리스트 - 예시로 3개 UI만 */}
        {folders.map((folder, index) => (
          <div key={index} className="w-full">
            <div className="flex border-1 rounded-lg hover:shadow-md items-center mt-8 justify-between cursor-pointer">
              <div className="flex w-[400px] justify-end items-center h-24  ">
                <FolderNameIcon />
                <input
                  className="ml-4 mr-4 h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 p-1"
                  value={folder.scrap_name}
                  onChange={(e) =>
                    handleNameChange(folder.scrap_id, e.target.value)
                  }
                  onBlur={() => {
                    if (folder.isNew && folder.scrap_name.trim() !== "") {
                      addRecipeScrap(folder.scrap_name, folder.scrap_id); // ← tempId 전달
                    }
                  }}
                />
                {saveFolderName && openMenuId === folder.scrap_id && (
                  <button
                    className="border-1 w-12 h-10"
                    onClick={() =>
                      updateScrapName(folder.scrap_id, folder.scrap_name)
                    }
                  >
                    변경
                  </button>
                )}
              </div>

              <div className="mr-40 relative w-fit">
                <div
                  className="z-50 cursor-pointer"
                  onClick={() => handleMenu(folder.scrap_id)}
                >
                  {openMenuId === folder.scrap_id ? <XIcon /> : <DotMenuIcon />}
                </div>

                {/* 예시용 드롭다운 메뉴 (항상 보이게끔) */}
                {openMenuId === folder.scrap_id && (
                  <div className="absolute top-8 right-0 flex flex-col bg-[#FEFEFE] border shadow-md w-48 z-50">
                    <div
                      className="pl-2 py-2 border-b cursor-pointer hover:bg-gray-100"
                      onClick={() => saveBtnAble(folder.scrap_id)}
                    >
                      이름 변경
                    </div>
                    <div
                      className="pl-2 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => deleteScrap(folder.scrap_id)}
                    >
                      삭제
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* 폴더 추가 버튼 */}
        <div className="absolute left-1/2 lg:top-2/3 -translate-x-1/2 lg:-translate-y-1/2">
          <div
            className="w-60 h-20 border-1 rounded-lg flex items-end cursor-pointer"
            onClick={addFolder}
          >
            <div className="flex justify-center items-center w-full h-full gap-4 ">
              <FolderIcon />새 폴더 추가
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scrappage;
