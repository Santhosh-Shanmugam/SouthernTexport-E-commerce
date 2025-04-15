import React, { useState } from "react";
import ReviewModal from "../ReviewModal/ReviewModal";
import "./Review.css";

const Review = ({ Reviews, ProductId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Function to handle opening the modal
  const handleRateClick = () => setIsModalOpen(true);

  // Function to submit the review form data to the backend
  const handleReviewSubmit = async (formData) => {
    try {
      const response = await fetch(`https://southerntexport-e-commerce.onrender.com/product/${ProductId}/review`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        alert("Review submitted successfully!");
        // Optionally, you can reload reviews or update state here.
      } else {
        alert("Error submitting review");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!Reviews || !Array.isArray(Reviews)) {
    return <div>No reviews available.</div>;
  }

  return (
    <div className="review-item">
      <div className="review-title-con">
        <div className="review-title">
          <h2>Review</h2>
        </div>
        {/* Clicking this div opens the review modal */}
        <div className="rate-title" onClick={handleRateClick}>
          <h2>Rate</h2>
        </div>
      </div>
      {Reviews.map((review, index) => (
        <div className="single-review" key={index}>
          <div className="image-con-review">
            {review.revImage && review.revImage !== "string" ? (
              <img src={review.revImage} alt="Review" style={{ width: '100px', height: 'auto' }} />
            ) : (
              <div style={{ width: '0px', height: '0px' }}></div>
            )}
          </div>
          <div className="review-con-details">
            <p><strong>User:</strong> {review.user}</p>
            <p><strong>Rating:</strong> {review.rating} ⭐</p>
            <div className="comments-sec">

            <p><strong>Comment:</strong> {review.comment}</p>
            </div>
            <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default Review;
