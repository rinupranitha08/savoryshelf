import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col, Container } from 'react-bootstrap';
import { signup } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup({ name, email, password });
      navigate('/home');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Signup failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-full">
      <div className="auth-full-bg"></div>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="border-0 auth-card">
              <Card.Body className="p-4 p-md-5">
                <div className="mb-3 text-center">
                  <div className="auth-badge mb-2 mx-auto">🍰 Join the community</div>
                  <h2 className="fw-bold mb-1 auth-title">Create your account</h2>
                  <p className="text-muted mb-0">Join SavoryShelf and share your favorites</p>
                </div>
                {error && <Alert variant="danger" className="py-2">{error}</Alert>}
                <Form onSubmit={onSubmit} autoComplete="off">
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={e=>setName(e.target.value)}
                      autoComplete="name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e=>setEmail(e.target.value)}
                      required
                      autoComplete="username"
                      readOnly
                      onFocus={e => e.target.removeAttribute('readonly')}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      readOnly
                      onFocus={e => e.target.removeAttribute('readonly')}
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button type="submit" disabled={loading} className="auth-submit">
                      {loading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </div>
                </Form>
                <div className="text-center mt-3">
                  <small className="text-muted">Already have an account? <Link to="/login">Sign in</Link></small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
