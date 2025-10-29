import React from 'react';

const RecipeCard = ({ recipe, onEdit, onDelete }) => {
    return (
        <div className="recipe-card">
            <h3>{recipe.title}</h3>
            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
            <button onClick={() => onEdit(recipe.id)}>Edit</button>
            <button onClick={() => onDelete(recipe.id)}>Delete</button>
        </div>
    );
};

export default RecipeCard;