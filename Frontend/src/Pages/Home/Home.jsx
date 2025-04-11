import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import TopSelling from '../TopSelling/TopSelling';
import { useNavigate } from 'react-router-dom';
import Cotton from '../assets-page/Cotton.webp'
import Synthetic from '../assets-page/Synthetic.jpg'
import Silk from '.././assets-page/Silk.jpg'

const testimonials = [
  {
    id: 1,
    name: "Sana",
    role: "Fashion Designer",
    content:
      "Southern TexPort has been my go-to supplier for premium textiles for over 5 years. Their cotton fabrics are unmatched in quality and consistency.",
    rating: 5,
  },
  {
    id: 2,
    name: "Dhurai Murgan",
    role: "Designer",
    content:
      "The upholstery fabrics from Southern TexPort have transformed my design business. My clients love the quality and durability.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mayailsamy",
    role: "Small Business Owner",
    content:
      "As a small business owner creating handmade products, finding reliable fabric suppliers was challenging until I discovered Southern TexPort.",
    rating: 4,
  },
];

// Categories Data
const categories = [
  {
    id: 'cotton',
    name: 'Cotton',
    description: 'Soft, breathable fabrics for everyday comfort',
    image:Cotton,   
    count: 24,
  },
  {
    id: 'silk',
    name: 'Silk',
    description: 'Luxurious, smooth fabrics with natural sheen',
    image: Silk,
    count: 18,
  },
  {
    id: 'synthetic',
    name: 'Synthetic',
    description: 'Versatile, durable fabrics for various applications',
    image: Synthetic,
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


           {/* Testimonials Section with Slide In Animation */}
      <motion.section
        className="testimonial-section"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="testimonial-content">
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < testimonial.rating ? "filled" : ""}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <div className="avatar">{testimonial.name.charAt(0)}</div>
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>


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
