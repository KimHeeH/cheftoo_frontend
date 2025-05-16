import React from "react";
import "./Homepage.style.css";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import RecommendedRecipe from "../../Component/RecommendedRecipe/RecommendedRecipe";
import MenuBar from "../../Component/Menubar/Menubar";
import { useEffect } from "react";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import { useState } from "react";
import Loader from "../../Component/Loader";

const Homepage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const status = await checkAuthGuard();
        setIsAuthenticated(status === 200);
      } catch (err) {
        console.error("Authentication Check Error:", err);
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);
  if (isAuthenticated === null) {
    return <Loader />;
  }
  return (
    <div className="h-screen overflow-hidden">
      <SearchContainer />
      <MenuBar />
      <RecommendedRecipe />
    </div>
  );
};

export default Homepage;
