// RemoveProduct.jsx
import "./RemoveProduct.css";
import React, { useEffect, useState } from "react";
import delete1 from "../AssertsAdmin/delete1.png";

const RemoveProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchInfo = async () => {
    try {
      const response = await fetch(
        "https://southerntexport-e-commerce.onrender.com/allproducts"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to fetch products");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await fetch(
        "https://southerntexport-e-commerce.onrender.com/removeproduct",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

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
 

  const getStatusClass = (status) => {
    status = status.toLowerCase();
    if (status.includes('in stock')) return 'status-in-stock';
    if (status.includes('top') || status.includes('selling')) return 'status-top-selling';
    if (status.includes('low')) return 'status-low-stock';
    if (status.includes('out') || status.includes('unavailable')) return 'status-out-of-stock';
    if (status.includes('new')) return 'status-new';
    return '';
  };

  
  return (
    <div className="listproduct">
      <h1>All Product List</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Old Price</th>
              <th>Category</th>
              <th>Offer</th>
              <th>Fabric</th>
              <th>Rating</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.length > 0 ? (
              allProducts.map((product, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={product.image1}
                      alt="Product"
                      className="product-image"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>₹{product.old_price}</td>
                  <td>{product.category}</td>
                  <td>{product.offer}</td>
                  <td>{product.fabric}</td>
                  <td>{product.rating ?? "N/A"}</td>
                  <td>{product.product_count ?? 0}</td>
                  <td>
                    {product.product_status ? (
                      <span
                        className={`status-badge ${getStatusClass(
                          product.product_status
                        )}`}
                      >
                        {product.product_status}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <img
                      onClick={() => removeProduct(product.id)}
                      src={delete1}
                      alt="Remove"
                      className="delete-icon"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RemoveProduct;
