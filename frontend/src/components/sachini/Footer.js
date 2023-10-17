import React from 'react';
import './styles/Footer.css'; // Import your CSS file
import phoneIcon from './images/phone.png'; // Import the phone.png image
import emailIcon from './images/email.jpg'; // Import the email.png image
import locationIcon from './images/location.png'; // Import the location.jpg image
import instergram from './images/instergram.png';
import facebook from './images/facebook.png';
import browsing from './images/browsing.png';
import footerImg from './images/footerImg.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="contact-container">
        <div className="contact-us">
          <h4>Contact Us:</h4>
          <div className="contact-info">
            <div className="contact-item">
              <img src={phoneIcon} alt="Phone Icon" className="small-icon" />
            </div>
            <div className="contact-item">
              <p>071 22221999</p>
            </div>
            <div className="contact-item">
              <img src={emailIcon} alt="Email Icon" className="small-icon" />
            </div>
            <div className="contact-item">
              <p>govijana@gmail.com</p>
            </div>
            <div className="contact-item">
              <img src={locationIcon} alt="Location Icon" className="small-icon" />
            </div>
            <div className="contact-item">
              <p>Address</p>
            </div>
          </div>
        </div>
        <div className="Follow us on">
          <h4 style={{ textAlign: 'center' }}>Follow Us On:</h4>
          <div className="contact-info">
            <div className="contact-item">
              <img src={instergram} alt="Phone Icon" className="small-icon" />
            </div>
            <div className="contact-item">
              <p>Instergram</p>
            </div>
            <div className="contact-item">
              <img src={facebook} alt="Email Icon" className="small-icon" />
            </div>
            <div className="contact-item">
              <p>Facebook</p>
            </div>
            <div className="contact-item">
              <img src={browsing} alt="Location Icon" className="small-icon" />
            </div>
            <div className="contact-item">
              <p>www.govijanaseva.com</p>
            </div>
          </div>
        </div>
          <div className="right-image">
              <img
                src={footerImg}
                alt="Right Image"
                className="right-image-style"
              />
            </div>
      </div>
    </footer>
  );
}

export default Footer;
