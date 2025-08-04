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
import checkAuthGuard from "../../hooks/checkAuthGuard";
import axiosInstance from "../../api/axiosInstance";
const Scrappage = () => {
  const [folders, setFolders] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [saveFolderName, setSaveFolderName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableFolderId, setEditableFolderId] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    fetchRecipeScrap();
  }, []);
  const fetchRecipeScrap = async () => {
    try {
      const response = await axiosInstance.get("/member/scrap", {
        withCredentials: true,
      });

      // 폴더 리스트를 가져온 후, 각 폴더별 레시피 개수를 조회
      const foldersWithCount = await Promise.all(
        response.data.map(async (folder, index) => {
          try {
            const recipeRes = await axiosInstance.get(
              `/member/scrap/${folder.scrap_id}/recipe`
            );

            // recipe_list가 배열인지 확인 후 length 계산
            const recipeCount = Array.isArray(recipeRes.data.recipe_list)
              ? recipeRes.data.recipe_list.length
              : 0;

            return {
              ...folder,
              index: index + 1,
              recipeCount,
            };
          } catch (error) {
            console.error("레시피 개수 조회 실패:", error);
            return {
              ...folder,
              index: index + 1,
              recipeCount: 0,
            };
          }
        })
      );

      setFolders(foldersWithCount);
      console.log("폴더 데이터:", foldersWithCount);
    } catch (error) {
      navigate("/mypage");
    }
  };
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
      const response = await axiosInstance.delete(
        `/member/scrap/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },

        { withCredentials: true }
      );
      alert("삭제 완료되었습니다");
      setFolders((prev) => prev.filter((folder) => folder.scrap_id !== id));
    } catch (error) {
      console.error("deleteRecipeScrap Error", error);
    }
  };
  const addRecipeScrap = async (name) => {
    try {
      const response = await axiosInstance.post(
        "/member/scrap",
        {
          scrapName: name,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const newFolder = response.data;
      console.log("newFolder", response);
      await fetchRecipeScrap();

      if (!newFolder.scrap_id) {
        console.warn("❌ 응답에 scrap_id 없음:", newFolder);
        alert("폴더 생성 실패: scrap_id가 없습니다.");
        return;
      }
      console.log("newFolder", newFolder);
      // setFolders((prev) => [
      //   ...prev,
      //   {
      //     scrap_id: newFolder.scrap_id,
      //     scrap_name: name,
      //   },
      // ]);
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
      /* 폴더명 바꿀때 */
      await axiosInstance.put(`/member/scrap/${id}`, {
        scrapName: name,
      });
      await fetchRecipeScrap();

      // setFolders((prev) =>
      //   prev.map((folder) =>
      //     folder.scrap_id === id ? { ...folder, scrap_name: name } : folder
      //   )
      // );
      setEditableFolderId(null);

      alert("이름 변경 완료");
      setOpenMenuId(null);
    } catch (error) {
      console.error("updateScrapName 실패", error);
    }
  };

  return (
    <div className=" h-screen  w-full font-pretendard">
      <SearchContainer />
      <Menubar />
      <div className="border-t lg:border-0"></div>
      {/* 폴더 추가 버튼 */}
      <div className="lg:my-6 w-40 lg:w-60 ">
        <button
          onClick={() => setIsModalOpen(true)}
          className=" gap-3 z-[10] fixed bottom-20 h-14  rounded-lg lg:bottom-24 lg:bottom-2 w-full  lg:w-60 flex justify-center lg:text-xl left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-[#FDFDFD] text-black  text-center border-1 border-[#E7E7E7] rounded-lg hover:bg-gray-100 transition"
        >
          <FolderIcon />
          폴더 추가
        </button>
      </div>
      <div className="px-8">
        <div className=" block container  lg:m-8 border-t lg:border-0 pt-4 ">
          <div className="text-xl lg:text-2xl font-semibold">
            나만의 레시피 폴더
          </div>
          <div className="text-lg text-gray-500 mt-2 ">
            레시피를 폴더별로 정리해서 더 쉽게 찾아보세요!
          </div>
        </div>
        {/* 폴더 리스트 */}
        <div className="lg:w-full flex justify-center mt-8 ">
          <div className=" lg:w-auto w-full  lg:grid lg:grid-cols-2 gap-x-8 gap-y-10">
            {folders.map((folder, key, index) => (
              <div
                key={folder.scrap_id}
                className="relative flex h-40 mb-4 lg:mb-0 items-center justify-between p-4 bg-white border-gray border-2  rounded-xl lg:max-w-[600px] cursor-pointer transition transform duration-200 hover:shadow-md hover:bg-[#EEEEEE]-100 hover:scale-[1.01] "
              >
                <div
                  onClick={() => {
                    if (editableFolderId !== folder.scrap_id) {
                      handleFolderClick(folder.scrap_id);
                    }
                  }}
                  className="flex items-center gap-4 w-full lg:max-w-[400px] "
                >
                  <div className="min-w-[40px]">
                    <FolderNameIcon />
                  </div>

                  <div className="flex flex-col lg:max-w-[400px]  ">
                    {" "}
                    <input
                      className="text-lg font-semibold text-gray-800 bg-transparent focus:outline-none px-2 py-1 rounded-md border border-gray-300 max-w-[200px]"
                      value={folder.scrap_name}
                      onFocus={() => setEditableFolderId(folder.scrap_id)}
                      onChange={(e) =>
                        handleNameChange(folder.scrap_id, e.target.value)
                      }
                      onBlur={() =>
                        updateScrapName(folder.scrap_id, folder.scrap_name)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateScrapName(folder.scrap_id, folder.scrap_name);
                          e.target.blur(); // 포커스 제거
                        } else if (e.key === "Escape") {
                          setEditableFolderId(null);
                          fetchRecipeScrap();
                        }
                      }}
                    />
                    <div className="px-3 mt-2 text-md text-gray-500">
                      {" "}
                      {folder?.recipeCount}개의 레시피
                    </div>{" "}
                  </div>
                </div>
                {/* 메뉴 아이콘 + 드롭다운 */}
                <div className=" absolute top-2 right-0 z-50  ">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenu(folder.scrap_id);
                    }}
                    className="cursor-pointer relative"
                  >
                    {openMenuId === folder.scrap_id ? (
                      <XIcon />
                    ) : (
                      <DotMenuIcon />
                    )}
                  </div>

                  {openMenuId === folder.scrap_id && (
                    <div className="absolute top-10 right-0 bg-white border rounded-md shadow-md w-32 z-[9999]">
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
        <div className="z-99 flex justify-center items-center text-center text-gray-400  h-[500px] lg:w-full lg:h-[200px] lg:border-1 ">
          아직 스크랩한 레시피가 없습니다.
          <br />
          마음에 드는 레시피를 폴더에 저장해보세요!
        </div>
      )}
    </div>
  );
};

export default Scrappage;
