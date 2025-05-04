import React, { useContext, useEffect, useState, useRef } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { MdCancel } from "react-icons/md";

const Cart = () => {
  const { all_product, cartItem, removeFromCart, updateCartFromServer } =
    useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const userId = localStorage.getItem("userId");

  const hasSyncedCart = useRef(false);
  const cartHashRef = useRef("");

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

  const totalPrice = getTotalCartAmount();

  const isCartEmpty = Object.values(cartItem).every(
    (items) => !items || items.length === 0
  );

  // Fetch cart from backend and sync with local cart
  const syncCartWithBackend = async () => {
    if (!userId || hasSyncedCart.current) return;

    try {
      setIsSyncing(true);
      const response = await fetch(`/getcart/${userId}`);

      const data = await response.json();

      if (data.success && data.cart) {
        // Convert server cart format to local cart format
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

        // Update the context with server cart
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

  const clearCart = async () => {
    if (!userId || isCartEmpty) return;

    try {
      setIsLoading(true);
      const response = await fetch(`/clearcart/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      const data = await response.json();

      if (data.success) {
        // Reset local cart or handle in context
        // This depends on how your ShopContext is implemented
        if (updateCartFromServer) {
          updateCartFromServer({});
        }
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      setErrorMessage("Failed to clear cart");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // Sync cart with backend when component mounts
    if (userId) {
      syncCartWithBackend();
    }
  }, [userId]);

  return (
    <div className="cartitems">
      <Link to="/men">
        <div className="shop-now-cart">
          <p>Shop Now</p>
        </div>
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

          <Link
            to={isCartEmpty ? "#" : "/payments"}
            className={isCartEmpty ? "disabled-link" : ""}
          >
            <button disabled={isLoading || isCartEmpty} className="buy-now-btn">
              {isLoading ? "Processing..." : "Buy Now"}
            </button>
          </Link>

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
