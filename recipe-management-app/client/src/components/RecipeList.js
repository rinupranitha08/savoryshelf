import React, { useEffect } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
    const { recipes, fetchRecipes } = useRecipes();

    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    return (
        <div className="recipe-list">
            {recipes.length > 0 ? (
                recipes.map(recipe => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))
            ) : (
                <p>No recipes found.</p>
            )}
        </div>
    );
};

export default RecipeList;