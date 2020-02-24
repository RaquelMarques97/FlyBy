import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => (

    <>
        <div className="footer">

            <ul className="contact">
                <div><li><NavLink exact to="/Contact" >ABOUT US</NavLink></li></div>
            </ul>

            <div className="social">
                <ul >
                    <li><a href="https://www.instagram.com/nasa/?hl=en"><img src="instagram.png" alt=""></img></a></li>
                    <li><a href="https://www.facebook.com/nasasolarsystem/"><img src='facebook.png' alt=""></img></a></li>
                </ul>
            </div>
        </div>
    </>
);


export default Footer;