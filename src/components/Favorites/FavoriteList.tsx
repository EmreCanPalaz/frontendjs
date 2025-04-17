import React from 'react';
import { useAppContext } from '../../context/AppContext';
import './FavoritesList.css';

interface FavoritesListProps {
  onClose: () => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ onClose }) => {
  const { favorites, removeFromFavorites, addToCart } = useAppContext();

  // Sepete ekle ve favorilerden çıkar
  const handleAddToCartAndRemove = (productId: number) => {
    const product = favorites.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      removeFromFavorites(productId);
    }
  };

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

export default FavoritesList;
