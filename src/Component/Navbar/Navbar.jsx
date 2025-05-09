// import React, { useState, useEffect } from "react";
// import { Row, Col, Container } from "react-bootstrap";
// import { HomeIcon, RecipeIcon, StarIcon, MyIcon } from "../Icon/Icon"; // 아이콘 컴포넌트를 import
// import "./Navbar.style.css"; // CSS 파일을 사용한다고 가정
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [hoveredItem, setHoveredItem] = useState(null); // 어느 아이템이 마우스 오버 되었는지 저장
//   const [isClicked, setIsClicked] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const savedItem = localStorage.getItem("clickedItem");
//     if (savedItem) {
//       setIsClicked(savedItem);
//     }
//   }, []);
//   const goPage = (path, item) => {
//     navigate(path);
//     setIsClicked(item);
//     localStorage.setItem("clickedItem", item); // 상태를 localStorage에 저장
//   };
//   const handleMouseEnter = (item) => {
//     setHoveredItem(item);
//   };

//   const handleMouseLeave = () => {
//     setHoveredItem(null);
//   };

//   const isHovered = (item) => {
//     return hoveredItem === item;
//   }; // 마우스 오버 상태 확인
//   const isActive = (item) => {
//     return isClicked === item;
//   }; //얘는 goPage 함수를 통해서 클릭한 메뉴가 item일 경우  true 아님 false
//   return (
//     <div className="Icon-container">
//       <Container className="fixed-bottom" style={{ marginTop: "-200px" }}>
//         <Row className="justify-content-center text-center">
//           {/* 홈 아이콘 */}
//           <Col
//             xs="2"
//             md="2"
//             lg="2"
//             className={`nav-item ${isActive("home") ? "active" : ""}`}
//             onClick={() => goPage("/", "home")}
//             onMouseEnter={() => handleMouseEnter("home")}
//             onMouseLeave={handleMouseLeave}
//             style={{ cursor: "pointer" }}
//           >
//             <div style={{ cursor: "pointer" }}>
//               <HomeIcon
//                 isHovered={isHovered("home")}
//                 isClicked={isActive("home")}
//               />{" "}
//               {/* 상태 전달 */}
//               <div
//                 style={{
//                   color:
//                     isHovered("home") || isActive("home")
//                       ? "#fa590f"
//                       : "#afafaf",
//                 }}
//               >
//                 홈
//               </div>
//             </div>
//           </Col>

//           {/* 레시피 아이콘 */}
//           <Col
//             xs="2"
//             md="2"
//             lg="2"
//             className={`nav-item ${isActive("recipe") ? "active" : ""}`}
//             onClick={() => goPage("/recipe", "recipe")}
//             onMouseEnter={() => handleMouseEnter("recipe")}
//             onMouseLeave={handleMouseLeave}
//             style={{ cursor: "pointer" }}
//           >
//             <div style={{ cursor: "pointer" }}>
//               <RecipeIcon
//                 isHovered={isHovered("recipe")}
//                 isClicked={isActive("recipe")}
//               />{" "}
//               {/* 상태 전달 */}
//               <div
//                 style={{
//                   color:
//                     isHovered("recipe") || isActive("recipe")
//                       ? "#fa590f"
//                       : "#afafaf",
//                 }}
//               >
//                 레시피
//               </div>
//             </div>
//           </Col>

//           {/* 저장 아이콘 */}
//           <Col
//             xs="2"
//             md="2"
//             lg="2"
//             className={`nav-item ${isActive("star") ? "active" : ""}`}
//             onClick={() => goPage("/star", "star")}
//             onMouseEnter={() => handleMouseEnter("star")}
//             onMouseLeave={handleMouseLeave}
//             style={{ cursor: "pointer" }}
//           >
//             <div style={{ cursor: "pointer" }}>
//               <StarIcon
//                 isHovered={isHovered("star")}
//                 isClicked={isActive("star")}
//               />{" "}
//               {/* 상태 전달 */}
//               <div
//                 style={{
//                   color:
//                     isHovered("star") || isActive("star")
//                       ? "#fa590f"
//                       : "#afafaf",
//                 }}
//               >
//                 저장
//               </div>
//             </div>
//           </Col>

//           {/* MY 아이콘 */}
//           <Col
//             xs="2"
//             md="2"
//             lg="2"
//             className={`nav-item ${isActive("my") ? "active" : ""}`}
//             onClick={() => goPage("/mypage", "my")}
//             onMouseEnter={() => handleMouseEnter("my")}
//             onMouseLeave={handleMouseLeave}
//             style={{ cursor: "pointer" }}
//           >
//             <div style={{ cursor: "pointer" }}>
//               <MyIcon isHovered={isHovered("my")} isClicked={isActive("my")} />{" "}
//               {/* 상태 전달 */}
//               <div
//                 style={{
//                   color:
//                     isHovered("my") || isActive("my") ? "#fa590f" : "#afafaf",
//                 }}
//               >
//                 MY
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Navbar;
