import React, { useRef, useState } from "react";
import SearchContainer from "../../../Component/SearchContainer/SearchContainer";
import axios from "axios";
import { PictureIcon } from "../../../Component/Menubar/Icon/Icon";
import { MiniPictureIcon } from "../../../Component/Menubar/Icon/Icon";
import { useNavigate } from "react-router-dom";
import Menubar from "../../../Component/Menubar/Menubar";
import { SquareIconComponent } from "../../../Component/Menubar/Icon/Icon";
import axiosInstance from "../../../api/axiosInstance";
const RecipeAddpage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [mainImages, setMainImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [ingredients, setIngredients] = useState([
    { ingredientsName: "", ingredientsNum: "" },
  ]);
  const [seasonings, setSeasonings] = useState([
    { sauceName: "", quantity: "" },
  ]);
  const [orders, setOrders] = useState([{ content: "", image: null }]);
  const [recipeTitleInputValue, setRecipeTitleInputValue] = useState("");
  const [recipeContentValue, setRecipeContentValue] = useState("");
  const navigate = useNavigate();
  const mainFileInputRef = useRef(null);
  const stepFileInputRefs = useRef([]);
  const maxImageUpload = 3 * 1024 * 1024;
  let errorMessages = [];
  // 레시피 제목
  if (recipeTitleInputValue.length > 20) {
    errorMessages.push("레시피 제목을 20자 이내로 써주세요");
  }

  // 레시피 설명
  if (recipeContentValue.length > 100) {
    errorMessages.push("레시피 설명을 100자 이내로 써주세요");
  }

  // 재료
  if (ingredients.length > 10) {
    errorMessages.push("재료는 최대 10개까지만 입력할 수 있습니다");
  }
  ingredients.forEach((item) => {
    if (item.ingredientsName.length > 100) {
      errorMessages.push("재료명은 100자 이내로 써주세요");
    }
  });

  // 양념
  seasonings.forEach((item) => {
    if (item.sauceName.length > 100) {
      errorMessages.push("양념 이름은 100자 이내로 써주세요");
    }
    if (item.quantity.length > 30) {
      errorMessages.push("양념 수량은 30자 이내로 써주세요");
    }
  });

  // 조리순서
  orders.forEach((item) => {
    if (item.content.length > 200) {
      errorMessages.push("조리순서 내용은 200자 이내로 써주세요");
    }
  });

  if (errorMessages.length > 0) {
    alert(errorMessages.join("\n"));
  }
  /**  메인 요리 사진 추가 (여러 개) */
  const handleMainImageDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    setMainImages((prev) => [...prev, ...droppedFiles]);
  };

  const handleMainImageUpload = () => {
    mainFileInputRef.current.click();
  };

  const handleMainFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter((file) => {
      if (file.size > maxImageUpload) {
        alert(`'${file.name}'은 3MB를 초과하여 업로드할 수 없습니다.`);
        return false;
      }
      return true;
    });
    setMainImages((prev) => [...prev, ...validFiles]);
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
    if (uploadedFile && uploadedFile.size > maxImageUpload) {
      alert(`'${uploadedFile.name}'은 3MB를 초과하여 업로드할 수 없습니다.`);
      return;
    }
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
    setSeasonings([...seasonings, { sauceName: "", quantity: "" }]);
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

  const getMainImgPresignedUrl = async (fileName, contentType) => {
    console.log("요청 보내는 경로:", "/images/recipe-image/presigned-put");

    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/images/recipe-image/presigned-put`,
      {
        params: { contentType, fileName },
      }
    );

    return res.data;
  };
  const getStepImgPresignedUrl = async (fileName, contentType) => {
    console.log("요청 보내는 경로:", "/images/recipe-image/presigned-put");

    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/images/cooking-order-image/presigned-put`,
      {
        params: { contentType, fileName },
      }
    );
    console.log(res.data);
    return res.data;
  };

  /** 레시피 등록버튼 눌렀을때 함수  */
  const handleSubmit = async () => {
    console.log("ingredients", ingredients);
    console.log("seasonings", seasonings);
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const formData = new FormData();
    const mainImage = mainImages[0];
    if (!mainImage) {
      console.error("❌ mainImage 없음! 파일이 선택되지 않았습니다.");
      return;
    }
    const recipeImageContentType = mainImage.type;
    console.log(today);

    try {
      const mainPresignedUrlResponse = await getMainImgPresignedUrl(
        mainImage.name,
        recipeImageContentType
      );
      const mainPresignedUrl = mainPresignedUrlResponse.url;
      const recipeImageKey = mainPresignedUrlResponse.key;

      console.log(mainImage);
      console.log("mainPresignedUrl", mainPresignedUrl);

      console.log("mainImage.type", mainImage.type);
      await axios.put(mainPresignedUrl, mainImage, {
        headers: { "Content-Type": recipeImageContentType },
        onUploadProgress: (progressEvent) => {
          console.log(
            "업로드 중...",
            progressEvent.loaded,
            "/",
            progressEvent.total
          );
        },
      });

      const cookingOrder = await Promise.all(
        orders.map(async (order, index) => {
          let cookingOrderImageKey = null;
          if (order.image) {
            const stepFileName = order.image.name;
            const stepContentType = order.image.type;

            const stepPresignedUrlResponse = await getStepImgPresignedUrl(
              stepFileName,
              stepContentType
            );
            const stepPresignedUrl = stepPresignedUrlResponse.url;
            cookingOrderImageKey = stepPresignedUrlResponse.key;
            await axios.put(stepPresignedUrl, order.image, {
              headers: { "Content-Type": stepContentType },
            });
          }
          return {
            order: index + 1,
            content: order.content,
            cookingOrderImageKey,
          };
        })
      );
      const recipeData = {
        recipeTitle: recipeTitleInputValue,
        recipeContent: recipeContentValue,
        ingredients,
        sauce: seasonings,
        cookingOrder,
        recipeImageKey,
        recipeImageContentType,
      };
      console.log(JSON.stringify(recipeData));
      const response = await axiosInstance.post("/recipe", recipeData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("등록 성공:", response.data);
      alert("레시피가 등록되었습니다.");
      navigate("/recipe");
    } catch (err) {
      console.error("등록 실패", err);
    }
  };

  return (
    <div className="font-pretendard">
      <SearchContainer />
      <Menubar />

      <div className="max-w-4xl mx-auto px-4">
        {/* 상단 제목 */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center mt-8 pt-4 gap-4">
          <div className="flex items-center text-gray-800 lg:text-2xl font-semibold gap-2">
            <svg
              className="w-6 h-6 text-[#10B981]"
              fill="#10B981"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            레시피 등록
          </div>
        </div>

        {/* 제목 */}
        <div className="mt-8">
          <div className="flex items-center h-10 gap-2 mb-2">
            {" "}
            <label className="text-gray-700 font-semibold text-sm lg:text-xl ">
              레시피 제목
            </label>
            <span className="text-sm text-gray-500 ml-2">
              {recipeTitleInputValue.length} / 20
            </span>
          </div>

          <input
            maxLength={20}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm lg:text-xl"
            placeholder="예) 토마토 파스타 레시피"
            value={recipeTitleInputValue}
            onChange={(e) => setRecipeTitleInputValue(e.target.value)}
          />
        </div>

        {/* 설명 */}
        <div className="mt-8">
          <div className="flex items-center h-10 gap-2 mb-2">
            {" "}
            <label className="text-gray-700 font-semibold text-sm lg:text-xl ">
              요리 설명
            </label>{" "}
            <span className="text-sm text-gray-500 ml-2">
              {recipeTitleInputValue.length} / 100
            </span>
          </div>

          <textarea
            placeholder="토마토소스를 이용한 파스타 레시피"
            rows="3"
            value={recipeContentValue}
            onChange={(e) => setRecipeContentValue(e.target.value)}
            className="w-full resize-none p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm lg:text-base"
          />
        </div>

        {/* 메인 이미지 */}
        <div className="mt-8">
          <label className="block text-gray-700 font-semibold text-sm lg:text-xl mb-2">
            요리 사진
          </label>
          <div
            className="w-full min-h-[200px] lg:h-[300px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-brand cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleMainImageDrop}
            onClick={handleMainImageUpload}
          >
            <PictureIcon />
            <p className="text-gray-500 text-center mt-2 hidden lg:block">
              파일을 끌어서 이곳에 놓아주세요!
            </p>
            <button
              className="mt-3 px-4 py-2 bg-gray-100 rounded-lg text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleMainImageUpload();
              }}
            >
              사진 등록 또는 찍기
            </button>
            <input
              type="file"
              ref={mainFileInputRef}
              onClick={(e) => (e.target.value = null)}
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

        {/* 재료 */}
        <div className="mt-10">
          <div className="text-sm lg:text-xl font-semibold text-gray-700 mb-4">
            재료
          </div>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <input
                className="w-full lg:w-1/2 p-2 border focus:outline-none focus:ring-2 focus:ring-gray-300  rounded-md text-sm lg:text-base"
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
                className="w-1/3 p-2 border focus:outline-none focus:ring-2 focus:ring-gray-300  rounded-md text-sm lg:text-base"
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
                className="flex items-center cursor-pointer"
                onClick={() => handleRemoveIngredient(index)}
              >
                <SquareIconComponent />
              </div>
            </div>
          ))}
          <button
            className="text-sm lg:text-base px-4 py-2 bg-brand text-white hover:bg-brandDark rounded-md"
            onClick={handleAddIngredient}
          >
            재료 추가
          </button>
        </div>

        {/* 양념 */}
        <div className="mt-10">
          <div className="text-sm lg:text-xl font-semibold text-gray-700 mb-4">
            양념
          </div>
          {seasonings.map((seasoning, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <input
                className="w-full lg:w-1/2 p-2 focus:outline-none focus:ring-2 focus:ring-gray-300  border rounded-md text-sm lg:text-base"
                placeholder="예) 간장"
                value={seasoning.sauceName}
                onChange={(e) =>
                  handleSeasoningChange(index, "sauceName", e.target.value)
                }
              />
              <input
                className="w-1/3 p-2 border focus:outline-none focus:ring-2 focus:ring-gray-300  rounded-md text-sm lg:text-base"
                placeholder="예) 1스푼"
                value={seasoning.quantity}
                onChange={(e) =>
                  handleSeasoningChange(index, "quantity", e.target.value)
                }
              />
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleRemoveSeasoing(index)}
              >
                <SquareIconComponent />
              </div>
            </div>
          ))}
          <button
            className="text-sm lg:text-base px-4 py-2  bg-brand text-white hover:bg-brandDark rounded-md"
            onClick={handleAddSeasoning}
          >
            양념 추가
          </button>
        </div>

        {/* 요리 순서 */}
        <div className="mt-10">
          <div className="text-sm lg:text-xl font-semibold text-gray-700 mb-4">
            요리 순서
          </div>
          {orders.map((order, index) => (
            <div key={index} className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex items-start text-gray-600 font-semibold">
                {index + 1}
              </div>

              <div className="flex flex-col w-full lg:w-2/3">
                <textarea
                  className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm lg:text-base"
                  placeholder="예) 토마토를 잘라주세요."
                  value={order.content}
                  maxLength={200}
                  onChange={(e) =>
                    setOrders((prev) =>
                      prev.map((o, i) =>
                        i === index ? { ...o, content: e.target.value } : o
                      )
                    )
                  }
                />
                <span className="text-xs text-gray-500 mt-1">
                  {order.content.length} / 200
                </span>
              </div>

              <div
                className="w-full lg:w-[120px] h-[100px] border-2 border-dashed border-gray-300 hover:border-brand flex flex-col justify-center items-center cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleStepImageDrop(e, index)}
                onClick={() => handleStepImageUpload(index)}
              >
                <MiniPictureIcon />
                <p className="text-xs mt-2">사진 업로드</p>
                <input
                  type="file"
                  ref={(el) => (stepFileInputRefs.current[index] = el)}
                  onChange={(e) => handleStepFileChange(e, index)}
                  accept="image/*"
                  className="hidden"
                />
                <p className="text-xs">{order.image?.name}</p>
              </div>

              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleRemoveOrder(index)}
              >
                <SquareIconComponent />
              </div>
            </div>
          ))}
          <button
            className="text-sm lg:text-base px-4 py-2 bg-brand text-white hover:bg-brandDark rounded-md"
            onClick={handleAddOrder}
          >
            순서 추가
          </button>
        </div>

        {/* 버튼 */}
        <div className="flex justify-center  lg:text-xl lg:justify-between gap-6 mt-16 mb-20">
          <button
            onClick={goHomePage}
            className="w-1/2 lg:w-[200px] py-3 rounded-md bg-gray-100 text-black hover:bg-gray-200"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="w-1/2 lg:w-[200px] py-3 rounded-md bg-brand hover:bg-brandDark text-white"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeAddpage;
