import React from "react";
import "./Homepage.style.css";
import SearchContainer from "../../Component/SearchContainer/SearchContainer";
import RecommendedRecipe from "../../Component/RecommendedRecipe/RecommendedRecipe";
import MenuBar from "../../Component/Menubar/Menubar";
import { useEffect } from "react";
import checkAuthGuard from "../../hooks/checkAuthGuard";
import { useState } from "react";
import { MoonLoader } from "react-spinners";

const Homepage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#A2A2A2");
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
    return (
      <div className="flex justify-center items-center h-screen">
        {" "}
        <MoonLoader
          color={color}
          loading={loading}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
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
