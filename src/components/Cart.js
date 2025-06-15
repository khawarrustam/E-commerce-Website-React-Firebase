import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart to see them here!</p>
        <Link to="/" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-color">Color: {item.color}</p>
                <p className="item-size">Size: {item.size}</p>
                <div className="item-price">
                  {item.oldPrice ? (
                    <>
                      <span className="old-price">Rs. {item.oldPrice}</span>
                      <span className="current-price">Rs. {item.price}</span>
                    </>
                  ) : (
                    <span className="current-price">Rs. {item.price}</span>
                  )}
                </div>
              </div>
              <div className="item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="item-total">
                Rs. {item.price * item.quantity}
              </div>
              <button 
                className="remove-item"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>Rs. {getCartTotal()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>Rs. {getCartTotal()}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart; 