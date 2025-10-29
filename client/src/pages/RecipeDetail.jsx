import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Badge, Button } from 'react-bootstrap';
import { FiEdit, FiArrowLeft } from 'react-icons/fi';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    api.get(`/recipes/${id}`).then(r => setRecipe(r.data)).catch(console.error);
  }, [id]);

  if (!recipe) return <div>Loading...</div>;
  const img = recipe.imageURL || `https://source.unsplash.com/collection/190727/1000x400?sig=${id}`;

  return (
    <div>
      <div className="detail-hero mb-4" style={{ backgroundImage: `url(${img})` }}>
        <div className="detail-hero-overlay">
          <div className="container text-white py-5">
            <Link to="/" className="btn btn-light btn-sm mb-3"><FiArrowLeft /> Back</Link>
            <h1 className="display-6 fw-bold">{recipe.title}</h1>
            <p className="mb-1"><Badge bg="info" className="me-2">{recipe.category}</Badge> {recipe.cookTime} min</p>
          </div>
        </div>
      </div>

      <div className="container">
        <h4>Ingredients</h4>
        <ul>{(recipe.ingredients || []).map((i, idx) => <li key={idx}>{i}</li>)}</ul>

        <h4>Steps</h4>
        <div style={{ whiteSpace: 'pre-wrap' }}>{recipe.steps}</div>

        <div className="mt-4">
          <Link to={`/edit/${recipe._id}`} className="btn btn-outline-secondary me-2"><FiEdit /> Edit</Link>
          <Button variant="primary" className="ms-2">Save to Favorites</Button>
        </div>
      </div>
    </div>
  );
}