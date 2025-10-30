import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col, Container } from 'react-bootstrap';
import { login } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/home');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-bg"></div>
      <div className="auth-accent"></div>
      <Container>
        <Row className="align-items-center justify-content-center g-4">
          <Col xs={12} lg={6} xl={5}>
            <Card className="border-0 auth-card">
              <Card.Body className="p-4 p-md-5">
                <div className="mb-3 text-center">
                  <div className="auth-badge mb-2 mx-auto">🍳 Fresh recipes await</div>
                  <h2 className="fw-bold mb-1 auth-title">Welcome back</h2>
                  <p className="text-muted mb-0">Sign in to continue cooking</p>
                </div>
                {error && <Alert variant="danger" className="py-2">{error}</Alert>}
                <Form onSubmit={onSubmit} autoComplete="off">
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
                      placeholder="••••••••"
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      readOnly
                      onFocus={e => e.target.removeAttribute('readonly')}
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button type="submit" disabled={loading} className="auth-submit">
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </div>
                </Form>
                <div className="text-center mt-3">
                  <small className="text-muted">New here? <Link to="/signup">Create an account</Link></small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={6} xl={7}>
            <div className="auth-illustration">
              <div className="auth-illustration-content">
                <div className="auth-badge">🥗 Chef's picks</div>
                <h3 className="mt-3 mb-1">Cook. Share. Delight.</h3>
                <p className="mb-0">Discover tasty recipes and make every meal memorable.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
