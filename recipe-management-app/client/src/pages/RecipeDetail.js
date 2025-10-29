import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await api.get(`/recipes/${id}`);
                setRecipe(response.data);
            } catch (err) {
                setError('Error fetching recipe details');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>{recipe.title}</h1>
            <h2>Category: {recipe.category}</h2>
            <h3>Ingredients:</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Preparation Steps:</h3>
            <p>{recipe.instructions}</p>
            <h3>Cooking Time:</h3>
            <p>{recipe.cookingTime} minutes</p>
        </div>
    );
};

export default RecipeDetail;