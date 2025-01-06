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
  const CLIENT_ID = `${process.env.REACT_APP_REST_API_KEY}`;

  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URI_LOCAL}`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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
  const kakaoLoginHandler = () => {
    window.location.href = kakaoURL;
  };

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
      <Container className="d-flex flex-column align-items-center">
        <Row className="w-100 MyPage-container">
          <Col
            className="justify-content-flex-start"
            xs="auto"
            style={{ cursor: "pointer" }}
            onClick={handlePage}
          >
            <BackIcon className="backIcon" />
          </Col>
        </Row>
        <div className="MyPage-logo-container">
          <div>
            <img src={todayIcon} alt="Today" />
          </div>
          <div>
            <img src={recipeIcon} alt="Recipe" />
          </div>
        </div>
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
        <div
          className="login-signUp-font"
          style={{
            fontWeight: "400",
            fontSize: "18px",
            color: "#808080",
          }}
        >
          로그인/회원가입
        </div>
        <div className="login-font">
          간편하게 로그인하고 <br />
          다양한 서비스를 이용해보세요.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      ></div>
      {/* 카카오 버튼 */}
      <div
        className="kakao-button-container"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={kakaoLoginHandler}
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
