import React, { useEffect, useState, createContext, useRef } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [syncError, setSyncError] = useState(null);
  
  // Refs for cart syncing
  const cartHashRef = useRef('');
  const hasSyncedCart = useRef(false);

  // Fetch all products on component mount
  useEffect(() => {
    fetch("https://southerntexport-e-commerce.onrender.com/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setAllProduct(data);
        // Initialize cart with empty arrays for each product id
        const initialCart = {};
        data.forEach((product) => {
          initialCart[product.id] = [];
        });
        
        // Only initialize if cart is empty
        if (Object.keys(cartItem).length === 0) {
          // Try to load cart from backend first
          const userId = localStorage.getItem("userId");
          if (userId) {
            fetchCartFromBackend(userId, initialCart);
          } else {
            setCartItem(initialCart);
          }
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Function to fetch cart from backend
  const fetchCartFromBackend = async (userId, initialCart) => {
    try {
      const response = await fetch(`https://southerntexport-e-commerce.onrender.com/getcart/${userId}`);
      const data = await response.json();
      
      if (data.success && data.cart && data.cart.cartItems && data.cart.cartItems.length > 0) {
        // Transform backend cart format to frontend format
        const backendCart = { ...initialCart };
        
        data.cart.cartItems.forEach(item => {
          const { productId, productSize, selectCount } = item;
          
          if (!backendCart[productId]) {
            backendCart[productId] = [];
          }
          
          // Check if this size already exists
          const existingIndex = backendCart[productId].findIndex(
            cartItem => cartItem.size === productSize
          );
          
          if (existingIndex >= 0) {
            // Update existing item
            backendCart[productId][existingIndex].quantity = selectCount;
          } else {
            // Add new item
            backendCart[productId].push({
              size: productSize,
              quantity: selectCount
            });
          }
        });
        
        setCartItem(backendCart);
        console.log("Cart loaded from backend:", backendCart);
      } else {
        // No cart on backend, use initial empty cart
        setCartItem(initialCart);
      }
    } catch (error) {
      console.error("Error fetching cart from backend:", error);
      // On error, use initial empty cart
      setCartItem(initialCart);
    }
  };

  // Sync cart to backend whenever it changes
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    
    const syncCartWithBackend = async () => {
      // Convert cart to backend format
      const cartItemsToSend = [];
      
      Object.keys(cartItem).forEach(productId => {
        if (cartItem[productId] && cartItem[productId].length > 0) {
          cartItem[productId].forEach(item => {
            if (item.quantity > 0) {
              cartItemsToSend.push({
                productId: productId,
                productSize: item.size,
                selectCount: item.quantity
              });
            }
          });
        }
      });
      
      if (cartItemsToSend.length === 0) {
        console.log("No items to sync");
        return;
      }
      
      // Generate hash of current cart to prevent unnecessary syncs
      const currentCartHash = JSON.stringify(cartItemsToSend.sort((a, b) => {
        // First sort by productId
        if (a.productId !== b.productId) {
          return a.productId - b.productId;
        }
        // Then by size
        return a.productSize.localeCompare(b.productSize);
      }));
      
      // Skip if cart hasn't changed
      if (currentCartHash === cartHashRef.current && hasSyncedCart.current) {
        return;
      }
      
      try {
        setIsLoading(true);
        setSyncError(null);
        
        const response = await fetch("https://southerntexport-e-commerce.onrender.com/addcart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId,
            cartItems: cartItemsToSend
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Failed to sync cart");
        }
        
        cartHashRef.current = currentCartHash;
        hasSyncedCart.current = true;
        console.log("Cart synced successfully:", data);
      } catch (error) {
        console.error("Error syncing cart:", error);
        setSyncError("Failed to sync cart with server");
      } finally {
        setIsLoading(false);
      }
    };
    
    // Debounce syncing to avoid too many API calls
    const timer = setTimeout(() => {
      syncCartWithBackend();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [cartItem]);

  // Updated addToCart function to include size and quantity
  const addToCart = (itemId, size, quantity) => {
    if (!size) {
      console.error("Size is required when adding items to cart");
      return;
    }
    
    // Ensure quantity is a number and at least 1
    const safeQuantity = Number(quantity) || 1;
    
    setCartItem((prev) => {
      const updatedCart = { ...prev };
      
      // Initialize array for this product if doesn't exist
      if (!updatedCart[itemId]) {
        updatedCart[itemId] = [];
      }
      
      // Check if we already have this size in cart
      const existingItemIndex = updatedCart[itemId].findIndex(item => item.size === size);
      
      if (existingItemIndex >= 0) {
        // Replace quantity instead of adding to it - this matches your backend expectations
        updatedCart[itemId][existingItemIndex] = {
          ...updatedCart[itemId][existingItemIndex],
          quantity: safeQuantity
        };
      } else {
        // Add new size entry
        updatedCart[itemId].push({
          size: size,
          quantity: safeQuantity
        });
      }
      
      return updatedCart;
    });
  };

  // Updated removeFromCart to handle specific sizes
  const removeFromCart = (itemId, size) => {
    setCartItem((prev) => {
      const updatedCart = { ...prev };
      
      // If no size specified, remove all quantities of this product
      if (!size) {
        updatedCart[itemId] = [];
        return updatedCart;
      }
      
      // Find and remove specific size
      if (updatedCart[itemId]) {
        updatedCart[itemId] = updatedCart[itemId].filter(item => item.size !== size);
      }
      
      return updatedCart;
    });
  };

  // Update quantity for a specific item
  const updateCartItemQuantity = (itemId, size, newQuantity) => {
    if (!size || newQuantity < 1) return;
    
    setCartItem(prev => {
      const updatedCart = { ...prev };
      
      if (updatedCart[itemId]) {
        const itemIndex = updatedCart[itemId].findIndex(item => item.size === size);
        
        if (itemIndex !== -1) {
          updatedCart[itemId][itemIndex].quantity = newQuantity;
        }
      }
      
      return updatedCart;
    });
  };

  // Get total price
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    
    Object.keys(cartItem).forEach(itemId => {
      const product = all_product.find(item => item.id === Number(itemId));
      
      if (product && cartItem[itemId]) {
        cartItem[itemId].forEach(item => {
          totalAmount += product.new_price * item.quantity;
        });
      }
    });
    
    return totalAmount;
  };

  // Get total items in cart
  const getTotalCartItems = () => {
    let total = 0;
    Object.values(cartItem).forEach(items => {
      items.forEach(item => {
        total += item.quantity;
      });
    });
    return total;
  };

  // Clear cart
  const clearCart = async () => {
    const userId = localStorage.getItem("userId");
    
    if (userId) {
      try {
        await fetch(`https://southerntexport-e-commerce.onrender.com/clearcart/${userId}`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.error("Error clearing cart from backend:", error);
      }
    }
    
    // Reset local cart
    const emptyCart = {};
    all_product.forEach(product => {
      emptyCart[product.id] = [];
    });
    
    setCartItem(emptyCart);
  };

  const contextValue = {
    all_product,
    setAllProduct,
    cartItem,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getTotalCartAmount,
    getTotalCartItems,
    clearCart,
    isLoading,
    syncError
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;