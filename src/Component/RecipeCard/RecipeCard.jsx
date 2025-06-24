import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../RecommendedRecipe/img/firstImg.png";
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
          className="rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 cursor-pointer border-4 w-full h-[250px] lg:h-[500px] flex justify-center items-center cursor-pointer"
          onClick={() => handleRecipeDetail(recipe?.recipe_id)}
        >
          {" "}
          <img className="object-cover rounded-t-xl w-full h-full" src={img1} />
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
