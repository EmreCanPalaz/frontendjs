import React from 'react';
import { useAppContext } from '../../context/AppContext';
import './Cart.css';

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const { 
    cartItems, 
    cartTotal, 
    updateItemQuantity,
    removeFromCart,
    clearCart
  } = useAppContext();

  const handleCheckout = () => {
    alert('Ödeme işlemi başlatılıyor...');
    clearCart();
    onClose();
  };

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h3>Sepetim ({cartItems.length} ürün)</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className="bi bi-cart-x"></i>
            <p>Sepetiniz boş</p>
            <button 
              className="btn btn-outline-primary" 
              onClick={onClose}
            >
              Alışverişe Devam Et
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <h4>{item.title}</h4>
                    <p className="item-price">{item.price.toFixed(2)} TL</p>
                  </div>
                  <div className="item-quantity">
                    <button 
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    {(item.price * item.quantity).toFixed(2)} TL
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-row">
                <span>Ara Toplam:</span>
                <span>{cartTotal.toFixed(2)} TL</span>
              </div>
              <div className="summary-row">
                <span>Kargo:</span>
                <span>0.00 TL</span>
              </div>
              <div className="summary-row total">
                <span>Toplam:</span>
                <span>{cartTotal.toFixed(2)} TL</span>
              </div>
              
              <div className="cart-actions">
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={clearCart}
                >
                  Sepeti Temizle
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleCheckout}
                >
                  Ödemeye Geç
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;