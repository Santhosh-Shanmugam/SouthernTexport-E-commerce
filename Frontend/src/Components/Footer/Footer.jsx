import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";

import './Footer.css'
const Footer = () => {
    return (
        <div className="footer-con">
            <div className="footer-top">



                <div className="footer-about footer-inside">
                    <h3>About</h3>
                    <p>Contact Us</p>
                    <p>Careers</p>
                    <p>Corporate Information</p>
                    

                </div>


                {/* ///////// */}
                <div className="footer-contact footer-inside">
                    <h3>Contact</h3>
                    <p>Email:abc@sample.com</p>

                    

                </div>
                {/* ///////// */}
                <div className="footer-help footer-inside">
                    <h3>Help</h3>
                    <p>Payments</p>
                    <p>Shiping</p>
                    <p>Cancellation & Return</p>
                    <p>FAQ</p>


                </div>
                <div className="footer-address footer-inside">
                    <h3>Register Office Address</h3>
                    <p>Southern Texport,</p>
                    <p>6-b,A.V Complex,Workshop Street,</p>
                    <p>Khaderpet,Tiruppur-641601</p>
                    <p>Tamil Nadu,India</p>


                </div>
            </div>
            <div className="footer-bottom">
                <h3>Social Media</h3>
                <div className="footer-icons">
                <FaFacebook className="footer-icon"/>
                <FaInstagram  className="footer-icon"/>
                <FaLinkedin className="footer-icon"/>
                <FiYoutube className="footer-icon" />


                </div>
            </div>



        </div>
    )
}

export default Footer