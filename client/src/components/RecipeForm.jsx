import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function RecipeForm({ initial = {}, onSubmit }) {
  // Initialize state with empty values
  const [formState, setFormState] = useState({
    title: initial.title || '',
    ingredients: Array.isArray(initial.ingredients) 
      ? initial.ingredients.join('\n') 
      : '',
    steps: initial.steps || '',
    category: initial.category || '',
    cookTime: initial.cookTime || '',
    imageURL: initial.imageURL || '',
    favorite: initial.favorite || false
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log('Input changed:', name, value); // Debug log
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form:', formState); // Debug log
    
    const formData = {
      ...formState,
      ingredients: formState.ingredients
        .split('\n')
        .map(i => i.trim())
        .filter(Boolean),
      cookTime: Number(formState.cookTime) || 0
    };
    
    onSubmit(formData);
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="recipeTitle">
              <Form.Label>Recipe Title*</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formState.title}
                onChange={handleChange}
                placeholder="Enter recipe title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeIngredients">
              <Form.Label>Ingredients (one per line)</Form.Label>
              <Form.Control
                as="textarea"
                name="ingredients"
                value={formState.ingredients}
                onChange={handleChange}
                rows={4}
                placeholder="Enter ingredients"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeSteps">
              <Form.Label>Cooking Steps</Form.Label>
              <Form.Control
                as="textarea"
                name="steps"
                value={formState.steps}
                onChange={handleChange}
                rows={6}
                placeholder="Enter cooking steps"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formState.category}
                onChange={handleChange}
                placeholder="e.g., Dessert, Main Course"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeCookTime">
              <Form.Label>Cook Time (minutes)</Form.Label>
              <Form.Control
                type="number"
                name="cookTime"
                value={formState.cookTime}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="imageURL"
                value={formState.imageURL}
                onChange={handleChange}
                placeholder="https://..."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="recipeFavorite">
              <Form.Check
                type="checkbox"
                name="favorite"
                label="Mark as Favorite"
                checked={formState.favorite}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Recipe
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}