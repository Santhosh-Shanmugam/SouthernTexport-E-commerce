import React from "react";
import './Review.css'
const Review = ({ Reviews, ProductId }) => {
    if (!Reviews || !Array.isArray(Reviews)) {
        return <div>No reviews available.</div>;
    }
    return (
        <div className="review-item">
            <div className="review-title-con">
                <div className="review-title">
                    <h2>Review</h2>
                </div>
                <div className="rate-title" onClick={() => {}}
                >
                    <h2>Rate</h2>
                </div>
            </div>
            {Reviews.map((review, index) => (
                <div className="single-review" key={index}>
                    <div className="image-con-review">

                        {review.revImage && review.revImage !== "string" ? (
                            <img src={review.revImage} alt={Review} style={{ width: '100px', height: 'auto' }} />
                        ) : (<div style={{ width: '0px', height: '0px' }}></div>)}
                    </div>
                    <div className="review-con-details">

                        <p><strong>User:</strong> {review.user}</p>
                        <p><strong>Rating:</strong> {review.rating} ⭐</p>
                        <p><strong>Comment:</strong> {review.comment}</p>
                        <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
                    </div>

                </div>
            ))}
        </div>

    );
};

export default Review