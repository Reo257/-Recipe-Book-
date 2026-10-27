import React, { useState, useEffect } from 'react';

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

const RecipeForm = ({ recipe, onSubmit, onClose }) => {
  const isEditing = !!recipe;

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    ingredients: '',
    preparationSteps: '',
    cookingTime: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name || '',
        category: recipe.category || '',
        ingredients: recipe.ingredients || '',
        preparationSteps: recipe.preparationSteps || '',
        cookingTime: recipe.cookingTime || '',
      });
    }
  }, [recipe]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Recipe name is required.';
    if (!formData.category) newErrors.category = 'Please select a category.';
    if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required.';
    if (!formData.preparationSteps.trim()) newErrors.preparationSteps = 'Preparation steps are required.';
    if (!formData.cookingTime || Number(formData.cookingTime) < 1)
      newErrors.cookingTime = 'Cooking time must be at least 1 minute.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      ...formData,
      cookingTime: Number(formData.cookingTime),
    };
    onSubmit(payload, isEditing ? recipe._id || recipe.id : null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? '✏️ Edit Recipe' : '➕ Add New Recipe'}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-group">
            <label htmlFor="name">Recipe Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Spaghetti Bolognese"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'input-error' : ''}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Enter each ingredient on a new line"
              rows="5"
              className={errors.ingredients ? 'input-error' : ''}
            />
            {errors.ingredients && <span className="error-message">{errors.ingredients}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="preparationSteps">Preparation Steps</label>
            <textarea
              id="preparationSteps"
              name="preparationSteps"
              value={formData.preparationSteps}
              onChange={handleChange}
              placeholder="Describe the preparation steps"
              rows="5"
              className={errors.preparationSteps ? 'input-error' : ''}
            />
            {errors.preparationSteps && (
              <span className="error-message">{errors.preparationSteps}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              placeholder="e.g. 30"
              min="1"
              className={errors.cookingTime ? 'input-error' : ''}
            />
            {errors.cookingTime && <span className="error-message">{errors.cookingTime}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Recipe' : 'Add Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
