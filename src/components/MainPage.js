import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  const categories = [
    {
      name: 'Gents Shalwar Kameez',
      key: 'gents',
      image: 'https://www.junaidjamshed.com/media/wysiwyg/eyw85.jpg',
      description: 'Discover our premium collection of men\'s traditional wear',
      items: '120+ Products'
    },
    {
      name: 'Ladies Shalwar Kameez',
      key: 'ladies',
      image: 'https://www.junaidjamshed.com/media/wysiwyg/eyw82_2.jpg',
      description: 'Explore our elegant range of women\'s traditional attire',
      items: '150+ Products'
    },
    {
      name: 'Makeup',
      key: 'makeup',
      image: 'https://www.junaidjamshed.com/media/wysiwyg/makup_section.png',
      description: 'Find your perfect beauty products from our curated collection',
      items: '80+ Products'
    },
    {
      name: 'Fragrances',
      key: 'fragrances',
      image: 'https://www.junaidjamshed.com/media/catalog/product/s/m/sm1_5_.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=755&width=589&canvas=589:755&dpr=2',
      description: 'Experience our exclusive range of premium fragrances',
      items: '50+ Products'
    }
  ];

  return (
    <div className="main-page">
      <div className="main-content">
        <div className="main-header">
          <h1>Our Collections</h1>
          <p>Discover our exclusive range of premium products</p>
        </div>
        
        <div className="category-grid">
          {categories.map((category) => (
            <Link to={`/items/${category.key}`} key={category.key} className="category-card">
              <div className="category-image">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <div className="category-content">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <span className="category-items">{category.items}</span>
                    <button className="explore-btn">
                      Explore Collection
                      <span className="arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="main-features">
          <div className="feature">
            <i className="feature-icon">🚚</i>
            <h3>Free Shipping</h3>
            <p>On orders over $50</p>
          </div>
          <div className="feature">
            <i className="feature-icon">🔄</i>
            <h3>Easy Returns</h3>
            <p>30 days return policy</p>
          </div>
          <div className="feature">
            <i className="feature-icon">🔒</i>
            <h3>Secure Payment</h3>
            <p>100% secure checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 