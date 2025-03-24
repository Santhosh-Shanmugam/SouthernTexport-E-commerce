import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import TopSelling from '../TopSelling/TopSelling';
import { useNavigate } from 'react-router-dom';

// Categories Data
const categories = [
  {
    id: 'cotton',
    name: 'Cotton',
    description: 'Soft, breathable fabrics for everyday comfort',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',    
    count: 24,
  },
  {
    id: 'silk',
    name: 'Silk',
    description: 'Luxurious, smooth fabrics with natural sheen',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    count: 18,
  },
  {
    id: 'synthetic',
    name: 'Synthetic',
    description: 'Versatile, durable fabrics for various applications',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    count: 20,
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Welcome to Southern TexPort</h1>
        <p>Your one-stop shop for premium textiles and fabrics.</p>
        <motion.button 
          className="shop-now-btn" 
          onClick={() => navigate("/topselling")}
          whileHover={{ scale: 1.1 }}
        >
          Explore Now
        </motion.button>
      </motion.section>

      {/* Category Showcase */}
      <motion.section 
        className="category-section"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Our Fabric Categories</h2>
        <div className="category-grid">
          {categories.map((category, index) => (
            <motion.div 
              key={category.id} 
              className="category-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="category-image">
                <img src={category.image} alt={category.name} className="category-img" />
              </div>
              <div className="category-content">
                <h3>{category.name}</h3>
                <span>{category.count} items</span>
                <p>{category.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Top Selling Section */}
      <motion.div 
        className="top-selling"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <TopSelling />
      </motion.div>

      {/* About Us Section */}
      <motion.section 
        className="about-container"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="about-content">
          <h2>About Us</h2>
          <p>
          Welcome to our platform! We strive to provide the best services with top-notch 
          quality and customer satisfaction. Our goal is to deliver excellence through 
          innovation and dedication.
        </p>
        <p>
          Our team consists of highly skilled professionals who are passionate about 
          what they do. We believe in continuous improvement and adapting to the latest 
          trends in technology.
        </p>
          <motion.button 
            className="learn-more-btn"
            whileHover={{ scale: 1.1 }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
