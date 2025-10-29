import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetail from './pages/RecipeDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { getUser, logout } from './services/auth';
import ProtectedRoute from './components/ProtectedRoute';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() {
    if (this.state.hasError) return (
      <div className="container mt-5">
        <h1>Something went wrong.</h1>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
    );
    return this.props.children;
  }
}

export default function App() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const onChange = () => setUser(getUser());
    window.addEventListener('auth-changed', onChange);
    return () => window.removeEventListener('auth-changed', onChange);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const isAuthPath = typeof window !== 'undefined' && (window.location.pathname === '/login' || window.location.pathname === '/signup');

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <Navbar bg="light" expand="lg" className="mb-0 shadow-sm">
            <Container>
              <LinkContainer to="/"><Navbar.Brand className="fw-bold text-primary">SavoryShelf</Navbar.Brand></LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {user && (
                    <>
                      <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                      <LinkContainer to="/add"><Nav.Link>Add Recipe</Nav.Link></LinkContainer>
                    </>
                  )}
                </Nav>
                <Nav className="ms-auto">
                  {user ? (
                    <>
                      <Nav.Link disabled className="text-muted">Hello, {user.name || user.email}</Nav.Link>
                      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </>
                  ) : (
                    <>
                      <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
                      <LinkContainer to="/signup"><Nav.Link>Sign Up</Nav.Link></LinkContainer>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* Hero */}
          {!isAuthPath && (
            <div className="hero-banner text-white d-flex align-items-center">
              <Container>
                <h1 className="display-5 fw-bold">Cook. Share. Delight.</h1>
                <p className="lead mb-3">Discover tasty recipes, save your favorites, and make every meal memorable.</p>
                <div>
                  <LinkContainer to="/add"><a className="btn btn-light btn-lg me-2">Add Your Recipe</a></LinkContainer>
                  <LinkContainer to="/"><a className="btn btn-outline-light btn-lg">Browse Recipes</a></LinkContainer>
                </div>
              </Container>
            </div>
          )}

          <Container className="flex-grow-1 my-4">
            <Routes>
              <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
              <Route path="/add" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
              <Route path="/edit/:id" element={<ProtectedRoute><EditRecipe /></ProtectedRoute>} />
              <Route path="/recipes/:id" element={<ProtectedRoute><RecipeDetail /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Container>

          <footer className="bg-light py-3 mt-4">
            <Container><p className="text-center mb-0">SavoryShelf © 2025 — Share a recipe, spark a smile.</p></Container>
          </footer>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
