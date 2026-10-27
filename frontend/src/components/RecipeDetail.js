import React from 'react';

const categoryColors = {
  Breakfast: '#FF9800',
  Lunch: '#4CAF50',
  Dinner: '#C62828',
  Snack: '#9C27B0',
  Dessert: '#E91E63',
};

const RecipeDetail = ({ recipe, onClose, onEdit, onDelete }) => {
  if (!recipe) return null;

  const badgeColor = categoryColors[recipe.category] || '#757575';

  // Split ingredients by newline or comma
  const ingredientsList = recipe.ingredients
    ? recipe.ingredients
        .split(/[\n,]+/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    : [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{recipe.name}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="detail-body">
          <div className="detail-meta">
            <span className="category-badge" style={{ backgroundColor: badgeColor }}>
              {recipe.category}
            </span>
            <span className="detail-time">
              <span className="time-icon">⏱️</span> {recipe.cookingTime} minutes
            </span>
          </div>

          <div className="detail-section">
            <h3>🥘 Ingredients</h3>
            <ul className="ingredients-list">
              {ingredientsList.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h3>📝 Preparation Steps</h3>
            <p className="preparation-steps">{recipe.preparationSteps}</p>
          </div>
        </div>

        <div className="detail-actions">
          <button
            className="btn btn-edit"
            onClick={() => {
              onClose();
              onEdit(recipe);
            }}
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn-delete"
            onClick={() => {
              onClose();
              onDelete(recipe);
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
