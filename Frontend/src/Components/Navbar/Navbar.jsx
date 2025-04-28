import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import stpLogo from '../../assets/stpLogo.png'
import { IoCart } from "react-icons/io5";
import { handleError, handleSuccess } from '../../Pages/LoginSignup/utils';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout');
    setTimeout(() => {
        navigate('/login');
    }, 1000)
}

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
          <Link to="/cart"><li className="nav-item">Cart</li></Link>
          <button className='logout-button' onClick={handleLogout}>Logout</button>
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
              <Link to="/cart"><li className="nav-item">Cart</li></Link>
              <button className='logout-button' onClick={handleLogout}>Logout</button>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
