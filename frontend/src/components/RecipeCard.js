import React from 'react';

const categoryColors = {
  Breakfast: '#FF9800',
  Lunch: '#4CAF50',
  Dinner: '#C62828',
  Snack: '#9C27B0',
  Dessert: '#E91E63',
};

const RecipeCard = ({ recipe, onView, onEdit, onDelete }) => {
  const badgeColor = categoryColors[recipe.category] || '#757575';

  return (
    <div className="recipe-card" onClick={() => onView(recipe)}>
      <div className="recipe-card-header">
        <span className="category-badge" style={{ backgroundColor: badgeColor }}>
          {recipe.category}
        </span>
      </div>
      <div className="recipe-card-body">
        <h3 className="recipe-card-title">{recipe.name}</h3>
        <div className="recipe-card-meta">
          <span className="cooking-time">
            <span className="time-icon">⏱️</span> {recipe.cookingTime} min
          </span>
        </div>
      </div>
      <div className="recipe-card-actions">
        <button
          className="btn btn-edit"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(recipe);
          }}
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(recipe);
          }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
