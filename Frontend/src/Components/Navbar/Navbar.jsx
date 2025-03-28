import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo Section */}
        <div className="logo-container">
          <img src="your-logo-url.png" alt="Logo" className="logo" />
          <span className="company-name">ABC</span>
        </div>

        {/* Desktop Nav List (always visible) */}
        <ul className="nav-list">
          <Link to="/"><li className="nav-item">Home</li></Link>
          <Link to="/men"><li className="nav-item">Men</li></Link>
          <Link to="/women"><li className="nav-item">Women</li></Link>
          <Link to="/kids"><li className="nav-item">Kids</li></Link>
          <Link to="/login">
            <div className="login-button">Login</div>
          </Link>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FiX size={30} color="white" /> : <FiMenu size={30} color="white" />}
        </div>

        {/* Mobile Dropdown Menu (Only visible when menuOpen is true) */}
        {menuOpen && (
          <div className="dropdown-menu">
            <ul>
              <Link to="/" onClick={toggleMenu}><li className="nav-item">Home</li></Link>
              <Link to="/men" onClick={toggleMenu}><li className="nav-item">Men</li></Link>
              <Link to="/women" onClick={toggleMenu}><li className="nav-item">Women</li></Link>
              <Link to="/kids" onClick={toggleMenu}><li className="nav-item">Kids</li></Link>
              <Link to="/login" onClick={toggleMenu}>
                <div className="login-button">Login</div>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
