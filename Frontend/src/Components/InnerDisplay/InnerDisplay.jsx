import React, { useState, useEffect, useContext } from 'react';
import './InnerDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import { useParams } from 'react-router-dom';
import { MdLocalOffer } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import Rating from '../Rating/Rating';
import { Ri24HoursFill, RiSecurePaymentLine } from "react-icons/ri";
import { IoIosTrophy } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";

const InnerDisplay = () => {
  const [selectCount, setSelectCount] = useState(1); // Default to 1
  const { Data } = useContext(ShopContext);
  const { productID } = useParams();
  const product = Data.find((e) => e.id === Number(productID));

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleBuy = () => {
    console.log("Buying", selectCount, "items of", product.full_name);
  };

  // ---------------------------------------------------------------------------
  const media = [
    { type: "image", src: product.image1 },
    { type: "image", src: product.image2 },
    { type: "image", src: product.image3 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4400);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };
  // ...................................................................................
  return (
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
              <p>₹{product.new_price}</p>
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
          <div className="size-cont">
            {product.size_options.map((size, index) => (
              <div className="size-css" key={index}>{size}</div>
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
          <div className="descrip">
            <p><span>Description:</span>{product.description}</p>
          </div>

          <div className="button-buy-cart">


            {product.product_count <= 0 ? (
              <div className="buy-btn btn-disabled">
                <p>BUY</p>
              </div>
            ) : (
              <div className="buy-btn" onClick={handleBuy}>
                <p>BUY</p>
              </div>
            )}
            {product.product_count <= 0 ? (
              <div className="buy-btn btn-disabled">
                <p>Add To Cart</p>
              </div>
            ) : (
              <div className="add-cart">
                <p>Add To Cart</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerDisplay;
