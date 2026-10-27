const mongoose = require('mongoose');

/**
 * Recipe Schema
 * Defines the structure for recipe documents in MongoDB.
 */
const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Recipe name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'],
      message: 'Category must be one of: Breakfast, Lunch, Dinner, Snack, Dessert',
    },
  },
  ingredients: {
    type: String,
    required: [true, 'Ingredients are required'],
  },
  preparationSteps: {
    type: String,
    required: [true, 'Preparation steps are required'],
  },
  cookingTime: {
    type: Number,
    required: [true, 'Cooking time is required'],
    min: [1, 'Cooking time must be at least 1 minute'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recipe', recipeSchema);
