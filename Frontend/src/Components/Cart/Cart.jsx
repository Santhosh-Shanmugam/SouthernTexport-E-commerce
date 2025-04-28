import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { MdCancel } from "react-icons/md";

const Cart = () => {
    const { all_product, cartItem, removeFromCart } = useContext(ShopContext);

    // Calculate total amount
    const getTotalCartAmount = () => {
        let total = 0;
        all_product.forEach((product) => {
            if (cartItem[product.id] && cartItem[product.id].length > 0) {
                cartItem[product.id].forEach(item => {
                    total += product.new_price * item.quantity;
                });
            }
        });
        return total;
    };

    const totalPrice = getTotalCartAmount();
    
    // Check if cart is empty - now checks if any product has items
    const isCartEmpty = Object.values(cartItem).every(items => items.length === 0);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                    <p>Size</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>

                {isCartEmpty ? (
                    <div className="empty-cart-message">
                        <p>Your cart is empty. Add some products!</p>
                    </div>
                ) : (
                    all_product.map((product) => {
                        if (cartItem[product.id] && cartItem[product.id].length > 0) {
                            return cartItem[product.id].map((item, index) => (
                                <div key={`${product.id}-${item.size}-${index}`}>
                                    <div className="cartitems-format cartitems-main">
                                        <img src={product.image1} alt={product.name} className="cartitem-icon" />
                                        <p className="cart-name">{product.name}</p>
                                        <p>₹{product.new_price}</p>
                                        <p>{item.size || 'XL'}</p>
                                        <div className="quantity-controls">
                                            <span className="quantity-value">{item.quantity}</span>
                                        </div>
                                        <p>₹{product.new_price * item.quantity}</p>
                                        <div onClick={() => removeFromCart(product.id, item.size)} alt="Delete Item">
                                            <MdCancel className="remove1" />
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ));
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