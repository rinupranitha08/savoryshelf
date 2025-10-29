const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

const router = express.Router();

// GET /api/recipes?search=...  - list with optional search by title/category/ingredient
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};
    if (search) {
      const re = new RegExp(search, 'i');
      filter.$or = [
        { title: re },
        { category: re },
        { ingredients: re },
      ];
    }
    const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/recipes/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/recipes
router.post('/', async (req, res) => {
  try {
    const { title, ingredients, steps, category, cookTime, imageURL, favorite } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const ingredientsArray = Array.isArray(ingredients)
      ? ingredients
      : (typeof ingredients === 'string' ? ingredients.split('\n').map(i => i.trim()).filter(Boolean) : []);

    const recipe = new Recipe({
      title,
      ingredients: ingredientsArray,
      steps: steps || '',
      category: category || 'Uncategorized',
      cookTime: cookTime || 0,
      imageURL: imageURL || '',
      favorite: !!favorite,
    });

    const saved = await recipe.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/recipes/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const updates = req.body;
    if (updates.ingredients && typeof updates.ingredients === 'string') {
      updates.ingredients = updates.ingredients.split('\n').map(i => i.trim()).filter(Boolean);
    }

    const updated = await Recipe.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Recipe not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/recipes/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const deleted = await Recipe.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;