import React from 'react';
import { useAppContext } from '../../context/AppContext';
import './Navbar.css';

interface NavbarProps {
  onCartClick: () => void;
  cartItemCount: number;
  onLoginClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartItemCount, onLoginClick }) => {
  const { userData, logout } = useAppContext();

  // Sayfa içinde gezinme fonksiyonu
  const handleNavigation = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Kategori seçme fonksiyonu
  const handleCategorySelect = (category: string | null, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Kategori değişikliğini global state'e aktar
    if (window.localStorage) {
      window.localStorage.setItem('selectedCategory', category || '');
    }
    
    // Ürünler bölümüne git
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Sayfayı yenile (kategori filtresini uygulamak için)
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <a className="navbar-brand" href="#" onClick={(e) => handleNavigation('hero-section', e)}>E-Shop</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#" onClick={(e) => handleNavigation('hero-section', e)}>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => handleNavigation('products-section', e)}>Products</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#" onClick={(e) => handleCategorySelect("electronics", e)}>Electronics</a></li>
                <li><a className="dropdown-item" href="#" onClick={(e) => handleCategorySelect("men's clothing", e)}>Men's Clothing</a></li>
                <li><a className="dropdown-item" href="#" onClick={(e) => handleCategorySelect("women's clothing", e)}>Women's Clothing</a></li>
                <li><a className="dropdown-item" href="#" onClick={(e) => handleCategorySelect("jewelery", e)}>Jewelry</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" onClick={(e) => handleCategorySelect(null, e)}>All Products</a></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search products..." aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <div className="ms-3 d-flex">
            <button 
              className="btn btn-outline-primary me-2 position-relative" 
              onClick={onCartClick}
              title="Sepeti görüntüle"
            >
              <i className="bi bi-cart"></i>
              {cartItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {userData.isLoggedIn ? (
              <div className="dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userData.username}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><button className="dropdown-item" type="button">Hesabım</button></li>
                  <li><button className="dropdown-item" type="button">Siparişlerim</button></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" type="button" onClick={logout}>Çıkış Yap</button></li>
                </ul>
              </div>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={onLoginClick}
              >
                Giriş Yap
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;