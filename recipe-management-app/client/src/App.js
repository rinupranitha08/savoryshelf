import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import EditRecipe from './pages/EditRecipe';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/recipe/:id" component={RecipeDetail} />
          <Route path="/edit/:id" component={EditRecipe} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;