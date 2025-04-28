import React, { useState, useEffect, useContext } from 'react';
import './InnerDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import { Link, useParams } from 'react-router-dom';
import { MdLocalOffer } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import Rating from '../Rating/Rating';
import { Ri24HoursFill, RiSecurePaymentLine } from "react-icons/ri";
import { IoIosTrophy } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import Review from '../Review/Review';
import Discount from '../Discount/Discount';

const InnerDisplay = () => {
  // Always declare all hooks at the top level, before any conditional logic
  const [selectCount, setSelectCount] = useState(1); // Default to 1
  const { all_product } = useContext(ShopContext);
  const { productID } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productSize, setProductSize] = useState('');
  const { addToCart } = useContext(ShopContext);
  const [showAlert, setShowAlert] = useState(false);
  console.log(productSize);
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

  // Helper functions
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




  if (!product) {
    return <div>Loading product...</div>;
  }
  const handleClick = () => {
    setShowAlert(true);
  };
  const handleClose = () => {
    setShowAlert(false);
  };
  const handleAddToCart = () => {
    if (productSize=="") {
      alert("Please select a size before buy!");

      return;
    }
  };
  

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
                className={`size-css ${productSize === size ? "selected" : "" }` }
                key={index}
                onClick={() => {
                  setProductSize(size);
                }
              }
            
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
            <p className="last-con-price">₹{product.new_price}</p>
            <div className="stock-left-last">
              <p className="stock-left-last-p">Stock Left: {product.product_count}</p>
            </div>
            <div className="">
              <span>{product.delivery}</span>
            </div>
            <div className="add-location">
              <FaMapLocationDot className="add-location-icon" />
              <h4>Add Location</h4>
            </div>
            <div className="quantity-con-last">
              <input
                type="number"
                placeholder="Qty"
                min="1"
                max={product.product_count}
                value={selectCount === 0 ? '' : selectCount}
                onChange={(e) => {
                  let value = e.target.value === '' ? '' : Number(e.target.value);
                  if (value !== '' && value < 1) return;
                  if (value !== '' && value > product.product_count) return;

                  setSelectCount(value);
                }}
                onBlur={() => {
                  if (selectCount === '' || selectCount < 1) {
                    setSelectCount(1);
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
              <Link to="/cart" ><div className="buy-btn" onClick={() => {
                  addToCart(product.id, productSize, selectCount);
                  handleClick()
                  handleAddToCart()

                }
                }>
                  <p>Buy</p>
                </div>
                </Link>
              )}
              
              {product.product_count <= 0 ? (
                <div className="buy-btn btn-disabled">
                  <p>Add To Cart</p>
                </div>
              ) : (
                <div className="add-cart" onClick={() => {
                  addToCart(product.id, productSize, selectCount);
                  handleClick()
                  handleAddToCart()

                }
                }>
                  <p>Add To Cart</p>
                </div>
              )}
            </div>
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