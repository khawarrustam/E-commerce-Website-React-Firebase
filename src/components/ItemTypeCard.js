import React from 'react';
import './ItemTypeCard.css';
import { useCartState } from '../hooks/useCartState';

function ItemTypeCard({ item }) {
  const { addToCart } = useCartState();

  const handleAddToCart = () => {
    console.log('Adding item to cart:', item);
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      color: item.color,
      size: item.size,
      quantity: 1
    });
  };

  return (
    <div className="item-type-card">
      <div className="item-type-img-wrapper">
        <img src={item.image} alt={item.name} className="item-type-img" />
        {item.isNew && <span className="badge-new">New</span>}
        {item.discount && <span className="badge-discount">-{item.discount}%</span>}
      </div>
      <div className="item-type-info">
        <div className="item-type-name">{item.name}</div>
        <div className="item-type-details">
          <span>Color: {item.color}</span> | <span>Size: {item.size}</span>
        </div>
        <div className="item-type-price">
          {item.oldPrice && <span className="old-price">Rs.{item.oldPrice}</span>}
          <span className="new-price">Rs.{item.price}</span>
        </div>
        <button 
          className="add-to-cart-btn" 
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ItemTypeCard; 