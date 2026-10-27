import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

const RecipeList = ({ recipes, onView, onEdit, onDelete }) => {
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredRecipes =
    filterCategory === 'All'
      ? recipes
      : recipes.filter((r) => r.category === filterCategory);

  return (
    <div className="recipe-list-container">
      <div className="filter-bar">
        <label className="filter-label">Filter by Category:</label>
        <select
          className="filter-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📖</div>
          <h2>No Recipes Found</h2>
          <p>
            {filterCategory === 'All'
              ? 'Start by adding your first recipe!'
              : `No recipes in the "${filterCategory}" category yet.`}
          </p>
        </div>
      ) : (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id || recipe.id}
              recipe={recipe}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
