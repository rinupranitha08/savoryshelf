const Recipe = require('../models/Recipe');

// Create a new recipe
exports.createRecipe = async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};