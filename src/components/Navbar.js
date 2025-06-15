import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useCartState } from '../hooks/useCartState';

const categories = [
  { name: 'Home', path: '/' },
  { name: 'Gents Shalwar Kameez', path: '/items/gents' },
  { name: 'Ladies Shalwar Kameez', path: '/items/ladies' },
  { name: 'Makeup', path: '/items/makeup' },
  { name: 'Fragrances', path: '/items/fragrances' },
];

function Navbar() {
  const { cart } = useCartState();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <nav className={`navbar-img${isHome && !scrolled ? '' : ' scrolled'}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="navbar-logo-img">
        {/* Updated logo as per user request */}
        <img src="https://www.junaidjamshed.com/media/wysiwyg/JJ_LOGO-01.png" alt="Logo" height="40" />
      </div>
      <div className="navbar-links-img">
        {categories.map(cat => (
          <NavLink
            key={cat.name}
            to={cat.path}
            className={({ isActive }) => isActive ? 'active' : ''}
            end={cat.path === '/'}
          >
            {cat.name}
          </NavLink>
        ))}
      </div>
      <div className="navbar-icons-img">
        <NavLink to="/login" className="icon-user" aria-label="User">
          <img src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png" alt="User" style={{width: 40, height: 40}} />
        </NavLink>
        <NavLink to="/cart" className="icon-cart" aria-label="Cart" style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <img src="https://cdn-icons-png.flaticon.com/128/1170/1170678.png" alt="Cart" style={{width: 40, height: 40}} />
          <span className="cart-badge" style={{background: '#0a2c53', color: '#fff', fontWeight: 'bold', fontSize: '1.1em', top: 0, right: 0}}>{cartCount}</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar; 