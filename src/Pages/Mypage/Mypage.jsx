import React, { useState, useEffect } from "react";
import "./Mypage.style.css";
import { BackIcon } from "../../Component/Icon/Icon";
import todayIcon from "./img/Today.svg";
import recipeIcon from "./img/Recipe.svg";
import { Container, Row, Col } from "react-bootstrap";
import buttonImgLarge from "./img/kakao_login_medium_wide.png";
import buttonImgSmall from "./img/kakao_login_medium_wide.png"; // 작은 화면용 이미지
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom"; // useNavigate import
import Navbar from "../../Component/Navbar/Navbar";
import { useLocation } from "react-router-dom";

const Mypage = () => {
  const [buttonImg, setButtonImg] = useState(buttonImgLarge);
  const location = useLocation();
  const { item } = location.state || {}; // item 데이터 받기
  const [isHovered, setIsHovered] = useState("");
  //#fa590f(주황색)
  //afafaf(회색)
  console.log("MY Page", { item });
  const itemCheck = (item) => {
    if (item == "my") {
      setIsHovered("my");
    }
  };

  const navigate = useNavigate();
  const handlePage = () => {
    navigate("/");
  };
  // 화면 크기에 따라 이미지 변경
  useEffect(() => {
    const updateButtonImg = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setButtonImg(buttonImgSmall);
      } else {
        setButtonImg(buttonImgLarge);
      }
    };

    // 처음에 이미지 설정
    updateButtonImg();

    // 화면 크기가 변경될 때마다 이미지 업데이트
    window.addEventListener("resize", updateButtonImg);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => window.removeEventListener("resize", updateButtonImg);
  }, []);

  return (
    <div>
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

        <Row className="justify-content-center">
          <Col xs="auto" className="logo-img logo-img1">
            <img src={todayIcon} alt="Today" />
          </Col>
          <Col xs="auto" className="logo-img logo-img2">
            <img src={recipeIcon} alt="Recipe" />
          </Col>
        </Row>
      </Container>

      {/* 로그인 입력 필드 */}
      <div
        className="login-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginTop: "50px", fontWeight: "500", fontSize: "20px" }}>
          로그인/회원가입
        </div>

        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
            style={{ marginTop: "60px" }}
          >
            <Form.Label column sm="4">
              아이디
            </Form.Label>
            <Col sm="12">
              <Form.Control placeholder="아이디" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4">
              비밀번호
            </Form.Label>
            <Col sm="12">
              <Form.Control type="password" placeholder="비밀번호" />
            </Col>
          </Form.Group>
        </Form>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <div className="login-button"> 로그인</div>
      </div>
      {/* 카카오 버튼 */}
      <div
        className="kakao-button-container"
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <img src={buttonImg} alt="카카오버튼" />
      </div>

      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default Mypage;
