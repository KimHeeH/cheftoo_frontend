import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import todaysIcon from "../img/Today’s.svg";
import recipeIcon from "../img/Recipe.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchContainer.style.css";

const SearchContainer = () => {
  return (
    <div className="containers">
      <Container className="bar-container">
        <Row className="align-items-center">
          <Col lg="6" className="logo-container">
            <div className="logo">
              <img src={todaysIcon} alt="Today’s Icon" />
              <img src={recipeIcon} alt="Recipe Icon" />
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
