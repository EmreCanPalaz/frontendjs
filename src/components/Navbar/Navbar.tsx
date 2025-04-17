import React from 'react';
import { useAppContext } from '../../context/AppContext';
import './Navbar.css';

interface NavbarProps {
  onCartClick: () => void;
  cartItemCount: number;
  onLoginClick?: () => void;
  onFavoritesClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onCartClick, 
  cartItemCount,
  onLoginClick,
  onFavoritesClick 
}) => {
  const { userData, logout, favorites } = useAppContext();

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
          </ul>
          
          <div className="d-flex align-items-center">
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