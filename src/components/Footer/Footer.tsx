import React, { useState } from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSocialClick = (platform: string, e: React.MouseEvent) => {
    e.preventDefault();
    alert(`${platform} sayfasına yönlendiriliyorsunuz...`);
  };

  const handleLinkClick = (page: string, e: React.MouseEvent) => {
    e.preventDefault();
    alert(`${page} sayfasına yönlendiriliyorsunuz...`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') {
      alert('Lütfen bir e-posta adresi girin.');
      return;
    }
    alert(`${email} adresi bülten listemize kaydedildi!`);
    setEmail('');
  };

  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">E-Shop</h5>
            <p>
              Your one-stop shop for all your shopping needs. Quality products, competitive prices, and excellent customer service.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon me-2" onClick={(e) => handleSocialClick('Facebook', e)}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-icon me-2" onClick={(e) => handleSocialClick('Twitter', e)}>
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="social-icon me-2" onClick={(e) => handleSocialClick('Instagram', e)}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-icon" onClick={(e) => handleSocialClick('LinkedIn', e)}>
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Shop</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="footer-link" onClick={(e) => handleLinkClick("Men's Clothing", e)}>Men's Clothing</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link" onClick={(e) => handleLinkClick("Women's Clothing", e)}>Women's Clothing</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link" onClick={(e) => handleLinkClick('Electronics', e)}>Electronics</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link" onClick={(e) => handleLinkClick('Jewelry', e)}>Jewelry</a>
              </li>
              <li>
                <a href="#" className="footer-link" onClick={(e) => handleLinkClick('Sale Items', e)}>Sale Items</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Customer Service</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="footer-link" onClick={(e) => handleLinkClick('Contact Us', e)}>Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link" onClick={(e) => handleLinkClick('Shipping & Returns', e)}>Shipping & Returns</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link" onClick={(e) => handleLinkClick('FAQ', e)}>FAQ</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link" onClick={(e) => handleLinkClick('Size Guide', e)}>Size Guide</a>
              </li>
              <li>
                <a href="#" className="footer-link" onClick={(e) => handleLinkClick('Track Your Order', e)}>Track Your Order</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Newsletter</h5>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form onSubmit={handleSubscribe}>
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Your email address" 
                  aria-label="Email" 
                  aria-describedby="button-addon2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="btn btn-outline-light" type="submit" id="button-addon2">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="copyright text-center py-3 mt-4 border-top border-secondary">
        <div className="container">
          <p className="mb-0"> Created By EmKaHan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 