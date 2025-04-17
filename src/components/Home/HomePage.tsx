import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import ProductList from '../Products/ProductList';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import Footer from '../Footer/Footer';
import './HomePage.css';
import { ProductProps } from '../Products/ProductCard';

// Sepet öğe tipi tanımı
interface CartItem extends ProductProps {
  quantity: number;
}

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Sepet state'i ekleyin
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);

  // LocalStorage'dan kategori bilgisini al
  useEffect(() => {
    if (window.localStorage) {
      const savedCategory = window.localStorage.getItem('selectedCategory');
      if (savedCategory) {
        setSelectedCategory(savedCategory === '' ? null : savedCategory);
        // Kategori bilgisini bir kez kullandıktan sonra temizle
        window.localStorage.removeItem('selectedCategory');
      }
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

  // Login işlemi 
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada normalde bir API'ye istek yapılırdı
    if (email && password) {
      setIsLoggedIn(true);
      alert(`Başarıyla giriş yapıldı: ${email}`);
    } else {
      alert('Lütfen tüm alanları doldurun!');
    }
  };

  // Kayıt işlemi
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada normalde bir API'ye istek yapılırdı
    if (email && password && username) {
      setIsLoggedIn(true);
      alert(`Başarıyla kayıt olundu: ${username}`);
    } else {
      alert('Lütfen tüm alanları doldurun!');
    }
  };

  // Çıkış işlemi
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setUsername('');
    alert('Başarıyla çıkış yapıldı');
  };

  // Formlar arası geçiş
  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
    // Form değişince inputları temizle
    setEmail('');
    setPassword('');
    setUsername('');
  };

  // Sepete ürün ekleme
  const addToCart = (product: ProductProps) => {
    // Önceden sepette var mı kontrol et
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Eğer ürün zaten sepette varsa, miktarını artır
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Eğer ürün sepette yoksa, yeni ekle
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    // Cart total'ı güncelle
    updateCartTotal([...cartItems, { ...product, quantity: 1 }]);
  };

  // Sepetten ürün çıkarma
  const removeFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
    
    // Cart total'ı güncelle
    updateCartTotal(updatedCartItems);
  };

  // Ürün miktarını değiştirme
  const updateItemQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Miktar 0 veya negatif olursa ürünü tamamen kaldır
      removeFromCart(productId);
      return;
    }
    
    const updatedCartItems = cartItems.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    );
    
    setCartItems(updatedCartItems);
    
    // Cart total'ı güncelle
    updateCartTotal(updatedCartItems);
  };

  // Sepet toplamını hesaplama
  const updateCartTotal = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  };

  // Sepeti temizleme
  const clearCart = () => {
    setCartItems([]);
    setCartTotal(0);
  };

  return (
    <div className="home-page">
      <Navbar />
      
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
      
      <div className="features-section py-5 mt-5 bg-light">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="feature-item">
                <i className="bi bi-truck feature-icon"></i>
                <h4>Free Shipping</h4>
                <p>On orders over $50</p>
                <button 
                  className="btn btn-sm btn-outline-primary mt-2" 
                  onClick={() => alert('Kargo detayları sayfasına yönlendiriliyorsunuz...')}
                  title="Kargo detaylarını görüntüle"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="feature-item">
                <i className="bi bi-arrow-repeat feature-icon"></i>
                <h4>Easy Returns</h4>
                <p>30-day return policy</p>
                <button 
                  className="btn btn-sm btn-outline-primary mt-2" 
                  onClick={() => alert('İade politikası sayfasına yönlendiriliyorsunuz...')}
                  title="İade politikası detaylarını görüntüle"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-item">
                <i className="bi bi-shield-check feature-icon"></i>
                <h4>Secure Payments</h4>
                <p>100% secure checkout</p>
                <button 
                  className="btn btn-sm btn-outline-primary mt-2" 
                  onClick={() => alert('Güvenli ödeme detayları sayfasına yönlendiriliyorsunuz...')}
                  title="Ödeme güvenliği hakkında bilgi alın"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div id="cart-section" className="py-5 mt-5 bg-light">
        <div className="container">
          <h2 className="section-title mb-4">Your Cart</h2>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-cart4" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
              <p className="mt-3">Your cart is currently empty.</p>
              <button className="btn btn-primary" onClick={handleShopNow}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="cart-item-image me-3" 
                              style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                            />
                            <div>
                              <h6 className="mb-0">{item.title}</h6>
                              <small className="text-muted">{item.category}</small>
                            </div>
                          </div>
                        </td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <div className="input-group input-group-sm" style={{ maxWidth: '120px' }}>
                            <button 
                              className="btn btn-outline-secondary" 
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <input 
                              type="text" 
                              className="form-control text-center" 
                              value={item.quantity}
                              readOnly
                            />
                            <button 
                              className="btn btn-outline-secondary" 
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-danger" 
                            onClick={() => removeFromCart(item.id)}
                            title="Remove from cart"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Coupon code" />
                    <button className="btn btn-outline-secondary" type="button">Apply</button>
                  </div>
                  <button className="btn btn-outline-danger" onClick={clearCart}>
                    <i className="bi bi-x-circle me-1"></i> Clear Cart
                  </button>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Order Summary</h5>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Shipping</span>
                        <span>{cartTotal > 50 ? 'Free' : '$4.99'}</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between fw-bold">
                        <span>Total</span>
                        <span>${(cartTotal > 50 ? cartTotal : cartTotal + 4.99).toFixed(2)}</span>
                      </div>
                      <button className="btn btn-success w-100 mt-3">
                        <i className="bi bi-credit-card me-2"></i> Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div id="account-section" className="py-5 mt-5 bg-light">
        <div className="container">
          <h2 className="section-title mb-4 text-center">Your Account</h2>
          
          {isLoggedIn ? (
            <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                <div className="card">
                  <div className="card-body">
                    <i className="bi bi-person-circle" style={{ fontSize: '4rem', color: 'var(--primary-color)' }}></i>
                    <h3 className="mt-3">Welcome back!</h3>
                    <p>You are logged in as <strong>{email}</strong></p>
                    <div className="d-grid gap-2 col-6 mx-auto mt-4">
                      <button className="btn btn-primary" onClick={() => alert('Profil sayfanıza yönlendiriliyorsunuz')}>
                        View Profile
                      </button>
                      <button className="btn btn-outline-primary" onClick={() => alert('Sipariş geçmişinize yönlendiriliyorsunuz')}>
                        Order History
                      </button>
                      <button className="btn btn-outline-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <ul className="nav nav-tabs card-header-tabs">
                      <li className="nav-item">
                        <button 
                          className={`nav-link ${showLoginForm ? 'active text-dark' : 'text-white'}`}
                          onClick={() => setShowLoginForm(true)}
                        >
                          Giriş Yap
                        </button>
                      </li>
                      <li className="nav-item">
                        <button 
                          className={`nav-link ${!showLoginForm ? 'active text-dark' : 'text-white'}`}
                          onClick={() => setShowLoginForm(false)}
                        >
                          Kayıt Ol
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    {showLoginForm ? (
                      // Login Formu
                      <form onSubmit={handleLogin}>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                            <input 
                              type="email" 
                              className="form-control" 
                              id="email" 
                              placeholder="ornekmail@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="password" className="form-label">Şifre</label>
                          <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-lock"></i></span>
                            <input 
                              type="password" 
                              className="form-control" 
                              id="password" 
                              placeholder="Şifrenizi girin"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3 form-check">
                          <input type="checkbox" className="form-check-input" id="rememberMe" />
                          <label className="form-check-label" htmlFor="rememberMe">Beni hatırla</label>
                        </div>
                        <div className="d-grid gap-2">
                          <button type="submit" className="btn btn-primary">Giriş Yap</button>
                        </div>
                        <div className="text-center mt-3">
                          <a href="#" className="text-decoration-none">Şifremi unuttum</a>
                          <p className="mt-3 mb-0">Hesabınız yok mu? <button type="button" className="btn btn-link p-0" onClick={toggleForm}>Kayıt Ol</button></p>
                        </div>
                      </form>
                    ) : (
                      // Kayıt Formu
                      <form onSubmit={handleRegister}>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">Kullanıcı Adı</label>
                          <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-person"></i></span>
                            <input 
                              type="text" 
                              className="form-control" 
                              id="username" 
                              placeholder="Kullanıcı adınızı girin"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="registerEmail" className="form-label">Email</label>
                          <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                            <input 
                              type="email" 
                              className="form-control" 
                              id="registerEmail" 
                              placeholder="ornekmail@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="registerPassword" className="form-label">Şifre</label>
                          <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-lock"></i></span>
                            <input 
                              type="password" 
                              className="form-control" 
                              id="registerPassword" 
                              placeholder="Şifrenizi girin"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                          </div>
                          <div className="form-text">Şifreniz en az 8 karakter olmalıdır.</div>
                        </div>
                        <div className="mb-3 form-check">
                          <input type="checkbox" className="form-check-input" id="agreeTerms" required />
                          <label className="form-check-label" htmlFor="agreeTerms">
                            <a href="#" className="text-decoration-none">Kullanım şartlarını</a> kabul ediyorum
                          </label>
                        </div>
                        <div className="d-grid gap-2">
                          <button type="submit" className="btn btn-primary">Kayıt Ol</button>
                        </div>
                        <div className="text-center mt-3">
                          <p className="mb-0">Zaten hesabınız var mı? <button type="button" className="btn btn-link p-0" onClick={toggleForm}>Giriş Yap</button></p>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;