import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import ProductList from '../Products/ProductList';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import AuthForms from '../Auth/AuthForms';
import StockControl from '../StockControl/StockControl';
import { useAppContext } from '../../context/AppContext';
import './HomePage.css';

const HomePage: React.FC = () => {
  // App Context'ten state ve metodları alma
  const {
    userData,
    cartItems,
    addToCart,
    isLoading
  } = useAppContext();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showAuthForms, setShowAuthForms] = useState(!userData.isLoggedIn);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showStockControl, setShowStockControl] = useState(false);

  // LocalStorage'dan kategori bilgisini al
  useEffect(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      setSelectedCategory(savedCategory === '' ? null : savedCategory);
      // Kategori bilgisini bir kez kullandıktan sonra temizle
      localStorage.removeItem('selectedCategory');
    }
  }, []);

  const handleShopNow = (e: React.MouseEvent) => {
    e.preventDefault();
    // Scroll to products section
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const toggleStockControl = () => {
    console.log('toggleStockControl çağrıldı. Mevcut durum:', showStockControl);
    setShowStockControl(!showStockControl);
    console.log('toggleStockControl sonrası yeni durum:', !showStockControl);
  };

  return (
    <div className="home-page">
      <Navbar
        onCartClick={toggleCart}
        cartItemCount={cartItems.length}
        onLoginClick={() => setShowAuthForms(true)}
        onFavoritesClick={toggleFavorites}
        onStockControlClick={toggleStockControl}
      />

      {showCart && <Cart onClose={toggleCart} />}

      {showAuthForms && !userData.isLoggedIn && (
        <AuthForms onClose={() => {
          if (!isLoading) {
            setShowAuthForms(false);
          }
        }} />
      )}

      {showFavorites && <FavoritesList onClose={() => setShowFavorites(false)} />}

      {/* StockControl modal bileşeni */}
      {showStockControl ? (
        <StockControl onClose={() => setShowStockControl(false)} />
      ) : null}

      <div className="hero-section" id="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="hero-title">Find Your Style, Shop With Confidence</h1>
              <p className="hero-subtitle">Discover the latest trends and products at amazing prices.</p>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleShopNow}
                title="Alışverişe başla"
              >
                Shop Now
              </button>
            </div>
            <div className="col-md-6">
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hvcHBpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                className="img-fluid hero-image"
                alt="Shopping banner" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5" id="products-section">
        <div className="row">
          <div className="col-lg-3">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          <div className="col-lg-9">
            <h2 className="section-title mb-4">
              {selectedCategory === null
                ? 'All Products'
                : `${selectedCategory.charAt(0).toUpperCase()}${selectedCategory.slice(1)}`
              }
            </h2>
            <ProductList
              category={selectedCategory}
              onAddToCart={addToCart}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// İç içe FavoritesList bileşeni tanımı
const FavoritesList = ({ onClose }: { onClose: () => void }) => {
  const { favorites, removeFromFavorites, addToCart } = useAppContext();

  return (
    <div className="favorites-overlay">
      <div className="favorites-container">
        <div className="favorites-header">
          <h2 className="favorites-title">Favori Ürünleriniz ({favorites.length})</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <i className="bi bi-heart"></i>
            <p>Henüz favori ürününüz bulunmuyor.</p>
            <p>Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca ulaşabilirsiniz.</p>
          </div>
        ) : (
          <div className="favorites-list">
            {favorites.map(product => (
              <div key={product.id} className="favorite-item">
                <div className="favorite-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="favorite-details">
                  <h5>{product.title}</h5>
                  <p className="favorite-price">${product.price.toFixed(2)}</p>
                </div>
                <div className="favorite-actions">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromFavorites(product.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => addToCart(product)}
                  >
                    <i className="bi bi-cart-plus"></i> Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;