import './RemoveProduct.css';
import React, { useEffect, useState } from 'react';
import delete1 from '../AssertsAdmin/delete1.png';

const RemoveProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState('');

  const fetchInfo = async () => {
    try {
      const response = await fetch('https://southerntexport-e-commerce.onrender.com/allproducts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError('Failed to fetch products');
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await fetch('https://southerntexport-e-commerce.onrender.com/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Failed to remove product with id ${id}`);
      }

      await fetchInfo(); 
    } catch (err) {
      console.error(`Error removing product with id ${id}:`, err);
      setError(`Error removing product with id ${id}`);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="listproduct">
      <h1>All Product List</h1>
      {error && <p className="error-message">{error}</p>} 
      <div className="list-all-product">
        <div className="listproduct-headers listproduct-format-main">
          <p>Product</p>
          <p>Title</p>
          <p>Price</p>
          <p>Rating</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {allProducts.length > 0 ? (
          allProducts.map((product, index) => {
            // Assume default values for quantities and ratings if not present in schema
            const quantity = product.quantity || 1;
            const rating = product.rating || "N/A";
            const total = parseFloat(product.price) * quantity;
            
            return (
              <React.Fragment key={index}>
                <div className="listproduct-format-main listproduct-format">
                  <img src={product.image} alt="" className="listproduct-icon" />
                  <p>{product.DealerName}</p>
                  <p>₹{product.price}</p>
                  <p>{rating}</p>
                  <p>{quantity}</p>
                  <p>₹{total.toFixed(2)}</p>
                  <img
                    onClick={() => removeProduct(product.id)}
                    src={delete1}
                    alt="Remove"
                    className="listproduct-remove"
                  />
                </div>
                <hr />
              </React.Fragment>
            );
          })
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default RemoveProduct;