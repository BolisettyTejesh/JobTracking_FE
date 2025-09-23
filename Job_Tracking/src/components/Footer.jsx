import React from "react";
import "./Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About</h4>
          <Link to="/About">Who We Are</Link>
        </div>

        <div className="footer-section">
          <h4>FAQs</h4>
          <Link to="/FAQ">Common Questions</Link>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>
            Email:{" "}
            <a href="mailto:trb@gmail.com" className="footer-email">
              trb@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} CareerConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
