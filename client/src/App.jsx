import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

  function AuthAwareHero() {
    const location = useLocation();
    const isAuthPath = location.pathname === '/login' || location.pathname === '/signup';
    if (isAuthPath) return null;
    return (
      <div className="hero-banner text-white d-flex align-items-center">
        <Container>
          <h1 className="display-5 fw-bold">Cook. Share. Delight.</h1>
          <p className="lead mb-3">Discover tasty recipes, save your favorites, and make every meal memorable.</p>
          <div>
            <LinkContainer to="/add"><a className="btn btn-light btn-lg me-2">Add Your Recipe</a></LinkContainer>
            <LinkContainer to="/home"><a className="btn btn-outline-light btn-lg">Browse Recipes</a></LinkContainer>
          </div>
        </Container>
      </div>
    );
  }

  function AppContent() {
    const location = useLocation();
    const onRoot = location.pathname === '/';
    const isAuthPath = location.pathname === '/login' || location.pathname === '/signup';
    return (
      <div className="d-flex flex-column min-vh-100">
        {!onRoot && !isAuthPath && (
          <Navbar bg="light" expand="lg" className="mb-0 shadow-sm">
            <Container>
              <LinkContainer to="/home"><Navbar.Brand className="fw-bold text-primary">SavoryShelf</Navbar.Brand></LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {user && (
                    <>
                      <LinkContainer to="/home"><Nav.Link>Home</Nav.Link></LinkContainer>
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
        )}

        {/* Hero */}
        {!onRoot && !isAuthPath && <AuthAwareHero />}

        {isAuthPath ? (
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Navigate to="/signup" replace />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/add" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
              <Route path="/edit/:id" element={<ProtectedRoute><EditRecipe /></ProtectedRoute>} />
              <Route path="/recipes/:id" element={<ProtectedRoute><RecipeDetail /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        ) : (
          <Container className="flex-grow-1 my-4">
            <Routes>
              <Route path="/" element={<Navigate to="/signup" replace />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/add" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
              <Route path="/edit/:id" element={<ProtectedRoute><EditRecipe /></ProtectedRoute>} />
              <Route path="/recipes/:id" element={<ProtectedRoute><RecipeDetail /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Container>
        )}

        {!onRoot && !isAuthPath && (
          <footer className="bg-light py-3 mt-4">
            <Container><p className="text-center mb-0">SavoryShelf © 2025 — Share a recipe, spark a smile.</p></Container>
          </footer>
        )}
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
