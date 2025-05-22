import React, { useState, useEffect, useContext, useRef } from 'react';
import './InnerDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MdLocalOffer } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import Rating from '../Rating/Rating';
import { Ri24HoursFill, RiSecurePaymentLine } from "react-icons/ri";
import { IoIosTrophy } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import Review from '../Review/Review';
import Discount from '../Discount/Discount';
import axios from 'axios';

const InnerDisplay = () => {
  // Always declare all hooks at the top level, before any conditional logic
  const [selectCount, setSelectCount] = useState(1); // Default to 1
  const { all_product, addToCart, cartItem } = useContext(ShopContext);
  const { productID } = useParams();
  const navigate = useNavigate(); // Add this import and hook
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productSize, setProductSize] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Add refs for cart syncing
  const cartHashRef = useRef('');
  const hasSyncedCart = useRef(false);

  const userId = localStorage.getItem("userId");

  // Find the product
  const product = all_product.find((e) => e.id === Number(productID));

  // Define media array safely
  const media = product
    ? [
      { type: "image", src: product.image1 },
      { type: "image", src: product.image2 },
      { type: "image", src: product.image3 },
    ]
    : [];

  // Now we can safely use useEffect - it will always be called
  useEffect(() => {
    if (media.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
      }, 4400);

      return () => clearInterval(interval);
    }
  }, [currentIndex, media.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextSlide = () => {
    if (media.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
    }
  };

  const prevSlide = () => {
    if (media.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? media.length - 1 : prevIndex - 1
      );
    }
  };

  const handleClick = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  const handleAddToCart = () => {
    if (productSize === "") {
      alert("Please select a size before adding to cart!");
      return false;
    }

    // Debug: Log the values being sent
    console.log("Adding to cart:", {
      productId: product.id,
      productSize: productSize,
      selectCount: selectCount,
      productPrice: product.new_price
    });

    // Add the product to cart with the selected size and quantity
    addToCart(product.id, productSize, selectCount);

    // Debug: Log cart state after adding
    console.log("Cart after adding:", cartItem);

    // Show the success alert
    setShowAlert(true);

    return true;
  };

  // Fixed handleBuyNowData function
  const handleBuyNowData = async () => {
    // Check if user is logged in
    if (!userId) {
      alert("Please login to continue with purchase!");
      return;
    }

    // Check if size is selected
    if (productSize === "") {
      alert("Please select a size before buying!");
      return;
    }

    // Check if quantity is valid
    if (selectCount < 1 || selectCount > product.product_count) {
      alert("Please select a valid quantity!");
      return;
    }

    setIsLoading(true);

    try {
      // Use current product details instead of cart items
      const response = await axios.post(
        `https://southerntexport-e-commerce.onrender.com/api/buy_details/`,
        {
          userId,
          productId: product.id,
          productSize: productSize,
          selectCount: selectCount,
        }
      );

      if (response.data.success) {
        navigate("/payments");
      } else {
        alert("Failed to place order: " + response.data.message);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong while placing the order.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fixed quantity input handler
  const handleQuantityChange = (e) => {
    const inputValue = e.target.value;

    // Allow empty string for user to clear the field
    if (inputValue === '') {
      setSelectCount('');
      return;
    }

    const numValue = Number(inputValue);

    // Check if it's a valid number
    if (isNaN(numValue)) {
      return; // Don't update if not a number
    }

    // Allow any positive number up to product count
    if (numValue >= 1 && numValue <= product.product_count) {
      setSelectCount(numValue);
    } else if (numValue > product.product_count) {
      // Set to max available if user tries to exceed
      setSelectCount(product.product_count);
    } else if (numValue < 1 && numValue > 0) {
      // If decimal between 0 and 1, set to 1
      setSelectCount(1);
    }
    // If 0 or negative, don't update (let onBlur handle it)
  };

  const handleQuantityBlur = () => {
    // Ensure we have a valid quantity when user leaves the field
    if (selectCount === '' || selectCount < 1) {
      setSelectCount(1);
    } else if (selectCount > product.product_count) {
      setSelectCount(product.product_count);
    }
  };

  if (!product) {
    return <div>Loading product...</div>;
  }
  { console.log("Product count:", product.product_count, "Type:", typeof product.product_count) }
  // Render the complete component
  return (
    <div className="inner-con-all-re">
      <div className="inner-con">
        <div className="inner-con-left">
          <div className="left-sample-image">
            <img src={product.image1} alt="sample1" />
            <img src={product.image2} alt="sample2" />
            <img src={product.image3} alt="sample3" />
          </div>
          <div className="left-main-image">
            <div className="imageslider">
              <div className="carousel">
                <div className="carousel-container">
                  <img
                    src={media[currentIndex].src}
                    alt={`Slide ${currentIndex + 1}`}
                    className="carousel-image"
                  />
                </div>
                <button className="prev" onClick={prevSlide}>
                  &#10094;
                </button>
                <button className="next" onClick={nextSlide}>
                  &#10095;
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="inner-con-right">
          <div className="inner-con-details">
            <p>{product.full_name}</p>
            <div className="inner-rating">
              <Rating rating={product.rating} />
            </div>
            <hr />
            <div className="inner-price">
              <p className="price-name">Special Price:</p>
              <div className="new_p">
                <Discount offer={product.offer} old_price={product.old_price} />
              </div>
              <div className="inner-old-p">
                <p>₹{product.old_price}</p>
              </div>
            </div>
            <p>Inclusive of all taxes</p>
            <hr />
            <div className="inner-offer">
              <p><MdLocalOffer className="inner-offer-icon" /> {product.offer}</p>
            </div>
            <h2>Size</h2>
            <div className="size-cont" >
              {product.size_options.map((size, index) => (
                <div
                  className={`size-css ${productSize === size ? "selected" : ""}`}
                  key={index}
                  onClick={() => {
                    setProductSize(size);
                  }}
                >
                  {size}
                </div>
              ))}
            </div>

            <div className="inner-colors">
              <div className="inner-color">
                <div style={{ display: 'flex', color: 'black', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                  <h3>Color:</h3><p style={{ color: 'blue' }}>{product.color}</p>
                  <h3>Fabric:</h3><p style={{ color: 'blue' }}>{product.fabric}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="inner-con-right-icons">
              <CiDeliveryTruck className="inner-icon-right" />
              <FaShoppingCart className="inner-icon-right2" />
              <Ri24HoursFill className="inner-icon-right" />
              <IoIosTrophy className="inner-icon-right" />
              <RiSecurePaymentLine className="inner-icon-right" />
            </div>
            <hr />
          </div>
        </div>

        <div className="inner-con-last">
          <div className="inner-con-last-all-items">
            <div className="descrip">
              <p><span>Description:</span>{product.description}</p>
            </div>
            <p className="last-con-price">{product.offer}</p>
            <div className="stock-left-last">
              <p className="stock-left-last-p">Stock Left: {product.product_count}</p>
            </div>
            <div className="">
              <span>{product.delivery}</span>
            </div>
            <Link to="/delivery_address" className="add-location-link">
              <div className="add-location">
                <FaMapLocationDot className="add-location-icon" />
                <h4>Add Location</h4>
              </div>
            </Link>
            <div className="quantity-con-last">
              <input
                type="text" // Changed from "number" to "text"
                inputMode="numeric" // Shows numeric keyboard on mobile
                pattern="[0-9]*" // Helps with numeric validation
                placeholder="Qty"
                value={selectCount === 0 ? '' : selectCount}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow empty string or valid numbers
                  if (value === '' || /^[1-9]\d*$/.test(value)) {
                    const numValue = value === '' ? '' : parseInt(value, 10);

                    // Validate against product count
                    if (numValue === '' || (numValue >= 1 && numValue <= product.product_count)) {
                      setSelectCount(numValue === '' ? '' : numValue);
                    }
                  }
                }}
                onBlur={() => {
                  if (selectCount === '' || selectCount < 1) {
                    setSelectCount(1);
                  } else if (selectCount > product.product_count) {
                    setSelectCount(product.product_count);
                  }
                }}
              />
            </div>
            {showAlert && (
              <div className="alert-overlay">
                <div className="alert-box">
                  <p>Product successfully added</p>
                  <button className="close-btn" onClick={handleClose}>
                    Close
                  </button>
                </div>
              </div>
            )}

            <div className="button-buy-cart">
              {product.product_count <= 0 ? (
                <div className="buy-btn btn-disabled">
                  <p>BUY</p>
                </div>
              ) : (
                <div
                  className="buy-btn"
                  onClick={handleBuyNowData}
                  disabled={isLoading}
                >
                  <p>{isLoading ? "Processing..." : "Buy"}</p>
                </div>
              )}

              {product.product_count <= 0 ? (
                <div className="buy-btn btn-disabled">
                  <p>Add To Cart</p>
                </div>
              ) : (
                <div
                  className="add-cart"
                  onClick={handleAddToCart}
                >
                  <p>Add To Cart</p>
                </div>
              )}
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {isLoading && <p>Processing your order...</p>}
          </div>
        </div>
      </div>
      <div className="inner-review">
        {product?.reviews && <Review Reviews={product.reviews} ProductId={product.id} />}
      </div>
    </div>
  );
};

export default InnerDisplay;