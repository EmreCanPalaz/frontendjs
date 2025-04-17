import React from 'react';
import { useAppContext } from '../../context/AppContext';
import './ProductCard.css';

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps extends ProductProps {
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, title, price, description, category, image, rating, onAddToCart 
}) => {
  // Context'ten favori fonksiyonlarını alalım
  const { addToFavorites, removeFromFavorites, isFavorite } = useAppContext();
  
  // Bu ürün favori mi kontrol edelim
  const productIsFavorite = isFavorite(id);
  
  // Sepete ekleme işlemleri
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart();
    // Ürünün sepete eklendiğini bildiren daha interaktif geri bildirim
    const button = e.currentTarget as HTMLButtonElement;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="bi bi-check"></i> Added!';
    button.disabled = true;
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
    }, 1500);
  };

  // Ürün detay sayfasına yönlendirme
  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`${title} detayları görüntüleniyor...`);
  };
  
  // Favorilere ekleme/çıkarma işlemleri
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (productIsFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ id, title, price, description, category, image, rating });
    }
  };
  
  return (
    <div className="card product-card h-100">
      <div className="product-image-container">
        <img src={image} className="card-img-top product-image" alt={title} />
        <button 
          className={`favorite-button ${productIsFavorite ? 'active' : ''}`}
          onClick={handleFavoriteToggle}
          title={productIsFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
        >
          <i className={`bi ${productIsFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </button>
      </div>
      <div className="card-body d-flex flex-column">
        <div className="category-badge mb-2">
          <span className="badge bg-secondary">{category}</span>
        </div>
        <h5 className="card-title product-title">{title}</h5>
        <p className="card-text product-description">{description.substring(0, 100)}...</p>
        <div className="rating-container mt-auto mb-2">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`bi ${i < Math.floor(rating.rate) ? 'bi-star-fill' : 'bi-star'}`}
                title={i < Math.floor(rating.rate) ? "Yıldız" : "Boş Yıldız"}
              ></i>
            ))}
          </div>
          <small className="text-muted ms-2" title={`${rating.count} müşteri değerlendirmesi`}>({rating.count} reviews)</small>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="product-price mb-0">${price.toFixed(2)}</h5>
          <div>
            <button 
              className="btn btn-sm btn-outline-secondary me-1" 
              onClick={handleViewDetails}
              title="Ürün detaylarını görüntüle"
            >
              <i className="bi bi-eye"></i>
            </button>
            <button 
              className="btn btn-sm btn-primary" 
              onClick={handleAddToCart}
              title="Sepete ekle"
            >
              <i className="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 