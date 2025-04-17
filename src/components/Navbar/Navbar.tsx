import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
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
            <a href="#" className="btn btn-outline-primary me-2" onClick={(e) => handleNavigation('cart-section', e)}>
              <i className="bi bi-cart"></i> Cart
            </a>
            <a href="#" className="btn btn-outline-secondary" onClick={(e) => handleNavigation('account-section', e)}>
              <i className="bi bi-person"></i> Account
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;