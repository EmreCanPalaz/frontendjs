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
  const { userData, logout, favorites } = useAppContext();

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
              <a className="nav-link active" href="#hero-section">Ana Sayfa</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#products-section">Ürünler</a>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-danger nav-link"
                onClick={() => {
                  console.log('Stok Kontrol butonuna tıklandı');
                  if (onStockControlClick) onStockControlClick();
                }}
              >
                Stok Kontrol (Test)
              </button>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search products..." aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <div className="ms-3 d-flex">
            <button
              className="btn btn-outline-secondary me-2 position-relative"
              onClick={onFavoritesClick}
              title="Favorilerinizi görüntüle"
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