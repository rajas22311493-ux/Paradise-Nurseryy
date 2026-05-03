import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  selectCartItems,
  selectCartTotal,
  selectCartCount,
} from '../store/CartSlice';

function CartItem({ onContinueShopping, onHomeClick }) {
  const dispatch  = useDispatch();
  const items     = useSelector(selectCartItems);
  const total     = useSelector(selectCartTotal);
  const cartCount = useSelector(selectCartCount);
  const [showModal, setShowModal] = useState(false);

  // Dynamically recalculates on every render when quantity changes
  const calculateTotalAmount = () =>
    items
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

  // Dynamically recalculates per-item cost on every render
  const calculateTotalCost = (item) =>
    (item.price * item.quantity).toFixed(2);

  const handleIncrement = (item) => dispatch(increaseQuantity(item.id));

  // Decrements quantity; removes item if quantity reaches zero (handled in slice)
  const handleDecrement = (item) => dispatch(decreaseQuantity(item.id));

  // Explicitly removes item from cart regardless of quantity
  const handleRemove = (item) => dispatch(removeItem(item.id));

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>
          🌿 Paradise Nursery
        </div>
        <ul className="navbar-links">
          <li onClick={onHomeClick}>Home</li>
          <li onClick={onContinueShopping}>Plants</li>
          <li>
            <div className="cart-icon-wrapper">
              🛒
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </div>
          </li>
        </ul>
      </nav>

      {/* CART PAGE */}
      <div className="cart-page">
        <h1>🛒 Your Shopping Cart</h1>

        {/* Total cart amount — updates dynamically */}
        <div className="cart-total-amount" style={{ marginBottom: '24px' }}>
          Total Cart Amount: ${calculateTotalAmount()}
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <button
              className="btn-continue-shopping"
              onClick={onContinueShopping}
              style={{ marginTop: '24px' }}
            >
              Browse Plants
            </button>
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
                  {/* Updates dynamically on quantity change */}
                  <div className="cart-item-total">
                    Total Cost: ${calculateTotalCost(item)}
                  </div>
                </div>

                <div className="cart-item-controls">
                  <button
                    className="qty-btn"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleRemove(item)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}

            {/* ORDER SUMMARY */}
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div>Total Items: {cartCount}</div>
              <div className="cart-total-amount">
                Total Amount: ${calculateTotalAmount()}
              </div>
              <div className="cart-actions">
                <button
                  className="btn-checkout"
                  onClick={() => setShowModal(true)}
                >
                  Checkout
                </button>
                <button
                  className="btn-continue-shopping"
                  onClick={onContinueShopping}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* COMING SOON MODAL */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>🚧 Coming Soon!</h2>
            <p>
              Our checkout feature is currently under construction.
              Stay tuned for updates!
            </p>
            <button onClick={() => setShowModal(false)}>Got it!</button>
          </div>
        </div>
      )}
    </>
  );
}

export default CartItem;
