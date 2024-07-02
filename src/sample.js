import React, { useState } from 'react';
import './App.css';

const MAX_INGREDIENTS = 4;

const RecipeCard = ({ recipe, addToFavorites }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddToFavorites = () => {
    addToFavorites(recipe);
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const visibleIngredients = isExpanded
    ? recipe.ingredientLines
    : recipe.ingredientLines.slice(0, MAX_INGREDIENTS);

  return (
    <div className="recipe-card">
      <img
        className="recipe-card-img"
        src={recipe.image}
        alt={recipe.label}
      />
      <div className="recipe-details">
        <h1 className="recipe-title">{recipe.label}</h1>

        <div className="recipe-ingredients">
          <span className="ingredient-header">Ingredients:</span>
          <ul className="ingredient-list">
            {visibleIngredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                {ingredient}
              </li>
            ))}
          </ul>
          {recipe.ingredientLines.length > MAX_INGREDIENTS && (
            <a href="#" onClick={toggleExpanded} className="toggle-link">
              {isExpanded ? 'Collapse' : 'Expand'}
            </a>
          )}
        </div>

        <div className="recipe-info">
          <span>Calories: {recipe.calories.toFixed(2)}<br/></span>
          <span>Protein: {recipe.totalNutrients.PROCNT.quantity.toFixed(2)} {recipe.totalNutrients.PROCNT.unit}<br/></span>
          <span>Fat: {recipe.totalNutrients.FAT.quantity.toFixed(2)} {recipe.totalNutrients.FAT.unit}<br/></span>
        </div>

        <div className="recipe-buttons">
          <button onClick={handleAddToFavorites} className="search-button">
            Add to Favorites
          </button>
          <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="view-more-link">
            View Recipe
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
