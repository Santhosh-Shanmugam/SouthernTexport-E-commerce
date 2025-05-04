import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './Payment.css';
import { FaCreditCard, FaLock } from 'react-icons/fa';

const Payment = () => {
  const { all_product, cartItem } = useContext(ShopContext);
  const [amount, setAmount] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  // Calculate order summary
  const getTotalCartAmount = () => {
    let total = 0;
    all_product.forEach((product) => {
      if (cartItem[product.id]?.length > 0) {
        cartItem[product.id].forEach(item => {
          total += product.new_price * item.quantity;
        });
      }
    });
    return total;
  };

  const totalPrice = getTotalCartAmount();
  const shippingCost = totalPrice > 1000 ? 0 : 99;
  const finalTotal = totalPrice + shippingCost;

  useEffect(() => {
    // Set amount from cart total
    setAmount(finalTotal.toString());
    
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, [finalTotal]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(amount === "") {
      alert("Please enter amount");
    } else {
      // Razorpay configuration
      var options = {
        key: "rzp_test_1Be4hjU2M9caQO", 
        key_secret: "SVqpIzF3TfroEXG2AhAoX1A7", 
        amount: amount * 100, 
        currency: "INR",
        name: "Southern Texport",
        description: "Payment for your order",
        handler: function(response) {
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.contact
        },
        notes: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        theme: {
          color: "#ff5a5a"
        }
      };
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  };

  return (
    <div className="payment-container">
      <h1>Checkout</h1>
      
      <div className="payment-layout">
        <div className="payment-form-section">
          <form onSubmit={handleSubmit}>
            <div className="payment-section">
              <h2><FaLock /> Billing Information</h2>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="johndoe@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contact">Contact Number</label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  placeholder="9944229933"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="123 Main St"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Mumbai"
                  />
                </div>
                
                <div className="form-group half">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="Maharashtra"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  placeholder="400001"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="pay-button"
            >
              Pay ₹{amount}
            </button>
          </form>
        </div>
        
        <div className="order-summary-section">
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="order-items">
              {all_product.map((product) => {
                if (cartItem[product.id]?.length > 0) {
                  return cartItem[product.id].map((item, index) => (
                    <div key={`${product.id}-${item.size}-${index}`} className="order-item">
                      <div className="item-info">
                        <div className="item-image">
                          <img src={product.image1} alt={product.name} />
                        </div>
                        <div className="item-details">
                          <h4>{product.name}</h4>
                          <p>Size: {item.size || 'XL'}</p>
                          <p>Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="item-price">
                        ₹{product.new_price * item.quantity}
                      </div>
                    </div>
                  ));
                }
                return null;
              })}
            </div>
            
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;