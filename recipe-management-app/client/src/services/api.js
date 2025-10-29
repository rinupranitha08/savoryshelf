import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recipes';

// Function to get all recipes
export const getAllRecipes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to get a recipe by ID
export const getRecipeById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to create a new recipe
export const createRecipe = async (recipeData) => {
    try {
        const response = await axios.post(API_URL, recipeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to update an existing recipe
export const updateRecipe = async (id, recipeData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, recipeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to delete a recipe
export const deleteRecipe = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw error;
    }
};