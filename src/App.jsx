import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';

import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-overlay" />
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>
          Bring life, color, and calm into your home with our hand-picked collection
          of beautiful houseplants.
        </p>
        <Link to="/plants" className="btn-get-started">
          Get Started 🌱
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/plants" element={<ProductList />} />
          <Route path="/cart" element={<CartItem />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
