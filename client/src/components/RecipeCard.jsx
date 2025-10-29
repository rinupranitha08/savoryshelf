import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiEye, FiEdit, FiTrash2, FiHeart } from 'react-icons/fi';

export default function RecipeCard({ recipe, onDelete }) {
  const img = recipe.imageURL || `https://source.unsplash.com/collection/190727/400x250?sig=${recipe._id}`;
  return (
    <Card className="recipe-card h-100 shadow-sm">
      <Card.Img variant="top" src={img} style={{ objectFit: 'cover', height: 180 }} />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-start mb-2">
          <div>
            <Card.Title className="mb-1">{recipe.title}</Card.Title>
            <small className="text-muted">{recipe.category || 'Uncategorized'} • {recipe.cookTime || 0} min</small>
          </div>
          <Badge bg="warning" className="ms-auto text-dark align-self-start">New</Badge>
        </div>

        <Card.Text className="text-truncate" style={{ minHeight: 48 }}>
          {recipe.steps ? recipe.steps.slice(0, 100) + (recipe.steps.length > 100 ? '…' : '') : 'No description yet.'}
        </Card.Text>

        <div className="mt-auto d-flex gap-2">
          <Link to={`/recipes/${recipe._id}`} className="btn btn-outline-primary btn-sm"><FiEye /> <span className="ms-1">View</span></Link>
          <Link to={`/edit/${recipe._id}`} className="btn btn-outline-secondary btn-sm"><FiEdit /> <span className="ms-1">Edit</span></Link>
          <Button variant="outline-danger" size="sm" onClick={onDelete} className="ms-auto"><FiTrash2 /></Button>
          <Button variant={recipe.favorite ? 'danger' : 'outline-danger'} size="sm" className="ms-2"><FiHeart /></Button>
        </div>
      </Card.Body>
    </Card>
  );
}