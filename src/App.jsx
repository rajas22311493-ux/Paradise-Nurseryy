import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';

import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

function LandingPage({ onGetStarted }) {
  return (
    <div className="background-image">
      <div className="landing-overlay" />
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>
          Bring life, color, and calm into your home with our
          hand-picked collection of beautiful houseplants.
        </p>
        <button
          className="btn-get-started"
          onClick={onGetStarted}
        >
          Get Started 🌱
        </button>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('landing');

  return (
    <Provider store={store}>
      {page === 'landing' && (
        <LandingPage onGetStarted={() => setPage('products')} />
      )}
      {page === 'products' && (
        <ProductList
          onCartClick={() => setPage('cart')}
          onHomeClick={() => setPage('landing')}
        />
      )}
      {page === 'cart' && (
        <CartItem
          onContinueShopping={() => setPage('products')}
          onHomeClick={() => setPage('landing')}
        />
      )}
    </Provider>
  );
}

export default App;
