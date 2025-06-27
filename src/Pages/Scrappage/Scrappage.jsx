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
import { useNavigate } from "react-router-dom";
const Scrappage = () => {
  const [folders, setFolders] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [saveFolderName, setSaveFolderName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableFolderId, setEditableFolderId] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const navigate = useNavigate();

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
  const handleFolderClick = (scrapId) => {
    navigate(`/scrap/${scrapId}`);
  };
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
      console.log(response);

      if (!newFolder.scrap_id) {
        console.warn("❌ 응답에 scrap_id 없음:", newFolder);
        alert("폴더 생성 실패: scrap_id가 없습니다.");
        return;
      }
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

      setFolders((prev) =>
        prev.map((folder) =>
          folder.scrap_id === id ? { ...folder, scrap_name: name } : folder
        )
      );
      setEditableFolderId(null);

      alert("이름 변경 완료");
      setOpenMenuId(null);
    } catch (error) {
      console.error("updateScrapName 실패", error);
    }
  };

  return (
    <div className="container px-6 py-4 h-screen  w-full">
      <SearchContainer />
      <Menubar />
      <div className="border-t "></div>
      {/* 폴더 추가 버튼 */}
      <div className="lg:my-6 w-40 lg:w-60 ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="  z-[9999] fixed bottom-28 lg:bottom-16 lg:w-60 flex justify-center lg:text-xl left-1/2 h-16 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-[#FA590F] transition"
        >
          <FolderIcon />
          폴더 추가
        </button>
      </div>
      <div className="hidden lg:block flex flex-col items-center text-center lg:m-8 border-t pt-4">
        <div className="text-lg lg:text-2xl font-semibold">
          나만의 레시피 폴더
        </div>
        <div className="text-base text-gray-500 mt-2 ">
          레시피를 폴더별로 정리해서 더 쉽게 찾아보세요!
        </div>
      </div>
      {/* 폴더 리스트 */}
      <div className="w-full flex justify-center mt-8">
        <div className="grid lg:grid-cols-2 gap-x-8 gap-y-10">
          {folders.map((folder, key, index) => (
            <div
              key={folder.scrap_id}
              className="flex h-40  items-center justify-between p-4 bg-white border-gray border-2 shadow-sm rounded-xl max-w-[500px] cursor-pointer transition transform duration-200 hover:shadow-md hover:bg-[#EEEEEE]-100 hover:scale-[1.01] "
            >
              <div
                onClick={() => handleFolderClick(folder.scrap_id)}
                className="flex items-center gap-4 w-full max-w-[400px] "
              >
                <FolderNameIcon />
                <div className="flex flex-col items-center h-full">
                  {" "}
                  <input
                    disabled={editableFolderId !== folder.scrap_id}
                    className={`mt-1 lg:text-xl flex-1 px-3 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400  disabled:bg-white disabled:border-0 disabled:cursor-not-allowed 
                  ${
                    editableFolderId !== folder.scrap_id
                      ? "border-0"
                      : "border border-gray-300"
                  }`}
                    value={folder.scrap_name}
                    onChange={(e) =>
                      handleNameChange(folder.scrap_id, e.target.value)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="px-3 mt-2 w-full text-md text-gray-500">
                    총 5개의 레시피
                  </div>{" "}
                  {/* 예시 */}
                </div>

                {saveFolderName && openMenuId === folder.scrap_id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      updateScrapName(folder.scrap_id, folder.scrap_name);
                    }}
                    className="px-3 py-2 border border-orange-400 text-orange-500 font-semibold rounded-md hover:bg-orange-50"
                  >
                    변경
                  </button>
                )}
              </div>
              {/* 메뉴 아이콘 + 드롭다운 */}
              <div className="relative z-50">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenu(folder.scrap_id);
                  }}
                  className="cursor-pointer"
                >
                  {openMenuId === folder.scrap_id ? <XIcon /> : <DotMenuIcon />}
                </div>

                {openMenuId === folder.scrap_id && (
                  <div className="absolute top-full right-0 bg-white border shadow-lg rounded-md w-32 z-50">
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();

                        saveBtnAble(folder.scrap_id);
                        setEditableFolderId(folder.scrap_id);
                      }}
                    >
                      이름 변경
                    </div>
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();

                        if (!folder.scrap_id) {
                          alert("잘못된 폴더 ID입니다.");
                          return;
                        }
                        deleteScrap(folder.scrap_id);
                      }}
                    >
                      삭제
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="p-6 lg:p-0 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10 rounded-xl shadow-lg w-[400px]">
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
      {folders.length === 0 && (
        <div className="text-center text-gray-400 mt-40 ">
          아직 스크랩한 레시피가 없습니다.
          <br />
          마음에 드는 레시피를 폴더에 저장해보세요!
        </div>
      )}
    </div>
  );
};

export default Scrappage;
