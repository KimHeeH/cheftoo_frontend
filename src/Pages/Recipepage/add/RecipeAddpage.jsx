import React, { useRef, useState } from "react";
import SearchContainer from "../../../Component/SearchContainer/SearchContainer";
import {
  BackIcon,
  PictureIcon,
  MiniPictureIcon,
} from "../../../Component/Icon/Icon";
import { useNavigate } from "react-router-dom";
import Menubar from "../../../Component/Menubar/Menubar";

const RecipeAddpage = () => {
  const [mainImages, setMainImages] = useState([]); // 여러 개의 메인 요리 사진
  const [isDragging, setIsDragging] = useState(false);
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [seasonings, setSeasonings] = useState([{ name: "", quantity: "" }]);
  const [orders, setOrders] = useState([{ description: "", picture: null }]); // 순서별 사진 개별 관리
  const navigate = useNavigate();
  const mainFileInputRef = useRef(null);
  const stepFileInputRefs = useRef([]); // 각 단계별 파일 input 참조 저장

  /** ✅ 메인 요리 사진 추가 (여러 개) */
  const handleMainImageDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files); // 여러 개 파일 처리
    setMainImages((prev) => [...prev, ...droppedFiles]); // 기존 파일 유지하고 새로운 파일 추가
  };

  const handleMainImageUpload = () => {
    mainFileInputRef.current.click();
  };

  const handleMainFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setMainImages((prev) => [...prev, ...selectedFiles]);
  };

  /** ✅ 요리 순서별 사진 추가 */
  const handleStepImageDrop = (event, index) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    setOrders((prevOrders) =>
      prevOrders.map((order, i) =>
        i === index ? { ...order, picture: droppedFile } : order
      )
    );
  };

  const handleStepImageUpload = (index) => {
    stepFileInputRefs.current[index].click();
  };

  const handleStepFileChange = (event, index) => {
    const uploadedFile = event.target.files[0];
    setOrders((prevOrders) =>
      prevOrders.map((order, i) =>
        i === index ? { ...order, picture: uploadedFile } : order
      )
    );
  };
  /** 재료,양념 추가 관련 함수 */
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
  /** ✅ 요리 순서 추가 */
  const handleAddOrder = () => {
    setOrders([...orders, { description: "", picture: null }]);
  };

  return (
    <div className="h-screen overflow-y-auto">
      <SearchContainer />
      <Menubar />
      <div className="container flex items-center mt-8 gap-4 lg:h-[40px] border-t-2 border-gray-100 lg:border-0">
        <div className=" mt-2 lg:mt-0 flex items-center h-full text-md w-[120px] lg:w-[200px] lg:h-[40px] lg:text-xl font-bold text-gray-800 flex items-center gap-2">
          <svg
            class="w-6 h-6 text-orange-500"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          레시피 등록
        </div>
        <div className="mt-2 lg:h-[40px] lg:flex lg:items-center lg:mt-0  lg:h-full text-sm lg:text-lg lg:font-semibold text-gray-800 ">
          나만의 레시피를 등록해보세요!
        </div>
      </div>
      <div className="container ">
        <div className="flex flex-row  items-center lg:items-start mt-8 lg:gap-8 ">
          <label className="text-sm lg:text-right w-4/5 lg:w-28 lg:text-xl font-semibold text-gray-700">
            레시피 제목
          </label>
          <input
            className="text-sm lg:text-base w-[900px] p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="예) 토마토 파스타 레시피"
          />
        </div>

        {/* 요리 설명 */}
        <div className="flex flex-row items-start mt-8 lg:gap-8">
          <label className="text-sm lg:text-right  w-4/5 lg:w-28 lg:text-xl font-semibold text-gray-700">
            요리 설명
          </label>
          <textarea
            placeholder="토마토를 작게 잘라주세요"
            rows="3"
            className="text-sm lg:text-base w-[900px] resize-none p-2 lg:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* 요리 사진 (메인) */}
        <div className="flex flex-row items-center mt-8 lg:gap-8">
          <label className="w-1/4 h-[35px] lg:h-auto  lg:w-28 lg:text-right text-sm  lg:text-xl font-semibold text-gray-700">
            요리 사진
          </label>
          <div
            className=" lg:w-[900px] lg:h-[300px] lg:border-2 border-dashed border-gray-300 rounded-lg flex lg:flex-col justify-center items-center hover:border-blue-400"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleMainImageDrop}
            onClick={handleMainImageUpload}
          >
            <div className="className= hidden lg:block">
              {" "}
              <PictureIcon />
            </div>
            <div className="hidden lg:block text-gray-500 text-center font-medium mt-2">
              파일을 끌어서 이곳에 놓아주세요!
            </div>
            <button
              className="w-[160px] h-[35px] lg:h-auto lg:w-[200px] text-xs lg:text-base lg:mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleMainImageUpload}
            >
              사진 등록 또는 찍기
            </button>
            <input
              type="file"
              ref={mainFileInputRef}
              onChange={handleMainFileChange}
              accept="image/*"
              multiple
              className="hidden"
            />
            <div className="mt-4">
              {mainImages.map((img, idx) => (
                <p key={idx}>{img.name}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="shadow-sm rounded-lg p-6 w-full   lg:max-w-5xl mt-8">
          <div className="text-sm lg:text-lg font-semibold text-gray-700 mb-4">
            재료
          </div>
          {ingredients.map((ingredient, index) => (
            <div className="flex flex-row gap-8 mt-8" key={index}>
              <input
                className="w-80 text-xs lg:text-base  border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400  outline-none transition-all duration-300"
                placeholder="예) 토마토"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
              />
              <input
                className="w-64 text-xs lg:text-base  border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400  outline-none transition-all duration-300"
                placeholder="예) 1개"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center lg:justify-start">
          <button
            className=" w-1/4 text-xs lg:text-base lg:w-32 mt-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all duration-300"
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
                className="w-80 text-xs lg:text-base border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400  outline-none transition-all duration-300"
                placeholder="예) 간장"
                value={seasoning.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
              />
              <input
                className="w-64 text-xs lg:text-base border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400  outline-none transition-all duration-300"
                placeholder="예) 1스푼"
                value={seasoning.quantity}
                onChange={(e) =>
                  handleSeasoningChange(index, "quantity", e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center lg:justify-start">
          <button
            className="  w-1/4 text-xs lg:text-base lg:w-32 mt-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all duration-300"
            onClick={handleAddSeasoning}
          >
            양념 추가
          </button>
        </div>
        {/* 요리 순서 */}
        <div className="flex flex-col gap-8 mt-8">
          <div className="text-sm ml-4 lg:ml-0 lg:text-lg lg:w-28 lg:text-xl font-semibold text-gray-700">
            요리 순서
          </div>
          {orders.map((order, index) => (
            <div className="flex gap-8  ml-6 lg:ml-0" key={index}>
              <div className="text-base lg:text-xl font-semibold text-gray-500">
                {index + 1}
              </div>

              <textarea
                className="resize-none text-xs h-[60px] lg:text-base w-2/3 lg:w-[600px] lg:h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예) 토마토를 잘라주세요."
                value={order.description}
                onChange={(e) =>
                  setOrders((prevOrders) =>
                    prevOrders.map((o, i) =>
                      i === index ? { ...o, description: e.target.value } : o
                    )
                  )
                }
              />
              <div
                className=" flex flex-col justify-center items-center h-[80px] lg:w-[100px] lg:h-[100px] lg:border-2 border-dashed border-gray-300  hover:border-blue-300"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(event) => handleStepImageDrop(event, index)}
                onClick={() => handleStepImageUpload(index)}
              >
                <div className="border-2 border-dash border-gray-100">
                  <MiniPictureIcon />
                </div>

                <div className="cursor-pointer mt-3 text-[10px] w-[80px] mt-1 h-[20px] flex items-center justify-center  lg:mt-0 lg:w-18 border-2 border-gray-200 lg:bg-white rounded-lg lg:text-black lg:text-xs ">
                  사진 업로드
                </div>
                <input
                  type="file"
                  ref={(el) => (stepFileInputRefs.current[index] = el)}
                  onChange={(event) => handleStepFileChange(event, index)}
                  accept="image/*"
                  className="hidden"
                />
                <p>{order.picture ? `파일: ${order.picture.name}` : ""}</p>
              </div>
            </div>
          ))}
          <button
            className="w-32 mt-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleAddOrder}
          >
            추가
          </button>
        </div>

        {/* 순서 추가 버튼 */}
      </div>
      <div className="flex container justify-end">완료</div>
    </div>
  );
};

export default RecipeAddpage;
