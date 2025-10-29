import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../services/api';
import RecipeForm from '../components/RecipeForm';

const EditRecipe = () => {
    const { id } = useParams();
    const history = useHistory();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await api.get(`/recipes/${id}`);
                setRecipe(response.data);
            } catch (err) {
                setError('Error fetching recipe');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleUpdate = async (updatedRecipe) => {
        try {
            await api.put(`/recipes/${id}`, updatedRecipe);
            history.push('/');
        } catch (err) {
            setError('Error updating recipe');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Edit Recipe</h1>
            {recipe && (
                <RecipeForm
                    initialData={recipe}
                    onSubmit={handleUpdate}
                />
            )}
        </div>
    );
};

export default EditRecipe;