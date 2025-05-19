import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const RecipeCard = ({ recipe }) => {
  const [recipeData, setRecipeData] = useState(null);
  const navigate = useNavigate();
  const handleRecipeDetail = (recipe_id) => {
    navigate(`/recipes/${recipe_id}`);
  };
  console.log(recipe);

  return (
    <div>
      <div>
        <div
          className="border-4 w-full h-[300px] flex justify-center items-center cursor-pointer"
          onClick={() => handleRecipeDetail(recipe.recipe_id)}
        >
          img
        </div>
        <div className="w-full text-center mt-2 font-gowun text-lg">
          찹쌀떡님의{" "}
        </div>
        <div className="w-full text-center  text-lg font-gowun ">
          {recipe.recipe_title}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
