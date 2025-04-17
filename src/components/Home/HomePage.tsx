import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import ProductList from '../Products/ProductList';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import AuthForms from '../Auth/AuthForms';
import { useAppContext } from '../../context/AppContext';
import './HomePage.css';

const HomePage: React.FC = () => {
  // App Context'ten state ve metodları alma
  const { 
    userData,
    cartItems,
    addToCart
  } = useAppContext();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showAuthForms, setShowAuthForms] = useState(!userData.isLoggedIn);

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

  return (
    <div className="home-page">
      <Navbar 
        onCartClick={toggleCart} 
        cartItemCount={cartItems.length} 
        onLoginClick={() => setShowAuthForms(true)}
      />
      
      {showCart && <Cart onClose={toggleCart} />}
      
      {showAuthForms && !userData.isLoggedIn && (
        <AuthForms onClose={() => setShowAuthForms(false)} />
      )}
      
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

export default HomePage;