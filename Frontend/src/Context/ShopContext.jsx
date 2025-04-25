import React, { useEffect, useState, createContext } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItem, setCartItem] = useState({});

  useEffect(() => {
    fetch("https://southerntexport-e-commerce.onrender.com/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setAllProduct(data);
        // Initialize cart with empty objects instead of zeros
        const initialCart = {};
        data.forEach((product) => {
          initialCart[product.id] = [];
        });
        // Only initialize if cart is empty
        if (Object.keys(cartItem).length === 0) {
          setCartItem(initialCart);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Updated addToCart function to include size and quantity
  const addToCart = (itemId, size, quantity) => {
    setCartItem((prev) => {
      const updatedCart = { ...prev };
      
      // Add new item with size and quantity
      if (!updatedCart[itemId]) {
        updatedCart[itemId] = [];
      }
      
      // Check if we already have this size in cart
      const existingItemIndex = updatedCart[itemId].findIndex(item => item.size === size);
      
      if (existingItemIndex >= 0) {
        // Update quantity if size already exists
        updatedCart[itemId][existingItemIndex].quantity += quantity;
      } else {
        // Add new size entry
        updatedCart[itemId].push({
          size: size,
          quantity: quantity
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

  const contextValue = {
    all_product,
    setAllProduct,
    cartItem,
    addToCart,
    removeFromCart,
    getTotalCartItems
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;