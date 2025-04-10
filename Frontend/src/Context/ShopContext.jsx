import React, { useEffect, useState, createContext } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setAllProduct(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const contextValue = { all_product, setAllProduct };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
