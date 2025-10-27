import React from "react";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { useState } from "react";
const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const handleRecipeDetail = (recipe_id) => {
    navigate(`/recipes/${recipe_id}`);
  };

  return (
    <div className="">
      <div
        className=" shadow-md hover:shadow-lg transition-transform hover:scale-105 w-full h-[180px] lg:h-[420px] flex justify-center items-center cursor-pointer"
        onClick={() => handleRecipeDetail(recipe?.recipe_id)}
      >
        {" "}
        <LazyLoad
          className="block w-full h-full"
          offset={100}
          once={true}
          placeholder={
            <div className="w-full h-full bg-gray-200 animate-pulse rounded-t-xl" />
          }
        >
          {" "}
          <img
            className={`object-cover rounded-t-xl w-full h-full transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            src={recipe?.img_path}
            alt="recipeImg"
            onLoad={() => setLoaded(true)}
          />
        </LazyLoad>
      </div>
      <div className="w-full font-semibold  mt-2 lg:mt-4  text-base lg:text-3xl">
        {recipe.recipe_title}
      </div>
    </div>
  );
};

export default RecipeCard;
