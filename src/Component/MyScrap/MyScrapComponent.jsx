import React from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  DotMenuIcon,
  FolderIcon,
  FolderNameIcon,
  PencilIcon,
  SelectedXIcon,
  XIcon,
} from "../Menubar/Icon/Icon";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const MyScrapComponent = () => {
  const [folders, setFolders] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [saveFolderName, setSaveFolderName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableFolderId, setEditableFolderId] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [hover, setHover] = useState(false);
  const PAGE_SIZE = 12;
  const [page, setPage] = useState(0);

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
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

  const handleFolderClick = (scrapId, scrapName) => {
    navigate(`/scrap/${scrapId}`, { state: { scrap_name: scrapName } });
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

      setEditingId(null);

      alert("이름 변경 완료");
      setOpenMenuId(null);
    } catch (error) {
      console.error("updateScrapName 실패", error);
    }
  };

  return (
    <div className="">
      <div className="flex items-start">
        {" "}
        <div className="flex-1 min-w-0 flex flex-col lg:gap-2 text-lg lg:text-2xl font-semibold">
          <div>나의 스크랩 폴더</div>{" "}
          <span className="text-sm lg:text-lg text-gray-400 font-medium">
            폴더 삭제와 이름 변경이 가능합니다.
          </span>
        </div>
        <div className="shrink-0 ml-auto">
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex justify-center items-center border rounded-xl w-[70px] lg:w-28 text-white bg-brand hover:bg-brandDark cursor-pointer text-sm lg:text-base font-medium h-10"
          >
            폴더 추가
          </div>
        </div>
      </div>
      <div className="lg:w-full flex justify-center mt-4 ">
        <div className=" w-full grid gap-4 grid-cols-2  lg:grid-cols-3 lg:gap-x-24 lg:gap-y-10">
          {/* 폴더*/}
          {folders.map((folder, key, index) => (
            <div className=" w-full py-4" key={folder.scrap_id}>
              <div
                className="relative w-full h-28 lg:h-60 border cursor-pointer"
                onClick={() =>
                  handleFolderClick(folder.scrap_id, folder.scrap_name)
                }
                key={folder.scrap_id}
              >
                {" "}
                <button
                  type="button"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  aria-label="폴더 삭제"
                  className="absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 "
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteScrap(folder.scrap_id);
                  }}
                >
                  {hover ? <SelectedXIcon /> : <XIcon />}
                </button>
                <div className="w-full flex justify-center h-full items-center">
                  {" "}
                  <FolderNameIcon />
                </div>
              </div>
              <div className="relative flex items-center w-full border-b pb-2 mt-3 px-2">
                {" "}
                <input
                  type="text"
                  readOnly={editingId !== folder.scrap_id}
                  onChange={(e) =>
                    handleNameChange(folder.scrap_id, e.target.value)
                  }
                  className={`lg:mt-2 border px-3 py-2 rounded w-[70%] lg:w-[80%] h-full text-xs lg:text-xl font-medium ${
                    editingId !== folder.scrap_id
                      ? "bg-[#F8F8F8] text-gray-600"
                      : "bg-white"
                  }`}
                  value={folder.scrap_name}
                />
                <div className="absolute right-2 cursor-pointer">
                  {editingId !== folder.scrap_id ? (
                    <div onClick={() => setEditingId(folder.scrap_id)}>
                      <PencilIcon />
                    </div>
                  ) : (
                    <div
                      className="rounded-md hover:bg-gray-100 w-8 lg:w-12 text-xs lg:text-base flex justify-center items-center border h-8 lg:h-full"
                      onClick={() => {
                        updateScrapName(folder.scrap_id, folder.scrap_name);
                        setEditingId(null);
                      }}
                    >
                      저장
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
      {isModalOpen && (
        <div className="p-6 lg:p-0 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10 rounded-xl shadow-lg w-[400px]">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">새 폴더 만들기</h2>
            <input
              type="text"
              placeholder="폴더 이름"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand focus:outline-none"
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
                className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brandDark"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      {folders.length === 0 && (
        <div className="text-sm lg:text-base z-99 flex justify-center items-center text-center text-gray-400  h-[200px] lg:w-full lg:h-[200px] lg:border-1 ">
          아직 스크랩한 레시피가 없습니다.
          <br />
          마음에 드는 레시피를 폴더에 저장해보세요!
        </div>
      )}
    </div>
  );
};

export default MyScrapComponent;
