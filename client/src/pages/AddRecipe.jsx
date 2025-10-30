import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import RecipeForm from '../components/RecipeForm';
import api from '../services/api';

export default function AddRecipe() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      console.log('Submitting to API:', formData); // Debug log
      await api.post('/recipes', formData);
      navigate('/home');
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Failed to add recipe. Please try again.');
    }
  };

  return (
    <Container>
      <h2 className="mb-4">Add New Recipe</h2>
      <RecipeForm onSubmit={handleSubmit} />
    </Container>
  );
}