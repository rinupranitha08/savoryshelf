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
    <div className="login-split d-flex align-items-stretch">
      <Container fluid>
        <Row className="g-0 min-vh-100">
          {/* Left visual */}
          <Col lg={6} className="d-none d-lg-block">
            <div className="login-visual h-100">
              <div className="login-logo">
                <div className="mark">🍳</div>
                <div className="brand">SavoryShelf</div>
              </div>
            </div>
          </Col>

          {/* Right form panel */}
          <Col xs={12} lg={6} className="d-flex align-items-center justify-content-center p-4 p-md-5">
            <div className="w-100 d-flex justify-content-center">
              <Card className="login-card shadow border-0">
                <Card.Body className="p-4 p-md-5">
                  <div className="mb-4">
                    <h2 className="login-welcome mb-1 text-center">Welcome</h2>
                    <p className="login-muted text-center mb-0">Log in into your existing account</p>
                  </div>
                  {error && <Alert variant="danger" className="py-2">{error}</Alert>}
                  <Form onSubmit={onSubmit} autoComplete="off">
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label className="login-muted">E-mail</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        required
                        autoComplete="username"
                        readOnly
                        onFocus={e => e.target.removeAttribute('readonly')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="password">
                      <Form.Label className="login-muted">Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        readOnly
                        onFocus={e => e.target.removeAttribute('readonly')}
                      />
                    </Form.Group>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <Form.Check type="checkbox" id="terms" label="I agree to terms & conditions" />
                      <small className="text-muted"><a href="#" className="text-decoration-none">Forgot Password?</a></small>
                    </div>
                    <div className="d-grid">
                      <Button type="submit" disabled={loading} className="btn-login">
                        {loading ? 'Signing in...' : 'Login'}
                      </Button>
                    </div>
                  </Form>
                  <div className="text-center mt-3">
                    <small className="text-muted">Don't have an account? <Link to="/signup">Sign Up</Link></small>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
