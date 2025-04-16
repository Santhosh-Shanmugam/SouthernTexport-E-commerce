import React, { useEffect, useState, createContext } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItem, setCartItem] = useState({});

  const getDefaultCart = (products) => {
    let cart = {};
    products.forEach((product) => {
      cart[product.id] = 0;
    });
    return cart;
  };

  useEffect(() => {
    fetch("https://southerntexport-e-commerce.onrender.com/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setAllProduct(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
  };

  const contextValue = {
    all_product,
    setAllProduct,
    cartItem,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
