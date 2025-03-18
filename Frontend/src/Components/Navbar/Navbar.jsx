import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="container">
      <div className="logo-container">
        <img src="your-logo-url.png" alt="Logo" className="logo" />
        <span className="company-name">ABC</span>
      </div>
      <ul className="nav-list">
        <Link to="/"><li className="nav-item" >Home</li></Link>
       <Link to="/men"><li className="nav-item" >Men</li></Link>
       <Link to="/women"><li className="nav-item" >Women</li></Link>
       <Link to="/kids"><li className="nav-item" >Kids</li></Link>
       <Link to="/about"><li className="nav-item" >About</li></Link>
        <div className="login-button">
        <Link to="/login"><div>Login</div></Link>
      </div>
      </ul>
      
      </div>
    </nav>
  );
};

export default Navbar;
