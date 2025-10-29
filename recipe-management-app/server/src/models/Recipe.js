import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'],
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        default: '',
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;