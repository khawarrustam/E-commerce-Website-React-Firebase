import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const categories = [
  { name: 'Home', path: '/' },
  { name: 'Gents Shalwar Kameez', path: '/items/gents' },
  { name: 'Ladies Shalwar Kameez', path: '/items/ladies' },
  { name: 'Makeup', path: '/items/makeup' },
  { name: 'Fragrances', path: '/items/fragrances' },
];

function Sidebar() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      {!open && (
        <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
          &#9776;
        </button>
      )}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <button className="sidebar-close" onClick={() => setOpen(false)}>&times;</button>
        <nav className="sidebar-nav">
          {categories.map(cat => (
            <NavLink
              key={cat.name}
              to={cat.path}
              className={({ isActive }) => isActive ? 'active' : ''}
              end={cat.path === '/'}
              onClick={() => setOpen(false)}
            >
              {cat.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      {open && <div className="sidebar-backdrop" onClick={() => setOpen(false)}></div>}
    </>
  );
}

export default Sidebar; 