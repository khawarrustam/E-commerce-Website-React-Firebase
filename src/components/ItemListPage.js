import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../CartContext';
import './ItemListPage.css';

function ItemListPage() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const itemsByCategory = {
    gents: [
      {
        id: 1,
        name: "Classic Black Shalwar Kameez",
        color: "Black",
        price: 4999,
        image: "https://www.junaidjamshed.com/media/catalog/product/j/j/jjks-30729_1__8.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=755&width=589&canvas=589:755&dpr=2",
        size: "Regular",
        isNew: true,
        discount: 20
      },
      {
        id: 2,
        name: "Brown Blended Shalwar Kameez",
        color: "Brown",
        price: 5999,
        image: "https://www.junaidjamshed.com/media/catalog/product/4/7/47005-1_2.jpg?width=436&height=560&canvas=436,560&optimize=medium&bg-color=255,255,255&fit=bounds",
        size: "Regular",
        isNew: false,
        discount: 15
      },
      {
        id: 3,
        name: "Grey Blended Shalwar Kameez",
        color: "Grey",
        price: 3999,
        image: "https://www.junaidjamshed.com/media/catalog/product/3/0/30821r26_1__10.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=755&width=589&canvas=589:755&dpr=2",
        size: "Regular",
        isNew: true,
        discount: 0
      }
    ],
    ladies: [
      {
        id: 4,
        name: "Pink Lawn 2 pc",
        color: "Pink",
        price: 4499,
        image: "https://www.junaidjamshed.com/media/catalog/product/j/s/jst-25-2120_1_.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=755&width=589&canvas=589:755&dpr=2",
        size: "Regular",
        isNew: true,
        discount: 10
      },
      {
        id: 5,
        name: "Red Dyed Lawn 2 pc",
        color: "Red",
        price: 6999,
        image: "https://www.junaidjamshed.com/media/catalog/product/j/s/jst-25-2108_1_.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=755&width=589&canvas=589:755&dpr=2",
        size: "Regular",
        isNew: false,
        discount: 25
      },
      {
        id: 6,
        name: "Black Lawn 2 pc",
        color: "Black",
        price: 5499,
        image: "https://www.junaidjamshed.com/media/catalog/product/j/s/jst-25-2117_1_.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=755&width=589&canvas=589:755&dpr=2",
        size: "Regular",
        isNew: true,
        discount: 15
      }
    ],
    makeup: [
      {
        id: 7,
        name: "Makeup Remover",
        color: "Multi",
        price: 2999,
        image: "https://www.junaidjamshed.com/media/catalog/product/m/a/makeup-remover.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=755&width=589&canvas=589:755&dpr=2",
        size: "Standard",
        isNew: true,
        discount: 0
      },
      {
        id: 8,
        name: "Foundation",
        color: "Multi",
        price: 1999,
        image: "https://www.junaidjamshed.com/media/catalog/product/m/a/mattifying_extreme_wear_foundation.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=755&width=589&canvas=589:755&dpr=2",
        size: "Standard",
        isNew: false,
        discount: 20
      },
      {
        id: 9,
        name: "Highlighter",
        color: "Multi",
        price: 3999,
        image: "https://www.junaidjamshed.com/media/catalog/product/d/r/drop-high.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=755&width=589&canvas=589:755&dpr=2",
        size: "Standard",
        isNew: true,
        discount: 10
      }
    ],
    fragrances: [
      {
        id: 10,
        name: "Marjan",
        color: "Multi",
        price: 3999,
        image: "https://www.junaidjamshed.com/media/catalog/product/m/a/marjaan-01.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=755&width=589&canvas=589:755&dpr=2",
        size: "Standard",
        isNew: false,
        discount: 15
      },
      {
        id: 11,
        name: "White Musk",
        color: "Multi",
        price: 4999,
        image: "https://www.junaidjamshed.com/media/catalog/product/w/h/white_musk1_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=755&width=589&canvas=589:755&dpr=2",
        size: "Standard",
        isNew: true,
        discount: 0
      },
      {
        id: 12,
        name: "Essence",
        color: "Multi",
        price: 5999,
        image: "https://www.junaidjamshed.com/media/catalog/product/e/s/essence1_1.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=755&width=589&canvas=589:755&dpr=2",
        size: "Standard",
        isNew: true,
        discount: 25
      }
    ]
  };

  useEffect(() => {
    setItems(itemsByCategory[category] || []);
  }, [category]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <div className="item-list-page">
      <div className="main-header">
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Collection</h1>
        <p>Discover our exclusive range of premium {category} products</p>
      </div>
      <div className="category-grid">
        {items.map(item => (
          <div key={item.id} className="category-card">
            <div className="category-image">
              <img src={item.image} alt={item.name} />
              {item.isNew && <span className="badge new">New</span>}
              {item.discount > 0 && <span className="badge discount">{item.discount}% OFF</span>}
              <div className="category-overlay">
                <div className="category-content">
                  <h3>{item.name}</h3>
                  <p>Color: {item.color} | Size: {item.size}</p>
                  <div className="item-price">
                    {item.discount > 0 && (
                      <span className="old-price">Rs. {item.price}</span>
                    )}
                    <span className="current-price">
                      Rs. {item.discount > 0 ? Math.round(item.price * (1 - item.discount / 100)) : item.price}
                    </span>
                  </div>
                  <button 
                    className={`explore-btn ${addedItems[item.id] ? 'added' : ''}`}
                    onClick={() => handleAddToCart(item)}
                    disabled={addedItems[item.id]}
                  >
                    {addedItems[item.id] ? 'Added to Cart!' : 'Add to Cart'}
                    <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemListPage; 