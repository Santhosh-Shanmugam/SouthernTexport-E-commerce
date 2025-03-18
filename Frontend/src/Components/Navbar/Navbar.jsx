import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="container">
      <div className="logo-container">
        <img src="your-logo-url.png" alt="Logo" className="logo" />
        <span className="company-name">ABC</span>
      </div>
      <ul className="nav-list">
        <li className="nav-item">Home</li>
        <li className="nav-item">Men</li>
        <li className="nav-item">Women</li>
        <li className="nav-item">Kids</li>
        <li className="nav-item">About</li>
        <div className="login-button">
        <div>Login</div>
      </div>
      </ul>
      
      </div>
    </nav>
  );
};

export default Navbar;
