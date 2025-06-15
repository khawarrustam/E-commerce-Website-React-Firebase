import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavbarSolid.css';
import { useCart } from '../context/CartContext';

const categories = [
  { name: 'Home', path: '/' },
  { name: 'Gents Shalwar Kameez', path: '/items/gents' },
  { name: 'Ladies Shalwar Kameez', path: '/items/ladies' },
  { name: 'Makeup', path: '/items/makeup' },
  { name: 'Fragrances', path: '/items/fragrances' },
];

function NavbarSolid() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="navbar-solid">
        <div className="navbar-logo-solid">
          <img src="https://www.pakpedia.pk/files/Image/J.-Junaid-Jamshed.png" alt="Junaid Jamshed Logo" height="40" />
        </div>
        <div className="navbar-links-solid">
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
        <div className="navbar-icons-solid">
          <NavLink to="/login" className="icon-user" aria-label="User">
            <img src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png" alt="User" style={{width: 32, height: 32}} />
          </NavLink>
          <NavLink to="/cart" className="icon-cart" aria-label="Cart" style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src="https://cdn-icons-png.flaticon.com/128/1170/1170678.png" alt="Cart" style={{width: 32, height: 32}} />
            {cartCount > 0 && <span className="cart-badge-solid">{cartCount}</span>}
          </NavLink>
        </div>
      </nav>
      <div className="navbar-solid-underline"></div>
    </>
  );
}

export default NavbarSolid; 