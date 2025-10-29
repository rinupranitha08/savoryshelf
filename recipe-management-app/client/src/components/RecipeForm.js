import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createRecipe, updateRecipe } from '../services/api';

const RecipeForm = ({ recipeToEdit }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [category, setCategory] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (recipeToEdit) {
            setTitle(recipeToEdit.title);
            setIngredients(recipeToEdit.ingredients);
            setInstructions(recipeToEdit.instructions);
            setCategory(recipeToEdit.category);
            setCookingTime(recipeToEdit.cookingTime);
        }
    }, [recipeToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const recipeData = { title, ingredients, instructions, category, cookingTime };

        if (recipeToEdit) {
            await updateRecipe(recipeToEdit._id, recipeData);
        } else {
            await createRecipe(recipeData);
        }

        history.push('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{recipeToEdit ? 'Edit Recipe' : 'Add New Recipe'}</h2>
            <div>
                <label>Recipe Name:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Ingredients:</label>
                <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
            </div>
            <div>
                <label>Instructions:</label>
                <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
            </div>
            <div>
                <label>Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
            <div>
                <label>Cooking Time:</label>
                <input type="text" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} required />
            </div>
            <button type="submit">{recipeToEdit ? 'Update Recipe' : 'Add Recipe'}</button>
        </form>
    );
};

export default RecipeForm;