import React, { useRef } from "react";
import SearchContainer from "../../../Component/SearchContainer/SearchContainer";
import { useState } from "react";
import { BackIcon } from "../../../Component/Icon/Icon";
import { PictureIcon } from "../../../Component/Icon/Icon";
import { MiniPictureIcon } from "../../../Component/Icon/Icon";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // useNavigate import
import Menubar from "../../../Component/Menubar/Menubar";
const RecipeAddpage = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [seasonings, setSeasonings] = useState([{ name: "", quantity: "" }]);
  const [orders, setOrders] = useState([{ description: "", picture: "" }]);
  const navigate = useNavigate();
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (event, index) => {
    event.preventDefault(); // 기본 동작 방지
    setIsDragging(false); // 드래그 상태 해제
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (index === null) {
        setFile(droppedFile);
      } else {
        const newOrders = [...orders];
        newOrders[index].picture = droppedFile;
        setOrders(newOrders);
      }
    }
  };

  const handleAddIngredient = () => {
    console.log(ingredients);
    // 새로운 재료 객체 추가
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };
  const handleIngredientChange = (index, field, value) => {
    console.log(index, field, value);

    const newIngredients = [...ingredients];
    newIngredients[index][field] = value; // 특정 인덱스의 필드 업데이트
    console.log(newIngredients[index][field]);
    setIngredients(newIngredients);
  };
  const handleAddSeasoning = () => {
    console.log(ingredients);
    // 새로운 재료 객체 추가
    setSeasonings([...seasonings, { name: "", quantity: "" }]);
  };
  const handleSeasoningChange = (index, field, value) => {
    console.log(index, field, value);

    const newSeasonings = [...seasonings];
    newSeasonings[index][field] = value; // 특정 인덱스의 필드 업데이트
    console.log(newSeasonings[index][field]);
    setSeasonings(newSeasonings);
  };
  const handlePictureUpload = () => {};
  const handlePage = () => {
    navigate("/recipe");
  };
  const handleAddOrder = () => {
    setOrders([...orders, { description: "", picture: "" }]);
  };
  const handleOrderChange = (index, field, value) => {
    console.log(index, field, value);
    const newOrders = [...orders];
    newOrders[index][field] = value;
    console.log(newOrders[index][field]);
    setOrders(newOrders);
  };
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click(); // 파일 선택창 열기
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // 여기서 파일을 처리하는 로직 추가
    console.log(file);
  };
  return (
    <div>
      <SearchContainer />
      <Menubar />
      <div className="container mt-8 text-base lg:text-xl  ">레시피 등록</div>
      <div className="container">
        <div className="flex flex-row mt-8 gap-4">
          <div className="text-base lg:text-xl font-semibold text-gray-700">
            레시피 제목
          </div>
          <div className="text-base lg:text-xl w-[900px] border-b border-[#D0D0D0]">
            <input
              className="w-full p-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="예) 토마토 파스타 레시피"
            />
          </div>
        </div>

        <div className="flex flex-row mt-8 gap-11">
          <div className="text-base lg:text-xl font-semibold text-gray-700">
            요리 설명
          </div>
          <div className="text-base lg:text-xl w-[900px]">
            <textarea
              placeholder="토마토를 작게 잘라주세요"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
              onInput={(e) => {
                e.target.style.height = "auto"; // 높이 초기화
                e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞춰 높이 조정
              }}
            />
          </div>
        </div>

        <div className="flex flex-row mt-8 gap-11 ">
          <div className="text-base lg:text-xl font-semibold text-gray-700">
            요리 사진
          </div>
          <div
            className="w-[900px]  h-[300px] border-2 border-dashed border-gray-300 rounded-lg shadow-md flex flex-col justify-center items-center transition-all duration-300 ease-in-out hover:border-blue-400"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handlePictureUpload}
          >
            <PictureIcon />
            <div className="text-gray-500 text-center font-medium mt-2">
              파일을 끌어서
              <br /> 이곳에 놓아주세요!
            </div>

            <div className="writeRecipe-pictureInputContainer">
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
                onClick={handleFileUpload}
              >
                사진 등록 또는 찍기
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden" // input은 보이지 않도록 설정
              />
            </div>
          </div>
        </div>
        <div className="shadow-sm rounded-lg p-6 w-full max-w-5xl mt-8">
          <div className="text-base lg:text-lg font-semibold text-gray-700 mb-4">
            재료
          </div>
          {ingredients.map((ingredient, index) => (
            <div className="flex flex-row gap-8 mt-8" key={index}>
              <input
                className="w-80 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400  outline-none transition-all duration-300"
                placeholder="예) 토마토"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
              />
              <input
                className="w-64 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400  outline-none transition-all duration-300"
                placeholder="예) 1개"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <div className="">
          <button
            className=" w-32 mt-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all duration-300"
            onClick={handleAddIngredient}
          >
            재료 추가
          </button>
        </div>
        <div className="shadow-sm rounded-lg p-6 w-full max-w-5xl mt-8">
          <div className="text-base lg:text-lg font-semibold text-gray-700 mb-4">
            양념
          </div>
          {seasonings.map((seasoning, index) => (
            <div className="flex flex-row gap-8 mt-8" key={index}>
              <input
                className="w-80 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400  outline-none transition-all duration-300"
                placeholder="예) 간장"
                value={seasoning.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
              />
              <input
                className="w-64 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400  outline-none transition-all duration-300"
                placeholder="예) 1스푼"
                value={seasoning.quantity}
                onChange={(e) =>
                  handleSeasoningChange(index, "quantity", e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <div className="writeRecipe-addSeasoningButtonContainer">
          <button
            className=" w-32 mt-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all duration-300"
            onClick={handleAddSeasoning}
          >
            양념 추가
          </button>
        </div>
        <div className="flex flex-col gap-8 mt-8">
          <div className="flex text-base lg:text-xl font-semibold text-gray-700">
            요리 순서
          </div>
          {orders.map((order, index) => (
            <div className="flex  gap-8" key={index}>
              <div className="text-base lg:text-xl font-semibold text-gray-500">
                {index + 1}
              </div>
              <textarea
                className="resize-none lg:w-[600px] lg:h-[100px] p-2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400  outline-none transition-all duration-300"
                placeholder="예) 토마토를 잘라주세요."
                value={order.description}
                onChange={(e) =>
                  handleOrderChange(index, "description", e.target.value)
                }
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = "${e.target.scrollHeight}px";
                }}
              ></textarea>

              <div
                className={`writeRecipe-orderPictureBox ${
                  isDragging ? "dragging" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(event) => {
                  handleDrop(event, index);
                }}
                onClick={handlePictureUpload}
              >
                <div className="flex flex-col justify-center items-center lg:w-[100px] lg:h-[100px] border-2 border-dashed border-gray-300 transition-all duration-300 ease-in-out hover:border-2 hover:border-blue-300">
                  <MiniPictureIcon />
                  <div className="mt-2 text-xs">사진 업로드</div>
                </div>
                <p>{file ? `파일: ${file.name}` : ""}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="wrtieRecipe-addRrderButtonContainer">
          <button
            className=" w-32 mt-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all duration-300"
            onClick={handleAddOrder}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeAddpage;
