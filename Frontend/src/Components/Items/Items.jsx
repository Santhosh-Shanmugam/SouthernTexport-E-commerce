import React, { useState, useEffect } from "react";
import './Items.css';
import { Link } from "react-router-dom";

const Items = ({ id, image1, name, new_price, old_price, offer, product_count, size_options }) => {
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (product_count <= 0) {
            setStatus("Out of stock");
        } else if (product_count <= 10) {
            setStatus("Only few left");
        } else if (product_count > 40) {
            setStatus("Hot Deal");
        } else {
            setStatus("In Stock");
        }
    }, [product_count]);

    const statusBgColor = {
        "Out of stock": "rgb(164, 168, 168)",
        "Only few left": "rgb(249, 154, 154)",
        "Hot Deal": " rgb(227, 227, 92)",
        "In Stock": "rgb(175, 246, 157)"
    };
    return (
        <div className="item-con-all">
            <Link to={`/product/${id}`}>
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
                    <p>Size: {size_options}</p>
                </div>
                <div
                    className="item-status"
                    style={{
                        backgroundColor: statusBgColor[status],
                        color: "black",
                        padding: "5px 10px",
                        borderRadius: "2px",


                    }}
                >
                    <p>{status}</p>
                </div>
        </Link>
            </div>
    );
};

export default Items;
