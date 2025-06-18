import React, { useRef, useState } from "react";
import SearchContainer from "../../../Component/SearchContainer/SearchContainer";
import axios from "axios";
import { BackIcon } from "../../../Component/Menubar/Icon/Icon";
import { PictureIcon } from "../../../Component/Menubar/Icon/Icon";
import { MiniPictureIcon } from "../../../Component/Menubar/Icon/Icon";
import { useNavigate } from "react-router-dom";
import Menubar from "../../../Component/Menubar/Menubar";
import checkAuthGuard from "../../../hooks/checkAuthGuard";
import { SquareIconComponent } from "../../../Component/Menubar/Icon/Icon";
const RecipeAddpage = () => {
  checkAuthGuard();

  const [mainImages, setMainImages] = useState([]); // 여러 개의 메인 요리 사진
  const [isDragging, setIsDragging] = useState(false);
  const [ingredients, setIngredients] = useState([
    { ingredientsName: "", ingredientsNum: "" },
  ]);
  const [seasonings, setSeasonings] = useState([
    { ingredientsName: "", ingredientsNum: "" },
  ]);
  const [orders, setOrders] = useState([{ content: "", image: null }]); // 순서별 사진 개별 관리
  const [recipeTitleInputValue, setRecipeTitleInputValue] = useState("");
  const [recipeContentValue, setRecipeContentValue] = useState("");
  const navigate = useNavigate();
  const mainFileInputRef = useRef(null);
  const stepFileInputRefs = useRef([]); // 각 단계별 파일 input 참조 저장

  if (recipeTitleInputValue.length > 100) {
    alert("레시피 제목을 100자 이내로 써주세요");
  }
  /**  메인 요리 사진 추가 (여러 개) */
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

  /**  요리 순서별 사진 추가 */
  const handleStepImageDrop = (event, index) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    setOrders((prevOrders) =>
      prevOrders.map((order, i) =>
        i === index ? { ...order, image: droppedFile } : order
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
        i === index ? { ...order, image: uploadedFile } : order
      )
    );
  };
  /** 재료,양념 추가 관련 함수 */
  const handleAddIngredient = () => {
    console.log(ingredients);

    setIngredients([
      ...ingredients,
      { ingredientsName: "", ingredientsNum: "" },
    ]);
  };
  const handleIngredientChange = (index, field, value) => {
    console.log(index, field, value);

    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    console.log(newIngredients[index][field]);
    setIngredients(newIngredients);
  };
  const handleAddSeasoning = () => {
    console.log(ingredients);

    setSeasonings([...seasonings, { ingredientsName: "", ingredientsNum: "" }]);
  };
  const handleSeasoningChange = (index, field, value) => {
    console.log(index, field, value);

    const newSeasonings = [...seasonings];
    newSeasonings[index][field] = value;
    console.log(newSeasonings[index][field]);
    setSeasonings(newSeasonings);
  };
  /**  요리 순서 추가 */
  const handleAddOrder = () => {
    setOrders([...orders, { content: "", image: null }]);
    console.log(orders);
  };

  const goHomePage = () => {
    navigate("/");
  };
  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  const handleRemoveSeasoing = (index) => {
    const newSeasonings = [...seasonings];
    newSeasonings.splice(index, 1);
    setSeasonings(newSeasonings);
  };
  const handleRemoveOrder = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };
  /** 레시피 등록버튼 눌렀을때 함수  */
  const handleSubmit = async () => {
    const formData = new FormData();

    const recipeData = {
      recipeTitle: recipeTitleInputValue,
      recipeContent: recipeContentValue,
      ingredients,
      // seasonings,
      cookingOrders: orders.map((order) => ({
        content: order.content,
        image: null,
      })),
    };

    const jsonFile = new File([JSON.stringify(recipeData)], "data.json", {
      type: "application/json",
    });

    console.log("formData는", recipeData);
    // console.log("formData jsonBlob는", jsonBlob);
    formData.append("data", jsonFile);
    if (mainImages.length > 0) {
      formData.append("image", mainImages[0]);
    }
    orders.forEach((order) => {
      if (order.image) {
        formData.append("cookingStepImages", order.image);
      }
    });
    try {
      const response = await axios.post(
        "http://localhost:8080/recipes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("등록 성공:", response.data);
      alert("레시피가 등록되었습니다.");
      navigate("/recipe");
    } catch (err) {
      console.error("등록 실패", err);
    }
  };

  return (
    <div className="min-h-screen h-auto w-full max-w-full px-4 lg:max-w-[900px] mx-auto">
      <SearchContainer />
      <Menubar />
      <div className="container flex items-center mt-3 pt-3  lg:h-[40px] border-t-2 border-gray-100 lg:border-0">
        <div className="font-gowun  mt-2 lg:mt-0 flex items-center h-full text-md w-[120px] lg:w-[150px] lg:h-[40px] lg:text-xl text-gray-800 flex items-center gap-2">
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
        <div className="font-gowun mt-2 lg:h-[40px] lg:flex lg:items-center lg:mt-0  lg:h-full text-sm lg:text-lg  text-gray-800 ">
          나만의 레시피를 등록해보세요!
        </div>
      </div>
      <div className="container ">
        <div className="flex flex-row  items-center lg:items-start mt-8 lg:gap-8 ">
          <label className="mr-3 text-sm lg:text-right w-4/5 lg:w-28 lg:text-xl font-semibold text-gray-700">
            레시피 제목
          </label>
          <input
            className="text-sm lg:text-base w-[900px] p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="예) 토마토 파스타 레시피"
            value={recipeTitleInputValue}
            onChange={(e) => setRecipeTitleInputValue(e.target.value)} // ✅ 이거 추가
          />
        </div>

        {/* 요리 설명 */}
        <div className="flex flex-row items-start mt-8 lg:gap-8">
          <label className=" mr-3 text-sm lg:text-right  w-4/5 lg:w-28 lg:text-xl font-semibold text-gray-700">
            요리 설명
          </label>
          <textarea
            placeholder="토마토를 작게 잘라주세요"
            rows="3"
            value={recipeContentValue}
            onChange={(e) => setRecipeContentValue(e.target.value)} // ✅ 이거 추가
            className="text-sm lg:text-base w-[900px] resize-none p-2 lg:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* 요리 사진 (메인) */}
        <div className="flex flex-row items-center mt-8 lg:gap-8">
          <label className="w-1/4 h-[35px] lg:h-auto  lg:w-28 lg:text-right text-sm  lg:text-xl font-semibold text-gray-700">
            요리 사진
          </label>
          <div
            className=" flex items-center lg:w-[900px] lg:h-[300px] lg:border-2 border-dashed border-gray-300 rounded-lg flex lg:flex-col justify-center items-center hover:border-blue-400"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleMainImageDrop}
            onClick={handleMainImageUpload}
          >
            <div className=" hidden lg:block">
              {" "}
              <PictureIcon />
            </div>
            <div className="hidden lg:block text-gray-500 text-center font-medium mt-2">
              파일을 끌어서 이곳에 놓아주세요!
            </div>
            <button
              className="cursor-pointer w-[160px] h-[35px] lg:h-auto lg:w-[200px] text-xs lg:text-base lg:mt-2 px-4 py-2 bg-gray-100 text-black rounded-lg"
              onClick={(e) => {
                e.stopPropagation(); // ✅ 부모로 이벤트 전파 막기
                handleMainImageUpload();
              }}
            >
              사진 등록 또는 찍기
            </button>
            <input
              type="file"
              onClick={(e) => (e.target.value = null)} // ✅ 이 줄 추가
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
            <div className="flex flex-row gap-4 mt-8" key={index}>
              <input
                className="w-34 text-xs lg:text-base  border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400  outline-none transition-all duration-300"
                placeholder="예) 토마토"
                value={ingredient.ingredientsName}
                onChange={(e) =>
                  handleIngredientChange(
                    index,
                    "ingredientsName",
                    e.target.value
                  )
                }
              />
              <input
                className="w-24 text-xs lg:text-base  border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400  outline-none transition-all duration-300"
                placeholder="예) 1개"
                value={ingredient.ingredientsNum}
                onChange={(e) =>
                  handleIngredientChange(
                    index,
                    "ingredientsNum",
                    e.target.value
                  )
                }
              />
              <div
                className="flex justify-center items-center cursor-pointer "
                onClick={() => handleRemoveIngredient(index)}
              >
                <SquareIconComponent />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center lg:justify-start">
          <button
            className=" w-1/4 text-xs lg:text-base lg:w-32 mt-4 py-2 bg-[#F8F8F8] hover:bg-[#E5E5E5] border-1 border-[#E5E5E5]   text-black font-medium rounded-md hover:bg-gray-300 transition-all duration-300"
            onClick={handleAddIngredient}
          >
            재료 추가
          </button>
        </div>
        <div className="shadow-sm rounded-lg p-6 w-full max-w-5xl mt-8">
          <div className="text-base lg:text-lg font-semibold text-gray-700 mb-4">
            양념
          </div>
          {seasonings.map((seasonings, index) => (
            <div className="flex flex-row gap-4 mt-8" key={index}>
              <input
                className="w-34 text-xs lg:text-base border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400  outline-none transition-all duration-300"
                placeholder="예) 간장"
                value={seasonings.ingredientsName}
                onChange={(e) =>
                  handleSeasoningChange(
                    index,
                    "ingredientsName",
                    e.target.value
                  )
                }
              />
              <input
                className="w-24 text-xs lg:text-base border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400  outline-none transition-all duration-300"
                placeholder="예) 1스푼"
                value={seasonings.ingredientsNum}
                onChange={(e) =>
                  handleSeasoningChange(index, "ingredientsNum", e.target.value)
                }
              />
              <div
                className="flex justify-center items-center cursor-pointer"
                onClick={() => handleRemoveSeasoing(index)}
              >
                <SquareIconComponent />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center lg:justify-start">
          <button
            className="  w-1/4 text-xs lg:text-base lg:w-32 mt-4 py-2 text-black font-medium rounded-md bg-[#F8F8F8] hover:bg-[#E5E5E5] border-1 border-[#E5E5E5]  transition-all duration-300"
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
            <div className="flex gap-3 lg:gap-4 ml-3 lg:ml-0" key={index}>
              <div className="text-base lg:text-xl font-semibold text-gray-500">
                {index + 1}
              </div>

              <textarea
                className="resize-none text-xs h-[60px] lg:text-base w-2/3 lg:w-[600px] lg:h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예) 토마토를 잘라주세요."
                value={order.content}
                onChange={(e) =>
                  setOrders((prevOrders) =>
                    prevOrders.map((o, i) =>
                      i === index ? { ...o, content: e.target.value } : o
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
                <p>{order.image ? `파일: ${order.image.name}` : ""}</p>
              </div>
              <div
                className="flex justify-center items-center cursor-pointer"
                onClick={() => {
                  handleRemoveOrder(index);
                }}
              >
                <SquareIconComponent />
              </div>
            </div>
          ))}
          <div className="flex justify-center items-center lg:justify-start h-[16px] lg:mt-4 ">
            {" "}
            <button
              className="mb-10 text-xs lg:text-base w-1/4 lg:w-32 mt-4 py-2 bg-[#F8F8F8] hover:bg-[#E5E5E5] border-1 border-[#E5E5E5]  rounded-md"
              onClick={handleAddOrder}
            >
              추가
            </button>
          </div>
        </div>

        {/* 순서 추가 버튼 */}
      </div>
      <div className="flex container justify-center items-center gap-14 lg:gap-24 pb-20 pt-16 lg:mt-8 ">
        <div
          onClick={goHomePage}
          className="w-1/3 h-[35px] lg:h-12 cursor-pointer flex justify-center items-center rounded-md lg:w-[250px] bg-gray-100 text-black lg:text-xl lg:h-[58px]"
        >
          취소
        </div>
        <div
          onClick={() => handleSubmit()}
          className="w-1/3 h-[35px] lg:h-12 cursor-pointer flex justify-center items-center rounded-md lg:w-[250px] bg-orange-500  hover:bg-orange-600 text-white lg:text-xl lg:h-[58px]"
        >
          등록
        </div>
      </div>
    </div>
  );
};

export default RecipeAddpage;
