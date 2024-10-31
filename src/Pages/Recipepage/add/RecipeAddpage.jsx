import React from "react";
import { useState } from "react";
import { BackIcon } from "../../../Component/Icon/Icon";
import { PictureIcon } from "../../../Component/Icon/Icon";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // useNavigate import
import "./RecipeAddpage.style.css";
const RecipeAddpage = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [seasonings, setSeasonings] = useState([{ name: "", quantity: "" }]);
  const navigate = useNavigate();
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (event) => {
    event.preventDefault(); // 기본 동작 방지
    setIsDragging(false); // 드래그 상태 해제
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile); // 파일 상태 설정
      console.log(droppedFile); // 파일 정보 출력
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
  const handleFileChange = () => {};
  return (
    <Container className="d-flex flex-column align-items-center  mt-5">
      <Row className="w-100">
        <Col
          className="justify-content-flex-start"
          xs="auto"
          style={{ cursor: "pointer" }}
          onClick={handlePage}
        >
          <BackIcon className="backIcon" />
        </Col>
      </Row>
      <div className="writeRecipe-container">
        <div className="writeRecipe-titleContainer">
          <div className="writeRecipe-title">레시피 제목</div>
          <div className="writeRecipe-titleInputContainer">
            <input placeholder="예) 토마토 파스타 레시피" />
          </div>
        </div>

        <div className="writeRecipe-descriptionContainer">
          <div className="writeRecipe-description">요리 설명</div>
          <div className="writeRecipe-descriptionInputContainer">
            <input placeholder="예) 집에서 해먹기 좋은 토마토 파스타입니다." />
          </div>
        </div>

        <div className="writeRecipe-pictureContainer">
          <div className="writeRecipe-picture">요리 사진</div>
          <div
            className={`writeRecipe-pictureBox ${isDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handlePictureUpload}
          >
            <div className="writeRecipe-pictureIconContainer">
              <PictureIcon className="writeRecipe-pictureIcon" />
              <div className="writeRecipe-pictureBoxFont">
                파일을 끌어서
                <br /> 이곳에 놓아주세요!
              </div>
            </div>
            <p>{file ? `파일: ${file.name}` : ""}</p>

            <div className="writeRecipe-pictureInputContainer">
              <input type="file" onChange={() => handleFileChange()} />
            </div>
          </div>
        </div>
        <div className="writeRecipe-ingredientContainer">
          <div className="writeRecipe-ingrendient">재료</div>
          {ingredients.map((ingredient, index) => (
            <div className="writeRecipe-ingrendientInputContainer" key={index}>
              <input
                placeholder="예) 토마토"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
              />
              <input
                placeholder="예) 1개"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
              />
            </div>
          ))}
        </div>
        <div className="writeRecipe-addIngredientButtonContainer">
          <button
            className="writeRecipe-addIngredientButton"
            onClick={handleAddIngredient}
          >
            재료 추가
          </button>
        </div>
        <div className="writeRecipe-seasoningContainer">
          <div className="writeRecipe-seasoning">양념</div>
          {seasonings.map((seasoning, index) => (
            <div className="writeRecipe-seasoningInputContainer" key={index}>
              <input
                placeholder="예) 간장"
                value={seasoning.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
              />
              <input
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
            className="writeRecipe-addSeasoninngButton"
            onClick={handleAddSeasoning}
          >
            양념 추가
          </button>
        </div>
      </div>
    </Container>
  );
};

export default RecipeAddpage;