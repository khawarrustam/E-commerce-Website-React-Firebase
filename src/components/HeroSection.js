import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const categories = [
    { name: 'Gents Shalwar Kameez', path: '/items/gents' },
    { name: 'Ladies Shalwar Kameez', path: '/items/ladies' },
    { name: 'Makeup', path: '/items/makeup' },
    { name: 'Fragrances', path: '/items/fragrances' }
  ];

  return (
    <div className="hero-section">
      <div className="hero-bg"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          <h2 className="hero-subheading">Welcome to</h2>
          <h1 className="hero-heading">Our Premium Collection</h1>
        </div>
        <div className="hero-categories">
          {categories.map((category) => (
            <Link to={category.path} key={category.path} className="hero-cat-btn">
              {category.name}
            </Link>
          ))}
        </div>
        <Link to="/items" className="hero-explore">
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default HeroSection; 