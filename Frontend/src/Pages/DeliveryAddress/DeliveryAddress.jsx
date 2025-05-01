import React, { useState } from 'react';
import './DeliveryAddress.css';
import axios from 'axios';

const DeliveryAddress = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zipcode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the user_id from sessionStorage (assuming it's stored there)
    const user_id = localStorage.getItem('userId');
    if (!user_id) {
      alert('You must be logged in to add a delivery address');
      return;
    }

    try {
      const response = await axios.post('https://southerntexport-e-commerce.onrender.com/delivery/add', {
        ...formData,
        user_id, 
      });
      alert('Address saved successfully!');
      setFormData({ name: '',phone: '', email: '' , address: '', city: '', zipcode: ''});
    } catch (err) {
      console.error(err);
      alert('Failed to save address.');
    }
  };

  return (
    <div className="delivery-address-container">
      <h2>Delivery Address</h2>
      <form className="delivery-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="zipcode">Zip Code</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            placeholder="Enter zip code"
            value={formData.zipcode}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Save Address</button>
      </form>
    </div>
  );
};

export default DeliveryAddress;
