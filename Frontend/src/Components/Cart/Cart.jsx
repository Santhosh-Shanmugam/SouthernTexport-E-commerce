import React, { useContext, useEffect, useState, useRef } from "react";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { MdCancel } from "react-icons/md";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const { all_product, cartItem, removeFromCart, updateCartFromServer } =
    useContext(ShopContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const userId = localStorage.getItem("userId");
  const hasSyncedCart = useRef(false);

  const getTotalCartAmount = () => {
    let total = 0;
    all_product.forEach((product) => {
      if (cartItem[product.id]?.length > 0) {
        cartItem[product.id].forEach((item) => {
          total += product.new_price * item.quantity;
        });
      }
    });
    return total;
  };

  const isCartEmpty = Object.values(cartItem).every(
    (items) => !items || items.length === 0
  );

  const handleBuyNowData = async () => {
    if (isCartEmpty || !userId) return;

    setIsLoading(true);

    try {
      const cartItems = [];

      all_product.forEach((product) => {
        if (cartItem[product.id]?.length > 0) {
          cartItem[product.id].forEach((item) => {
            cartItems.push({
              productId: product.id,
              productSize: item.size,
              selectCount: item.quantity,
            });
          });
        }
      });
      const productId = cartItems[0].productId;
      const productSize = cartItems[0].productSize;
      const selectCount = cartItems[0].selectCount;

      const response = await axios.post(
        `https://southerntexport-e-commerce.onrender.com/api/buy_details/`,
        {
          userId,
          productId,
          productSize,
          selectCount,
        }
      );

      if (response.data.success) {
        navigate("/payments");
      } else {
        alert("Failed to place order: " + response.data.message);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong while placing the order.");
    } finally {
      setIsLoading(false);
    }
  };

  const syncCartWithBackend = async () => {
    if (!userId || hasSyncedCart.current) return;

    try {
      setIsSyncing(true);
      const response = await fetch(`/getcart/${userId}`);
      const data = await response.json();

      if (data.success && data.cart) {
        const serverCart = {};

        data.cart.cartItems.forEach((item) => {
          const { productId, productSize, selectCount } = item;
          if (!serverCart[productId]) {
            serverCart[productId] = [];
          }
          serverCart[productId].push({
            size: productSize,
            quantity: selectCount,
          });
        });

        if (updateCartFromServer) {
          updateCartFromServer(serverCart);
        }

        hasSyncedCart.current = true;
      }
    } catch (error) {
      console.error("Error syncing cart:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  const clearCart = async () => {
    if (!userId || isCartEmpty) return;
  
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://southerntexport-e-commerce.onrender.com/clearcart/${userId}`,
        {
          method: "DELETE",
        }
      );
  
      const data = await response.json();
      console.log("Clear cart response:", data);
  
      if (data.success && updateCartFromServer) {
        updateCartFromServer({});
        setErrorMessage(""); // Clear any previous error
      } else {
        console.error("Failed to clear cart:", data.message);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userId) {
      syncCartWithBackend();
    }
  }, [userId]);

  const totalPrice = getTotalCartAmount();

  return (
    <div className="cartitems">
      <Link to="/men">
        {/* <div className="shop-now-cart">
          <p>Shop Now</p>
        </div> */}
      </Link>

      {isSyncing && (
        <div className="syncing-message">
          <p>Syncing your cart...</p>
        </div>
      )}

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
                    <img
                      src={product.image1}
                      alt={product.name}
                      className="cartitem-icon"
                    />
                    <p className="cart-name">{product.name}</p>
                    <p>₹{product.new_price}</p>
                    <p>{item.size || "XL"}</p>
                    <div className="quantity-controls">
                      <span className="quantity-value">{item.quantity}</span>
                    </div>
                    <p>₹{product.new_price * item.quantity}</p>
                    <div
                      onClick={() => removeFromCart(product.id, item.size)}
                      alt="Delete Item"
                    >
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
            onClick={handleBuyNowData}
            disabled={isLoading || isCartEmpty}
            className="buy-now-btn"
          >
            {isLoading ? "Processing..." : "Buy Now"}
          </button>

          {!isCartEmpty && (
            <button
              className="clear-cart-btn"
              disabled={isLoading}
              onClick={clearCart}
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
