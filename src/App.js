import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarSolid from './components/NavbarSolid';
import MainPage from './components/MainPage';
import ItemListPage from './components/ItemListPage';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Cart from './components/Cart';
import Login from './components/Login';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <>
      <Sidebar />
      {isMainPage ? <Navbar /> : <NavbarSolid />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/items/:category" element={<ItemListPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppContent;
