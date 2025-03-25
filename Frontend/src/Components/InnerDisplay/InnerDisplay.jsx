import React from 'react'
import './InnerDisplay.css'
import { ShopContext } from '../../Context/ShopContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MdLocalOffer } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";

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
          <p>{product.rating}</p>
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
            <h2>Color</h2>
            <div className="inner-color">
              <div className="">

                <p>{product.color}</p>
              </div>
              <div className="">

                <img src={product.image1}></img>
              </div>
            </div>


          </div>

          <hr></hr>
          <div className="inner-con-right-icons">

            <CiDeliveryTruck className="inner-icon-right" />
            <FaShoppingCart  className="inner-icon-right" />
            <CiDeliveryTruck className="inner-icon-right" />
            <CiDeliveryTruck className="inner-icon-right" />
            <CiDeliveryTruck className="inner-icon-right" />
            <CiDeliveryTruck className="inner-icon-right" />

          </div>
          <hr></hr>



        </div>


      </div>
      <div className="inner-con-last">
        <p>efgrgtgthr</p>
      </div>
    </div>
  )
}

export default InnerDisplay