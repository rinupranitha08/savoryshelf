import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import RecipeForm from '../components/RecipeForm';

export default function EditRecipe() {
  const { id } = useParams();
  const nav = useNavigate();
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/recipes/${id}`);
      setInitial(res.data);
    };
    load();
  }, [id]);

  const handleSubmit = async (data) => {
    await api.put(`/recipes/${id}`, data);
    nav('/home');
  };

  if (!initial) return <div>Loading...</div>;
  return (
    <div style={{ padding: 16 }}>
      <h2>Edit Recipe</h2>
      <RecipeForm onSubmit={handleSubmit} initial={initial} />
    </div>
  );
}