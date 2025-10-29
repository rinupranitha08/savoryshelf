import React, { useEffect, useState } from 'react';
import api from '../services/api';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { Row, Col } from 'react-bootstrap';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [q, setQ] = useState('');

  const fetchRecipes = async (search = '') => {
    try {
      const res = await api.get('/recipes', { params: { search } });
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchRecipes(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this recipe?')) return;
    await api.delete(`/recipes/${id}`);
    setRecipes(prev => prev.filter(r => r._id !== id));
  };

  const handleSearch = (value) => {
    setQ(value);
    fetchRecipes(value);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Recipes</h2>
        <p className="text-muted mb-0">Find inspiration — quick, easy & delicious.</p>
      </div>

      <SearchBar value={q} onChange={handleSearch} />

      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {recipes.map(r => (
          <Col key={r._id}>
            <RecipeCard recipe={r} onDelete={() => handleDelete(r._id)} />
          </Col>
        ))}
        {recipes.length === 0 && <p className="text-center text-muted mt-4">No recipes yet — add your first delicious creation!</p>}
      </Row>
    </div>
  );
}