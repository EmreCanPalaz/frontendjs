import React from 'react';
import { useAppContext } from '../../context/AppContext';
import './Navbar.css';

interface NavbarProps {
  onCartClick: () => void;
  cartItemCount: number;
  onLoginClick?: () => void;
  onFavoritesClick?: () => void;
  onStockControlClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartItemCount, onLoginClick, onFavoritesClick, onStockControlClick }) => {
  const { userData, logout, favorites, language, changeLanguage, translate } = useAppContext();

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#hero-section">ShopApp</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#hero-section">{translate('navHome')}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#products-section">{translate('navProducts')}</a>
            </li>
            {userData.hasStockControlAccess && (
              <li className="nav-item">
                <button
                  className="btn btn-danger nav-link"
                  onClick={() => {
                    console.log('Stok Kontrol butonuna tıklandı');
                    if (onStockControlClick) onStockControlClick();
                  }}
                >
                  {translate('navStockControl')}
                </button>
              </li>
            )}
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder={translate('navSearch')} aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">{translate('navSearchButton')}</button>
          </form>
          <div className="ms-3 d-flex">
            {/* Dil seçim dropdown'u */}
            <div className="dropdown me-2">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-translate me-1"></i>
                {language.toUpperCase()}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className={`dropdown-item ${language === 'tr' ? 'active' : ''}`}
                    onClick={() => changeLanguage('tr')}
                  >
                    <span className="flag-icon flag-icon-tr me-2"></span> Türkçe
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${language === 'en' ? 'active' : ''}`}
                    onClick={() => changeLanguage('en')}
                  >
                    <span className="flag-icon flag-icon-gb me-2"></span> English
                  </button>
                </li>
              </ul>
            </div>

            <button
              className="btn btn-outline-secondary me-2 position-relative"
              onClick={onFavoritesClick}
              title={translate('navFavorites')}
            >
              <i className="bi bi-heart"></i>
              {favorites && favorites.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              className="btn btn-outline-primary me-2 position-relative"
              onClick={onCartClick}
              title={translate('navCart')}
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
                  <li><button className="dropdown-item" type="button">{translate('navAccount')}</button></li>
                  <li><button className="dropdown-item" type="button">{translate('navOrders')}</button></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" type="button" onClick={logout}>{translate('navLogout')}</button></li>
                </ul>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={onLoginClick}
              >
                {translate('navLogin')}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;