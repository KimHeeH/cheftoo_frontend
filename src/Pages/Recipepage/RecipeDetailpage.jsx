import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const RecipeDetailpage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  console.log("recipeId:", recipeId); // null이면 문제가 있음

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/recipes/${recipeId}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("레시피 가져오기 실패", error);
      }
    };
    fetchRecipe();
  }, [recipeId]);
  return <div>레시피 디테일일</div>;
};

export default RecipeDetailpage;
