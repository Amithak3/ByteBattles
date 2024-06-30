// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">ByteBattles</div>
      <div className="header-buttons">
        <Link to="/" className="header-button">Home</Link>
        <Link to="/journal" className="header-button">Journal</Link>
        <Link to="/contests" className="header-button">Contests</Link>
        <Link to="/signin" className="header-button">Sign In</Link>
        <Link to="/register" className="header-button">Register</Link>
      </div>
    </header>
  );
};

export default Header;
