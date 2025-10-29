import React, { useEffect } from 'react';
import RecipeList from '../components/RecipeList';
import SearchBar from '../components/SearchBar';
import useRecipes from '../hooks/useRecipes';

const Home = () => {
    const { recipes, fetchRecipes } = useRecipes();

    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    return (
        <div className="home-container">
            <h1>Recipe Management</h1>
            <SearchBar />
            <RecipeList recipes={recipes} />
        </div>
    );
};

export default Home;