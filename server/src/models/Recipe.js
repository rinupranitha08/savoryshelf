const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  ingredients: { type: [String], default: [] },
  steps: { type: String, default: '' },
  category: { type: String, default: 'Uncategorized' },
  cookTime: { type: Number, default: 0 }, // minutes
  imageURL: { type: String, default: '' },
  favorite: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);