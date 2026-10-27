const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

const router = express.Router();

/**
 * Helper: Validate that a string is a valid MongoDB ObjectId.
 * Returns true if valid, false otherwise.
 */
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * GET /api/recipes
 * Retrieve all recipes, sorted by createdAt descending (newest first).
 */
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/recipes/:id
 * Retrieve a single recipe by its ID.
 */
router.get('/:id', async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid recipe ID format' });
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/recipes
 * Create a new recipe with validation.
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, category, ingredients, preparationSteps, cookingTime } = req.body;

    const recipe = new Recipe({
      name,
      category,
      ingredients,
      preparationSteps,
      cookingTime,
    });

    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    // Handle Mongoose validation errors with a 400 status
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Validation failed', errors: messages });
    }
    next(err);
  }
});

/**
 * PUT /api/recipes/:id
 * Update an existing recipe by ID with validation.
 */
router.put('/:id', async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid recipe ID format' });
    }

    const { name, category, ingredients, preparationSteps, cookingTime } = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { name, category, ingredients, preparationSteps, cookingTime },
      { new: true, runValidators: true } // Return updated doc & run schema validators
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(updatedRecipe);
  } catch (err) {
    // Handle Mongoose validation errors with a 400 status
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Validation failed', errors: messages });
    }
    next(err);
  }
});

/**
 * DELETE /api/recipes/:id
 * Delete a recipe by ID.
 */
router.delete('/:id', async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid recipe ID format' });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
