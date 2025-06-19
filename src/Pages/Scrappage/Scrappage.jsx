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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
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
  const addRecipeScrap = async (name) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/member/scrap",
        { scrapName: name },
        { withCredentials: true }
      );

      const newFolder = response.data;
      console.log("newFolder", newFolder);
      setFolders((prev) => [
        ...prev,
        {
          scrap_id: newFolder.scrap_id,
          scrap_name: name,
        },
      ]);
    } catch (error) {
      console.error("addRecipeScrap 실패", error);
    }
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
        { scrapName: name },
        { withCredentials: true }
      );

      // 🔥 이 줄이 꼭 필요!
      setFolders((prev) =>
        prev.map((folder) =>
          folder.scrap_id === id ? { ...folder, scrap_name: name } : folder
        )
      );

      alert("이름 변경 완료");
      setOpenMenuId(null);
    } catch (error) {
      console.error("updateScrapName 실패", error);
    }
  };

  return (
    <div className="container px-6 py-4 h-screen">
      <SearchContainer />
      <Menubar />

      {/* 폴더 추가 버튼 */}
      <div className="flex justify-end my-6 ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-[#FA590F] transition"
        >
          <FolderIcon />
          폴더 추가
        </button>
      </div>

      {/* 폴더 리스트 */}
      <div className="grid gap-6 ">
        {folders.map((folder, index) => (
          <div
            key={folder.scrap_id}
            className="flex items-center justify-between p-4 bg-white shadow-sm rounded-xl hover:shadow-md transition max-w-[1000px] cursor-pointer"
          >
            <div className="flex items-center gap-4 w-full max-w-[500px]">
              <FolderNameIcon />
              <input
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={folder.scrap_name}
                onChange={(e) =>
                  handleNameChange(folder.scrap_id, e.target.value)
                }
              />
              {saveFolderName && openMenuId === folder.scrap_id && (
                <button
                  onClick={() =>
                    updateScrapName(folder.scrap_id, folder.scrap_name)
                  }
                  className="px-3 py-2 border border-orange-400 text-orange-500 font-semibold rounded-md hover:bg-orange-50"
                >
                  변경
                </button>
              )}
            </div>

            {/* 메뉴 아이콘 + 드롭다운 */}
            <div className="relative">
              <div
                onClick={() => handleMenu(folder.scrap_id)}
                className="cursor-pointer"
              >
                {openMenuId === folder.scrap_id ? <XIcon /> : <DotMenuIcon />}
              </div>

              {openMenuId === folder.scrap_id && (
                <div className="absolute top-10 right-0 bg-white border shadow-lg rounded-md w-32 z-50">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => saveBtnAble(folder.scrap_id)}
                  >
                    이름 변경
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                    onClick={() => deleteScrap(folder.scrap_id)}
                  >
                    삭제
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg z-50 w-[400px]">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">새 폴더 만들기</h2>
            <input
              type="text"
              placeholder="폴더 이름"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={async () => {
                  if (newFolderName.trim() !== "") {
                    await addRecipeScrap(newFolderName);
                    setNewFolderName("");
                    setIsModalOpen(false);
                    alert("폴더가 추가되었습니다");
                  } else {
                    alert("폴더 이름을 입력해주세요.");
                  }
                }}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scrappage;
