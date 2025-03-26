import React from 'react'
import './InnerDisplay.css'
import { ShopContext } from '../../Context/ShopContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MdLocalOffer } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import Rating from '../Rating/Rating';
import { Ri24HoursFill } from "react-icons/ri";
import { IoIosTrophy } from "react-icons/io";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";

const InnerDisplay = () => {



  const { Data } = useContext(ShopContext);
  const { productID } = useParams();
  const product = Data.find((e) => e.id === Number(productID));

  // id:0,
  // image1: sss,
  // image2: sss,
  // image3: sss,
  // name: "Blue T",
  // old_price: 1000,
  // new_price: 800,
  // category:"men",
  // offer: "20% off",

  // full_name: "Product Name - Full Details",
  // rating: 4.5,
  // size_options: [" X ", " XL ", " L ", " M "],
  // product_count: 0,
  // product_status: "top"

  return (
    <div className="inner-con">

      <div className="inner-con-left">
        <div className="left-sample-image">
          <img src={product.image1}></img>
          <img src={product.image2}></img>
          <img src={product.image3}></img>

        </div>
        <div className="left-main-image">

          <img src={product.image1}></img>


        </div>

      </div>
      <div className="inner-con-right">

        <div className="inner-con-details">
          <p>{product.full_name}</p>
          <div className="inner-rating">
            <Rating rating={product.rating} ></Rating>

          </div>
          <hr></hr>
          <div className="inner-price">
            <p className="price-name">Spcial Price:</p>
            <div className="new_p">

              <p>₹{product.new_price}</p>
            </div>
            <div className="inner-old-p">
              <p>₹{product.old_price}</p>

            </div>

          </div>
          <p>Inclusive of all taxes</p>
          <hr></hr>
          <div className="inner-offer">

            <p><MdLocalOffer className="inner-offer-icon" />{product.offer}</p>
          </div>
          <h2>Size</h2>
          <div className="size-cont">{product.size_options.map(size => (
            <div className="size-css">{size}</div>
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

          <hr></hr>
          <div className="inner-con-right-icons">

            <CiDeliveryTruck className="inner-icon-right" />
            <FaShoppingCart className="inner-icon-right2" />
            <Ri24HoursFill className="inner-icon-right" />
            <IoIosTrophy className="inner-icon-right" />
            <RiSecurePaymentLine className="inner-icon-right" />

          </div>
          <hr></hr>



        </div>


      </div>
      <div className="inner-con-last">
        <div className="inner-con-last-all-items">

          <p className="last-con-price">₹{product.new_price}</p>
          <div className="stock-left-last">
            <p className="stock-left-last-p">Stock Left:{product.product_count}</p>
          </div>
          <div className="">

          <span>{product.delivery}</span>
          </div>
          <div className="add-location">

            <FaMapLocationDot className="add-location-icon" />


            <h4>Add Location</h4>
          </div>
          <div className="quantity-con-last">
            <p>
              <input
                type="number"
                placeholder="Qty"
                min="1"
                max="50"
                onChange={(e) => {
                  let value = parseInt(e.target.value);

                  if (isNaN(value) || value < 1) {
                    value = 1;
                  } else if (value > 50) {
                    value = 50;
                  }

                  e.target.value = value;
                }}
              />
            </p>
          </div>



          <div className="button-buy-cart">
            <div className="buy-btn">
              <p>BUY</p>

            </div>
            <div className="add-cart">
               <p>ADD TO CART</p>
            </div>
          </div>


        </div>







      </div>
    </div >
  )
}

export default InnerDisplay