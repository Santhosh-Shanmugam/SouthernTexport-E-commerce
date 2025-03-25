import React from 'react'
import './InnerDisplay.css'
import { ShopContext } from '../../Context/ShopContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
const InnerDisplay = () => {



  const { Data } = useContext(ShopContext);
  const { productID } = useParams();
  const product = Data.find((e) => e.id === Number(productID));



  return (
    <div className="inner-con">

      <div className="inner-con-left">
        <div className="left-sample-image">

        </div>
        <div className="left-main-image">
          
        </div>

      </div>
      <div className="inner-con-right">

      </div>
    </div>
  )
}

export default InnerDisplay