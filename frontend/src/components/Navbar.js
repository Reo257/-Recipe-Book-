import React from 'react';

const Navbar = ({ onAddRecipe }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">🍳 Recipe Book</h1>
        <button className="btn btn-primary add-recipe-btn" onClick={onAddRecipe}>
          <span className="btn-icon">+</span> Add Recipe
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
