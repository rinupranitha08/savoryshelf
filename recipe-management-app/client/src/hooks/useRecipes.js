import { useState, useEffect } from 'react';
import api from '../services/api';

const useRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRecipes = async () => {
        try {
            const response = await api.get('/recipes');
            setRecipes(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const addRecipe = async (newRecipe) => {
        try {
            const response = await api.post('/recipes', newRecipe);
            setRecipes((prevRecipes) => [...prevRecipes, response.data]);
        } catch (err) {
            setError(err);
        }
    };

    const updateRecipe = async (id, updatedRecipe) => {
        try {
            const response = await api.put(`/recipes/${id}`, updatedRecipe);
            setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) => (recipe._id === id ? response.data : recipe))
            );
        } catch (err) {
            setError(err);
        }
    };

    const deleteRecipe = async (id) => {
        try {
            await api.delete(`/recipes/${id}`);
            setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return { recipes, loading, error, addRecipe, updateRecipe, deleteRecipe };
};

export default useRecipes;