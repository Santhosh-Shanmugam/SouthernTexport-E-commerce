import React, { useState } from 'react';
import './Home.css';
import TopSelling from '../TopSelling/TopSelling';

// Categories Data
const categories = [
  {
    id: 'cotton',
    name: 'Cotton',
    description: 'Soft, breathable fabrics for everyday comfort',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',    count: 24,
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

// Testimonials Data
const testimonials = [
  {
    id: 1,
    name: 'Sana',
    role: 'Fashion Designer',
    content:
      'Southern TexPort has been my go-to supplier for premium textiles for over 5 years. Their cotton fabrics are unmatched in quality and consistency.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Dhurai Murgan',
    role: 'Designer',
    content:
      'The upholstery fabrics from Southern TexPort have transformed my design business. My clients love the quality and durability.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mayailsamy',
    role: 'Small Business Owner',
    content:
      'As a small business owner creating handmade products, finding reliable fabric suppliers was challenging until I discovered Southern TexPort.',
    rating: 4,
  },
];

const Home = () => {
  // Comment State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');

  // Comment Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !comment) return;

    setIsLoading(true);
    setTimeout(() => {
      const newComment = {
        id: Date.now(), // Simple unique ID based on timestamp
        name,
        email,
        comment,
        date: new Date().toLocaleDateString(),
      };
      setComments((prev) => [newComment, ...prev]); // Add new comment to the top
      setIsLoading(false);
      setName('');
      setEmail('');
      setComment('');
      setMessage('Your comment has been submitted!');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    }, 1000);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Southern TexPort</h1>
        <p>Your one-stop shop for premium textiles and fabrics.</p>
        <button className="shop-now-btn">Explore Now</button>
      </section>

      {/* Category Showcase */}
      <section className="category-section">
        <h2>Our Fabric Categories</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-image">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-img"
                />
              </div>
              <div className="category-content">
                <div className="category-header">
                  <h3>{category.name}</h3>
                  <span>{category.count} items</span>
                </div>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>



<div className="top-selling">
  <TopSelling></TopSelling>
</div>
      {/* Company Open Comments Section */}
      <section className="comments-section">
        <h2>Share Your Feedback</h2>
        <p>We value your thoughts! Leave a comment about our products or services.</p>
        <form onSubmit={handleSubmit} className="comments-form">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="comments-input"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="comments-input"
          />
          <textarea
            placeholder="Your Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="comments-textarea"
          />
          <button type="submit" disabled={isLoading} className="comments-btn">
            {isLoading ? 'Submitting...' : 'Submit Comment'}
          </button>
        </form>
        {message && <p className="comments-message">{message}</p>}

        {/* Display Comments */}
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-name">{c.name}</span>
                  <span className="comment-date">{c.date}</span>
                </div>
                <p className="comment-text">{c.comment}</p>
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first to share your feedback!</p>
          )}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < testimonial.rating ? 'filled' : ''}`}
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
            </div>
          ))}
        </div>
      </section>
      <section className="about-container">
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
        <button className="learn-more-btn">Learn More</button>
      </div>
    </section>
    </div>
  );
};

export default Home;