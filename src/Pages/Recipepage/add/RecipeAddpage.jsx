import React, { useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../api/axiosInstance";
import SearchContainer from "../../../Component/SearchContainer/SearchContainer";
import Menubar from "../../../Component/Menubar/Menubar";
import {
  PictureIcon,
  MiniPictureIcon,
  SquareIconComponent,
} from "../../../Component/Menubar/Icon/Icon";

// ====== 상수/유틸 ======
const LIMIT = {
  TITLE_LEN: 20,
  CONTENT_LEN: 100,
  INGREDIENTS_MAX: 10,
  INGREDIENT_NAME_LEN: 100,
  INGREDIENT_QTY_LEN: 30,
  ORDER_CONTENT_LEN: 200,
  MAX_IMAGE_BYTES: 3 * 1024 * 1024,
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp", "image/avif"],
};

const validateRecipe = ({
  title,
  content,
  ingredients,
  seasonings,
  orders,
}) => {
  const errors = [];

  if (!title?.trim()) errors.push("레시피 제목을 입력해주세요.");
  if (title.length > LIMIT.TITLE_LEN)
    errors.push(`제목은 ${LIMIT.TITLE_LEN}자 이내로 써주세요.`);

  if (!content?.trim()) errors.push("요리 설명을 입력해주세요.");
  if (content.length > LIMIT.CONTENT_LEN)
    errors.push(`설명은 ${LIMIT.CONTENT_LEN}자 이내로 써주세요.`);

  if (ingredients.length === 0) errors.push("재료를 1개 이상 입력해주세요.");
  if (ingredients.length > LIMIT.INGREDIENTS_MAX)
    errors.push(`재료는 최대 ${LIMIT.INGREDIENTS_MAX}개까지 입력 가능합니다.`);
  ingredients.forEach(({ ingredientsName }) => {
    if (ingredientsName.length > LIMIT.INGREDIENT_NAME_LEN)
      errors.push(`재료명은 ${LIMIT.INGREDIENT_NAME_LEN}자 이내로 써주세요.`);
  });

  seasonings.forEach(({ sauceName, quantity }) => {
    if (sauceName.length > LIMIT.INGREDIENT_NAME_LEN)
      errors.push(
        `양념 이름은 ${LIMIT.INGREDIENT_NAME_LEN}자 이내로 써주세요.`
      );
    if (quantity.length > LIMIT.INGREDIENT_QTY_LEN)
      errors.push(`양념 수량은 ${LIMIT.INGREDIENT_QTY_LEN}자 이내로 써주세요.`);
  });

  orders.forEach(({ content }, i) => {
    if (!content?.trim())
      errors.push(`${i + 1}번 조리순서의 내용을 입력해주세요.`);
    if (content.length > LIMIT.ORDER_CONTENT_LEN)
      errors.push(
        `조리순서 내용은 ${LIMIT.ORDER_CONTENT_LEN}자 이내로 써주세요.`
      );
  });

  return errors;
};

const fileTooLarge = (f) => f.size > LIMIT.MAX_IMAGE_BYTES;
const fileTypeInvalid = (f) => !LIMIT.ALLOWED_TYPES.includes(f.type);

// ====== 컴포넌트 ======
const RecipeAddpage = () => {
  const navigate = useNavigate();
  const mainFileInputRef = useRef(null);
  const stepFileInputRefs = useRef([]);

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
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ====== API 유틸 ======
  const getMainImgPresignedUrl = useCallback(async (fileName, contentType) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/images/recipe-image/presigned-put`,
      { params: { contentType, fileName } }
    );
    return data; // { url, key }
  }, []);

  const getStepImgPresignedUrl = useCallback(async (fileName, contentType) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/images/cooking-order-image/presigned-put`,
      { params: { contentType, fileName } }
    );
    return data; // { url, key }
  }, []);

  // ====== 메인 이미지 핸들러 ======
  const handleMainImageDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    const valid = dropped.filter((f) => {
      if (fileTooLarge(f)) {
        return false;
      }
      if (fileTypeInvalid(f)) {
        return false;
      }
      return true;
    });
    setMainImages((prev) => [...prev, ...valid]);
  }, []);

  const handleMainImageUpload = useCallback(() => {
    mainFileInputRef.current?.click();
  }, []);

  const handleMainFileChange = useCallback((e) => {
    const selected = Array.from(e.target.files || []);
    const valid = selected.filter(
      (f) => !fileTooLarge(f) && !fileTypeInvalid(f)
    );
    setMainImages((prev) => [...prev, ...valid]);
    e.target.value = null; // 같은 파일 재선택 허용
  }, []);

  // ====== 스텝 이미지 핸들러 ======
  const handleStepImageDrop = useCallback((e, index) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || fileTooLarge(file) || fileTypeInvalid(file)) return;
    setOrders((prev) =>
      prev.map((o, i) => (i === index ? { ...o, image: file } : o))
    );
  }, []);

  const handleStepImageUpload = useCallback((index) => {
    stepFileInputRefs.current[index]?.click();
  }, []);

  const handleStepFileChange = useCallback((e, index) => {
    const file = e.target.files?.[0];
    if (!file || fileTooLarge(file) || fileTypeInvalid(file)) return;
    setOrders((prev) =>
      prev.map((o, i) => (i === index ? { ...o, image: file } : o))
    );
  }, []);

  // ====== 필드 추가/변경/삭제 ======
  const handleAddIngredient = useCallback(() => {
    if (ingredients.length >= LIMIT.INGREDIENTS_MAX) return;
    setIngredients((prev) => [
      ...prev,
      { ingredientsName: "", ingredientsNum: "" },
    ]);
  }, [ingredients.length]);

  const handleIngredientChange = useCallback((index, field, value) => {
    setIngredients((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }, []);

  const handleAddSeasoning = useCallback(() => {
    setSeasonings((prev) => [...prev, { sauceName: "", quantity: "" }]);
  }, []);

  const handleSeasoningChange = useCallback((index, field, value) => {
    setSeasonings((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }, []);

  const handleAddOrder = useCallback(() => {
    setOrders((prev) => [...prev, { content: "", image: null }]);
  }, []);

  const handleRemoveIngredient = useCallback((index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleRemoveSeasoning = useCallback((index) => {
    setSeasonings((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleRemoveOrder = useCallback((index) => {
    setOrders((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const goHomePage = useCallback(() => navigate("/"), [navigate]);

  // ====== 제출 ======
  const handleSubmit = useCallback(async () => {
    setErrors([]);
    if (!mainImages[0]) {
      setErrors(["메인 이미지를 최소 1장 업로드해주세요."]);
      return;
    }

    // 필드 검증
    const fieldErrors = validateRecipe({
      title: recipeTitleInputValue,
      content: recipeContentValue,
      ingredients,
      seasonings,
      orders,
    });
    if (fieldErrors.length) {
      setErrors(fieldErrors);
      return;
    }

    const mainImage = mainImages[0];
    if (fileTooLarge(mainImage)) {
      setErrors([`'${mainImage.name}'은 3MB를 초과합니다.`]);
      return;
    }
    if (fileTypeInvalid(mainImage)) {
      setErrors([`지원하지 않는 이미지 형식입니다. (jpg/png/webp/avif)`]);
      return;
    }

    setIsSubmitting(true);
    try {
      // 1) 메인 이미지 업로드
      const { url: mainUrl, key: recipeImageKey } =
        await getMainImgPresignedUrl(mainImage.name, mainImage.type);
      await axios.put(mainUrl, mainImage, {
        headers: { "Content-Type": mainImage.type },
      });

      // 2) 스텝 이미지 업로드
      const cookingOrder = await Promise.all(
        orders.map(async (o, idx) => {
          if (!o.image) {
            return {
              order: idx + 1,
              content: o.content,
              cookingOrderImageKey: null,
            };
          }
          if (fileTooLarge(o.image) || fileTypeInvalid(o.image)) {
            throw new Error(
              `${idx + 1}번 순서 이미지가 규격을 초과/형식 미지원입니다.`
            );
          }
          const { url, key } = await getStepImgPresignedUrl(
            o.image.name,
            o.image.type
          );
          await axios.put(url, o.image, {
            headers: { "Content-Type": o.image.type },
          });
          return {
            order: idx + 1,
            content: o.content,
            cookingOrderImageKey: key,
          };
        })
      );

      // 3) 본문 데이터 전송
      const payload = {
        recipeTitle: recipeTitleInputValue.trim(),
        recipeContent: recipeContentValue.trim(),
        ingredients,
        sauce: seasonings,
        cookingOrder,
        recipeImageKey,
        recipeImageContentType: mainImage.type,
      };

      const res = await axiosInstance.post("/recipe", payload, {
        headers: { "Content-Type": "application/json" },
      });

      // 4) 완료
      alert("레시피가 등록되었습니다.");
      navigate("/recipe");
    } catch (e) {
      console.error(e);
      setErrors([
        e?.message || "등록에 실패했습니다. 잠시 후 다시 시도해주세요.",
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    mainImages,
    recipeTitleInputValue,
    recipeContentValue,
    ingredients,
    seasonings,
    orders,
    getMainImgPresignedUrl,
    getStepImgPresignedUrl,
    navigate,
  ]);

  // ====== 렌더 ======
  return (
    <div className="font-pretendard">
      <SearchContainer />
      <Menubar />

      <div className="max-w-4xl mx-auto px-4">
        {/* 상단 */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center mt-8 pt-4 gap-4">
          <div className="flex items-center text-gray-800 lg:text-2xl font-semibold gap-2">
            <svg
              className="w-6 h-6 text-[#10B981]"
              fill="#10B981"
              viewBox="0 0 24 24"
            >
              <path d="M12 4v16m8-8H4" />
            </svg>
            레시피 등록
          </div>
        </div>

        {/* 에러 박스 */}
        {errors.length > 0 && (
          <div className="mt-4 p-3 rounded-md bg-red-50 text-red-700 text-sm">
            {errors.map((e, i) => (
              <div key={i}>• {e}</div>
            ))}
          </div>
        )}

        {/* 제목 */}
        <div className="mt-8">
          <div className="flex items-center h-10 gap-2 mb-2">
            <label className="text-gray-700 font-semibold text-sm lg:text-xl">
              레시피 제목
            </label>
            <span className="text-sm text-gray-500 ml-2">
              {recipeTitleInputValue.length} / {LIMIT.TITLE_LEN}
            </span>
          </div>
          <input
            maxLength={LIMIT.TITLE_LEN}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm lg:text-xl"
            placeholder="예) 토마토 파스타 레시피"
            value={recipeTitleInputValue}
            onChange={(e) => setRecipeTitleInputValue(e.target.value)}
          />
        </div>

        {/* 설명 */}
        <div className="mt-8">
          <div className="flex items-center h-10 gap-2 mb-2">
            <label className="text-gray-700 font-semibold text-sm lg:text-xl">
              요리 설명
            </label>
            <span className="text-sm text-gray-500 ml-2">
              {recipeContentValue.length} / {LIMIT.CONTENT_LEN}
            </span>
          </div>
          <textarea
            placeholder="토마토소스를 이용한 파스타 레시피"
            rows="3"
            value={recipeContentValue}
            onChange={(e) => setRecipeContentValue(e.target.value)}
            className="w-full resize-none p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm lg:text-base"
            maxLength={LIMIT.CONTENT_LEN}
          />
        </div>

        {/* 메인 이미지 */}
        <div className="mt-8">
          <label className="block text-gray-700 font-semibold text-sm lg:text-xl mb-2">
            요리 사진
          </label>
          <div
            className={`w-full min-h-[200px] lg:h-[300px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition
              ${
                isDragging
                  ? "border-brand bg-green-50"
                  : "border-gray-300 hover:border-brand"
              }`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
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
              type="button"
            >
              사진 등록 또는 찍기
            </button>
            <input
              ref={mainFileInputRef}
              type="file"
              accept={LIMIT.ALLOWED_TYPES.join(",")}
              multiple
              className="hidden"
              onChange={handleMainFileChange}
            />
            <div className="mt-4 space-y-1">
              {mainImages.map((img, idx) => (
                <p key={idx} className="text-sm text-gray-600">
                  {img.name}
                </p>
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
                className="w-full lg:w-1/2 p-2 border focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md text-sm lg:text-base"
                placeholder="예) 토마토"
                value={ingredient.ingredientsName}
                onChange={(e) =>
                  handleIngredientChange(
                    index,
                    "ingredientsName",
                    e.target.value
                  )
                }
                maxLength={LIMIT.INGREDIENT_NAME_LEN}
              />
              <input
                className="w-1/3 p-2 border focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md text-sm lg:text-base"
                placeholder="예) 1개"
                value={ingredient.ingredientsNum}
                onChange={(e) =>
                  handleIngredientChange(
                    index,
                    "ingredientsNum",
                    e.target.value
                  )
                }
                maxLength={LIMIT.INGREDIENT_QTY_LEN}
              />
              <button
                type="button"
                className="flex items-center"
                onClick={() => handleRemoveIngredient(index)}
                aria-label="재료 삭제"
              >
                <SquareIconComponent />
              </button>
            </div>
          ))}
          <button
            className="text-sm lg:text-base px-4 py-2 bg-brand text-white hover:bg-brandDark rounded-md disabled:opacity-50"
            onClick={handleAddIngredient}
            disabled={ingredients.length >= LIMIT.INGREDIENTS_MAX}
            type="button"
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
                className="w-full lg:w-1/2 p-2 border focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md text-sm lg:text-base"
                placeholder="예) 간장"
                value={seasoning.sauceName}
                onChange={(e) =>
                  handleSeasoningChange(index, "sauceName", e.target.value)
                }
                maxLength={LIMIT.INGREDIENT_NAME_LEN}
              />
              <input
                className="w-1/3 p-2 border focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md text-sm lg:text-base"
                placeholder="예) 1스푼"
                value={seasoning.quantity}
                onChange={(e) =>
                  handleSeasoningChange(index, "quantity", e.target.value)
                }
                maxLength={LIMIT.INGREDIENT_QTY_LEN}
              />
              <button
                type="button"
                className="flex items-center"
                onClick={() => handleRemoveSeasoning(index)}
                aria-label="양념 삭제"
              >
                <SquareIconComponent />
              </button>
            </div>
          ))}
          <button
            className="text-sm lg:text-base px-4 py-2 bg-brand text-white hover:bg-brandDark rounded-md"
            onClick={handleAddSeasoning}
            type="button"
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
                  onChange={(e) =>
                    setOrders((prev) =>
                      prev.map((o, i) =>
                        i === index ? { ...o, content: e.target.value } : o
                      )
                    )
                  }
                  maxLength={LIMIT.ORDER_CONTENT_LEN}
                  rows={3}
                />
                <span className="text-xs text-gray-500 mt-1">
                  {order.content.length} / {LIMIT.ORDER_CONTENT_LEN}
                </span>
              </div>

              <div
                className="w-full lg:w-[120px] h-[100px] border-2 border-dashed border-gray-300 hover:border-brand flex flex-col justify-center items-center cursor-pointer transition"
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => handleStepImageDrop(e, index)}
                onClick={() => handleStepImageUpload(index)}
              >
                <MiniPictureIcon />
                <p className="text-xs mt-2">사진 업로드</p>
                <input
                  type="file"
                  accept={LIMIT.ALLOWED_TYPES.join(",")}
                  ref={(el) => (stepFileInputRefs.current[index] = el)}
                  onChange={(e) => handleStepFileChange(e, index)}
                  className="hidden"
                />
                <p className="text-xs">{order.image?.name}</p>
              </div>

              <button
                type="button"
                className="flex items-center"
                onClick={() => handleRemoveOrder(index)}
                aria-label="순서 삭제"
              >
                <SquareIconComponent />
              </button>
            </div>
          ))}
          <button
            className="text-sm lg:text-base px-4 py-2 bg-brand text-white hover:bg-brandDark rounded-md"
            onClick={handleAddOrder}
            type="button"
          >
            순서 추가
          </button>
        </div>

        {/* 버튼 */}
        <div className="flex justify-center lg:text-xl lg:justify-between gap-6 mt-16 mb-20">
          <button
            onClick={goHomePage}
            className="w-1/2 lg:w-[200px] py-3 rounded-md bg-gray-100 text-black hover:bg-gray-200"
            type="button"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-1/2 lg:w-[200px] py-3 rounded-md bg-brand hover:bg-brandDark text-white disabled:opacity-50"
            type="button"
          >
            {isSubmitting ? "등록 중..." : "등록"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeAddpage;
