import React, { useContext, useEffect, useState, useRef } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { MdCancel } from "react-icons/md";

const Cart = () => {
    const { all_product, cartItem, removeFromCart } = useContext(ShopContext);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const userId = localStorage.getItem("userId");

    const hasSyncedCart = useRef(false);
    const cartHashRef = useRef("");

    const getTotalCartAmount = () => {
        let total = 0;
        all_product.forEach((product) => {
            if (cartItem[product.id]?.length > 0) {
                cartItem[product.id].forEach(item => {
                    total += product.new_price * item.quantity;
                });
            }
        });
        return total;
    };

    const totalPrice = getTotalCartAmount();

    const isCartEmpty = Object.values(cartItem).every(items => !items || items.length === 0);

    

    const handleBuyNow = async () => {
        if (isCartEmpty) {
            setErrorMessage("Your cart is empty. Please add products first.");
            return;
        }

        if (!userId) {
            setErrorMessage("Please log in to continue.");
            return;
        }

        setIsLoading(true);
        setErrorMessage("");

        // Add your purchase logic here
        console.log("Proceeding to checkout...");
        setTimeout(() => {
            setIsLoading(false);
            alert("Purchase successful (mock)");
        }, 1500);
    };

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
                        if (cartItem[product.id]?.length > 0) {
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

            {errorMessage && (
                <div className="error-message">
                    <p>{errorMessage}</p>
                </div>
            )}

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

                    <button
                        disabled={isLoading || isCartEmpty}
                        onClick={handleBuyNow}
                    >
                        {isLoading ? "Processing..." : "Buy Now"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
