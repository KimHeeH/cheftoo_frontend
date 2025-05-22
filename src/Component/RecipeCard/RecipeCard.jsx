import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const RecipeCard = ({ recipe }) => {
  const [recipeData, setRecipeData] = useState(null);
  const navigate = useNavigate();
  const handleRecipeDetail = (recipe_id) => {
    console.log("넘어가는 recipeId:", recipe_id);

    navigate(`/recipes/${recipe_id}`);
  };
  console.log("recipe:", recipe);
  console.log("recipe_id:", recipe.recipe_id);

  return (
    <div>
      <div>
        <div
          className="border-4 w-full h-[250px] lg:h-[300px] flex justify-center items-center cursor-pointer"
          onClick={() => handleRecipeDetail(recipe?.recipe_id)}
        >
          img
        </div>
        <div className="w-full text-center mt-2 font-gowun text-sm lg:text-lg">
          찹쌀떡님의{" "}
        </div>
        <div className="w-full text-center  text-md lg:text-lg font-gowun ">
          {recipe.recipe_title}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
