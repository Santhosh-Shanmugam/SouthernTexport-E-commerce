import React, { useContext, useState } from "react";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { MdCancel } from "react-icons/md";

const Cart = () => {
    const { all_product, cartItem, addToCart, removeFromCart } = useContext(ShopContext);

    // Calculate total amount
    const getTotalCartAmount = () => {
        return all_product.reduce((total, e) => total + (e.new_price * (cartItem[e.id] || 0)), 0);
    };

    const totalPrice = getTotalCartAmount();
    history.pushState({ totalPrice }, "", window.location.href);

    // Check if cart is empty
    const isCartEmpty = !all_product.some(e => cartItem[e.id] > 0);

    return (
        <div className="cartitems">
            <Link to='/men'>
                <div className="shop-now-cart">
                    <p>Shop Now</p>
                </div>
            </Link>

            <div className="carttiemsmap">
                <div className="cartitems-main">
                    <p>Product</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Rating</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />

                {isCartEmpty ? (
                    <div className="empty-cart-message">
                        <p>Your cart is empty. Add some products!</p>
                    </div>
                ) : (
                    all_product.map((e) => {
                        if (cartItem[e.id] > 0) {
                            return (
                                <div key={e.id}>
                                    <div className="cartitems-format cartitems-main">
                                        <img src={e.image1} alt={e.name} className="cartitem-icon" />
                                        <p className="cart-name">{e.name}</p>
                                        <p>₹{e.new_price}</p>
                                        <p>{e.rating}</p>
                                        <div className="quantity-controls">
                                            <span className="quantity-value">{cartItem[e.id]}</span>
                                        </div>
                                        <p>₹{e.new_price * cartItem[e.id]}</p>
                                        <div onClick={() => removeFromCart(e.id)} alt="Delete Item">
                                            <MdCancel  className="remove1"/>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            );
                        }
                        return null;
                    })
                )}
            </div>

            <div className="cartitems-down">
                <div className="cartitem-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitem-total-items">
                            <p>Subtotal</p>
                            <p>₹{totalPrice}</p>
                        </div>
                        <hr />
                        <div className="cartitem-total-items">
                            <h3>Total</h3>
                            <h3>₹{totalPrice}</h3>
                        </div>
                    </div>

                    <button disabled={isCartEmpty}>Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;