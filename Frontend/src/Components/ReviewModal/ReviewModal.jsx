import React, { useState } from "react";
import "./ReviewModal.css"; 

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user", name);  // Add name
    formData.append("rating", rating);
    formData.append("comment", comment);
    if (image) {
      formData.append("image", image);
    }

    await onSubmit(formData);
    setName("");
    setRating(0);
    setComment("");
    setImage(null);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Submit Your Review</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Rating:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Image (optional):</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
