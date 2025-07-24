import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../RecommendedRecipe/img/recipeImage.png";
const RecipeCard = ({ recipe }) => {
  const [recipeData, setRecipeData] = useState(null);
  const navigate = useNavigate();
  const handleRecipeDetail = (recipe_id) => {
    navigate(`/recipes/${recipe_id}`);
  };

  return (
    <div>
      <div
        className="rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 cursor-pointer border-4 w-full h-[250px] lg:h-[460px] flex justify-center items-center cursor-pointer"
        onClick={() => handleRecipeDetail(recipe?.recipe_id)}
      >
        {" "}
        <img
          className="object-cover rounded-t-xl w-full h-full"
          src={recipe?.img_path}
          alt="recipeImg"
        />
      </div>
      <div className="w-full text-center mt-2  text-sm lg:text-lg">
        {recipe.nick_name}님의
      </div>
      <div className="w-full text-center  text-md lg:text-lg ">
        {recipe.recipe_title}
      </div>
    </div>
  );
};

export default RecipeCard;
