import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import todaysIcon from "../img/Today’s.svg";
import recipeIcon from "../img/Recipe.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchContainer.style.css";
import { useNavigate } from "react-router-dom";
const SearchContainer = () => {
  const navigate = useNavigate();
  const handleLoginPage = () => {
    navigate("/mypage");
  };
  return (
    <div className="containers">
      <Container className="bar-container">
        <Row className="align-items-center">
          <Col lg="12" className="searchContainer-login-container">
            <div
              className="searchContainer-login-button"
              onClick={handleLoginPage}
            >
              로그인
            </div>
            <div style={{ color: "#b1b1b1", marginRight: "15px" }}> | </div>
            <div
              className="searchContainer-signUp-button"
              onClick={handleLoginPage}
            >
              회원가입
            </div>
          </Col>
          <Col lg="6" className="logo-container">
            <div className="logo">
              <img src={todaysIcon} alt="Today’s Icon" />
              <img className="logo-img-2" src={recipeIcon} alt="Recipe Icon" />
            </div>
          </Col>
          <Col
            lg="6"
            md="12"
            sm="12"
            xs="12"
            className="search-input-container"
          >
            <input className="input" placeholder="요리를 검색해보세요" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchContainer;
