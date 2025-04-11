import React, { useState, useEffect, useMemo } from "react";
import './Items.css';
import { Link } from "react-router-dom";

const Items = ({ id, image1, image2, image3, name, new_price, old_price, offer, product_count, size_options }) => {
    const [status, setStatus] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hovering, setHovering] = useState(false);

    const images = useMemo(() => [image1, image2, image3], [image1, image2, image3]);

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
        "Hot Deal": "rgb(227, 227, 92)",
        "In Stock": "rgb(175, 246, 157)"
    };

    useEffect(() => {
        let interval;
        if (hovering) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            }, 1800);
        } else {
            setCurrentIndex(0);
        }

        return () => clearInterval(interval);
    }, [hovering, images.length]); 

    return (
        <div className="item-con-all">
            <Link to={`/product/${id}`}>
                <div
                    className="item-image"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    style={{ width: '300px', height: '300px', overflow: 'hidden' }}
                >
                    <img
                        src={images[currentIndex]}
                        alt={name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'opacity 0.5s ease-in-out',
                            borderRadius: '12px',
                            transition:'0.3s',
                        }}
                    />
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
                        alignItems: "center",
                    }}
                >
                    <p>{status}</p>
                </div>
            </Link>
        </div>
    );
};

export default Items;
