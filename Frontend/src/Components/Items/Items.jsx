import React from "react";
import './Items.css'
const Items = ({ image1, name ,new_price,old_price,offer,product_count,size_options}) => {
    return (
    

            <div className="item-con-all">

            <div className="item-image">

            <img src={image1} alt={name} />
            </div>
            <div className="item-name">

            <p>{name}</p>
            </div>
            <div className="item-price">
                <div className="item-price-new">
                <p>₹{new_price}</p>
                </div>
                <div className="item-price-old">
                <p>₹{old_price}</p>

                </div>
                <div className="item-offer">
                <p>{offer}</p>

                </div>

            </div>
            <div className="item-size">
            <p>Size:{size_options}</p>

            </div>
            <div className="item-status">
                <p>{product_count}</p>
            </div>
            </div>
        
    );
};

export default Items;
