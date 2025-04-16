import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import stpLogo from '../../assets/stpLogo.png'
import { IoCart } from "react-icons/io5";

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
          <img src={stpLogo} alt="Logo" className="logo" />
          <span className="company-name">Southern Texport</span>
        </div>

        {/* Desktop Nav List (always visible) */}
        <ul className="nav-list">
          <Link to="/"><li className="nav-item">Home</li></Link>
          <Link to="/men"><li className="nav-item">Men</li></Link>
          <Link to="/women"><li className="nav-item">Women</li></Link>
          <Link to="/kids"><li className="nav-item">Kids</li></Link>
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
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
