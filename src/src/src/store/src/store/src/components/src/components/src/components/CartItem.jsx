import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  selectCartItems,
  selectCartTotal,
  selectCartCount,
} from '../store/CartSlice';
import { Navbar } from './ProductList';

function ComingSoonModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>🚧 Coming Soon!</h2>
        <p>Our checkout feature is currently under construction. Stay tuned!</p>
        <button onClick={onClose}>Got it!</button>
      </div>
    </div>
  );
}

function CartItem() {
  const dispatch   = useDispatch();
  const items      = useSelector(selectCartItems);
  const total      = useSelector(selectCartTotal);
  const cartCount  = useSelector(selectCartCount);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar cartCount={cartCount} />
      <div className="cart-page">
        <h1>🛒 Your Cart</h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link
              to="/plants"
              className="btn-continue-shopping"
              style={{ marginTop: '24px', display: 'inline-block' }}
            >
              Browse Plants
            </Link>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-unit-price">
                    Unit Price: ${item.price.toFixed(2)}
                  </div>
                  <div className="cart-item-total">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <div className="cart-item-controls">
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >−</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >+</button>
                  <button
                    className="btn-delete"
                    onClick={() => dispatch(removeItem(item.id))}
                  >Delete</button>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div>Total Items: {cartCount}</div>
              <div className="cart-total-amount">
                Total: ${total.toFixed(2)}
              </div>
              <div className="cart-actions">
                <button
                  className="btn-checkout"
                  onClick={() => setShowModal(true)}
                >
                  Checkout
                </button>
                <Link to="/plants" className="btn-continue-shopping">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {showModal && <ComingSoonModal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default CartItem;
