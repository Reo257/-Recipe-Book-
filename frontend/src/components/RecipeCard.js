import React from 'react';

const categoryColors = {
  Breakfast: '#FF9800',
  Lunch: '#4CAF50',
  Dinner: '#C62828',
  Snack: '#9C27B0',
  Dessert: '#E91E63',
};

const defaultCategoryImages = {
  Breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&auto=format&fit=crop&q=80',
  Lunch: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
  Dinner: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80',
  Snack: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&auto=format&fit=crop&q=80',
  Dessert: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80',
};

const RecipeCard = ({ recipe, onView, onEdit, onDelete }) => {
  const badgeColor = categoryColors[recipe.category] || '#757575';
  const displayImage =
    recipe.imageUrl && recipe.imageUrl.trim().length > 0
      ? recipe.imageUrl.trim()
      : defaultCategoryImages[recipe.category] || defaultCategoryImages.Dinner;

  return (
    <div className="recipe-card" onClick={() => onView(recipe)}>
      <div className="recipe-card-media">
        <img
          src={displayImage}
          alt={recipe.name}
          className="recipe-card-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultCategoryImages[recipe.category] || defaultCategoryImages.Dinner;
          }}
        />
        <span className="category-badge card-badge-overlay" style={{ backgroundColor: badgeColor }}>
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
