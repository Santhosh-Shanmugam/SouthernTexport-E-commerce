import React from 'react';
import './Rating.css';
import { IoIosStar } from "react-icons/io";

const Rating = ({ rating }) => {
    return (
        <div>
            <div className="rating-all-inner">
                <div className="rating-container">
                    {Array.from({ length: rating }, (_, i) => (
                        <div key={i}> 
                            <IoIosStar className='star' />
                        </div>
                    ))}
                </div>
                <div className="rating-num">
                    <p>{rating}</p>
                </div>
            </div>
        </div>
    );
};

export default Rating;
