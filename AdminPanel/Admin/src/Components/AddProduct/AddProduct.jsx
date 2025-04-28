import React, { useState } from 'react';
import './AddProduct.css';
import upload from '../AssertsAdmin/upload.png';

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    id: "",
    name: "",
    old_price: "",
    new_price: "",
    category: "",
    offer: "",
    color: "",
    fabric: "",
    delivery: "",
    full_name: "",
    rating: "",
    size_options: "",
    product_status: "",
    description: "",
    image1: null,
    image2: null,
    image3: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProductDetails({ ...productDetails, [name]: files[0] });
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
  };

  const Add_Product = async () => {
    // Basic validation
    for (const key in productDetails) {
      if (!productDetails[key] && !["image1", "image2", "image3"].includes(key)) {
        alert(`Please fill the ${key} field.`);
        return;
      }
    }
    if (!productDetails.image1 || !productDetails.image2 || !productDetails.image3) {
      alert("Please upload all three images.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image1", productDetails.image1);
      formData.append("image2", productDetails.image2);
      formData.append("image3", productDetails.image3);

      // Upload images first
      const uploadResponse = await fetch('https://southerntexport-e-commerce.onrender.com/uploadmultiple', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        const product = {
          id: Number(productDetails.id),
          name: productDetails.name,
          old_price: Number(productDetails.old_price),
          new_price: Number(productDetails.new_price),
          category: productDetails.category,
          offer: productDetails.offer,
          color: productDetails.color,
          fabric: productDetails.fabric,
          delivery: productDetails.delivery,
          full_name: productDetails.full_name,
          rating: Number(productDetails.rating),
          size_options: productDetails.size_options.split(',').map(size => size.trim()), // Comma separated sizes
          product_status: productDetails.product_status,
          description: productDetails.description,
          image1: uploadData.imageUrls[0],
          image2: uploadData.imageUrls[1],
          image3: uploadData.imageUrls[2],
        };

        const productResponse = await fetch('https://southerntexport-e-commerce.onrender.com/addproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const result = await productResponse.json();
        if (result.success) {
          alert('Product added successfully!');
          setProductDetails({
            id: "",
            name: "",
            old_price: "",
            new_price: "",
            category: "",
            offer: "",
            color: "",
            fabric: "",
            delivery: "",
            full_name: "",
            rating: "",
            size_options: "",
            product_status: "",
            description: "",
            image1: null,
            image2: null,
            image3: null,
          });
        } else {
          alert('Failed to add product.');
        }
      } else {
        alert('Failed to upload images.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the product.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-items">
        <h1>ADD PRODUCT</h1>

        {/* Form Fields */}
        {[
          { label: "Product ID", name: "id" },
          { label: "Product Name", name: "name" },
          { label: "Old Price", name: "old_price" },
          { label: "New Price", name: "new_price" },
          { label: "Category", name: "category" },
          { label: "Offer", name: "offer" },
          { label: "Color", name: "color" },
          { label: "Fabric", name: "fabric" },
          { label: "Delivery Info", name: "delivery" },
          { label: "Full Name", name: "full_name" },
          { label: "Rating", name: "rating" },
          { label: "Size Options (comma separated)", name: "size_options" },
          { label: "Product Status", name: "product_status" },
          { label: "Description", name: "description" },
        ].map((field) => (
          <div key={field.name} className="addproduct-field">
            <p>{field.label}</p>
            <input
              value={productDetails[field.name]}
              onChange={changeHandler}
              type="text"
              name={field.name}
              placeholder={`Enter ${field.label}`}
              required
            />
          </div>
        ))}

        {/* Image Uploads */}
        {["image1", "image2", "image3"].map((imgField) => (
          <div key={imgField} className="addproduct-field">
            <label htmlFor={imgField}>
              <p>Upload {imgField.toUpperCase()}</p>
              <img src={upload} className="imaged" alt="upload" />
            </label>
            <input
              onChange={changeHandler}
              type="file"
              name={imgField}
              id={imgField}
              hidden
            />
          </div>
        ))}

        {/* Submit Button */}
        <div className="down">
          <button
            onClick={Add_Product}
            className="addproduct-button"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Product"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;
