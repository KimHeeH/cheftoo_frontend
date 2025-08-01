import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const handleRecipeDetail = (recipe_id) => {
    navigate(`/recipes/${recipe_id}`);
  };

  return (
    <div>
      <div
        className="rounded-[10rem] shadow-md hover:shadow-lg transition-transform hover:scale-105 cursor-pointer  w-full h-[180px] lg:h-[420px] flex justify-center items-center cursor-pointer"
        onClick={() => handleRecipeDetail(recipe?.recipe_id)}
      >
        {" "}
        <img
          className="object-cover rounded-t-xl w-full h-full"
          src={recipe?.img_path}
          alt="recipeImg"
        />
      </div>
      <div className="w-full font-semibold  mt-2  text-sm lg:text-xl">
        {recipe.recipe_title}
      </div>
      <div className="w-full lg:mt-1  text-xs lg:text-lg ">
        {recipe.recipe_content}
      </div>
    </div>
  );
};

export default RecipeCard;
