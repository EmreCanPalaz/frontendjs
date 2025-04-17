import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import './ProductCard.css';
import ProductReviews from './ProductReviews';

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
  const { 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite, 
    getProductReviews 
  } = useAppContext();
  
  const [showReviews, setShowReviews] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Bu ürün favori mi kontrol edelim
  const productIsFavorite = isFavorite(id);
  
  // Ürünün yorumlarını alalım
  const productReviews = getProductReviews(id);
  const reviewCount = productReviews.length;
  
  // Ortalama puanı hesaplayalım
  const averageRating = reviewCount > 0 
    ? productReviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount 
    : rating?.rate || 0;
  
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
  
  // Yorumları görüntüleme/gizleme
  const toggleReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowReviews(!showReviews);
  };
  
  // Paylaşım seçeneklerini göster/gizle
  const toggleShareOptions = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowShareOptions(!showShareOptions);
  };
  
  // Ürün linkini kopyala
  const copyProductLink = () => {
    const productLink = `${window.location.origin}/product/${id}`;
    navigator.clipboard.writeText(productLink)
      .then(() => {
        alert('Ürün linki kopyalandı!');
        setShowShareOptions(false);
      })
      .catch(err => {
        console.error('Link kopyalanamadı:', err);
        alert('Link kopyalanamadı. Lütfen tekrar deneyin.');
      });
  };
  
  // Sosyal medyada paylaş
  const shareOnSocialMedia = (platform: string) => {
    const productLink = `${window.location.origin}/product/${id}`;
    const productTitle = encodeURIComponent(title);
    const productDescription = encodeURIComponent(description.substring(0, 100) + '...');
    
    let shareUrl = '';
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productLink)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${productTitle}&url=${encodeURIComponent(productLink)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${productTitle} - ${encodeURIComponent(productLink)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${productTitle}&body=${productDescription}%0A%0A${encodeURIComponent(productLink)}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
      setShowShareOptions(false);
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
                className={`bi ${i < Math.floor(averageRating) ? 'bi-star-fill' : 'bi-star'}`}
                title={`${averageRating.toFixed(1)} / 5`}
              ></i>
            ))}
          </div>
          <small 
            className="text-muted ms-2 review-count" 
            onClick={toggleReviews}
            title="Yorumları görüntüle"
          >
            ({reviewCount} yorum)
          </small>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="product-price mb-0">${price.toFixed(2)}</h5>
          <div>
            <button 
              className="btn btn-sm btn-outline-secondary me-1" 
              onClick={toggleShareOptions}
              title="Ürünü paylaş"
            >
              <i className="bi bi-share"></i>
            </button>
            <button 
              className="btn btn-sm btn-outline-secondary me-1" 
              onClick={handleViewDetails}
              title="Ürün detaylarını görüntüle"
            >
              <i className="bi bi-eye"></i>
            </button>
            <button 
              className="btn btn-sm btn-outline-info me-1" 
              onClick={toggleReviews}
              title="Yorumları görüntüle"
            >
              <i className="bi bi-chat-text"></i>
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
      
      {/* Paylaşım seçenekleri */}
      {showShareOptions && (
        <div className="share-options-overlay" onClick={toggleShareOptions}>
          <div className="share-options-container" onClick={e => e.stopPropagation()}>
            <div className="share-options-header">
              <h3>Ürünü Paylaş</h3>
              <button className="close-btn" onClick={toggleShareOptions}>&times;</button>
            </div>
            
            <div className="share-options-body">
              <div className="product-share-preview">
                <img src={image} alt={title} className="share-product-image" />
                <div className="share-product-info">
                  <h5>{title}</h5>
                  <p className="share-product-price">${price.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="share-options-buttons">
                <button className="share-option-btn copy" onClick={copyProductLink}>
                  <i className="bi bi-link-45deg"></i>
                  <span>Linki Kopyala</span>
                </button>
                
                <button className="share-option-btn facebook" onClick={() => shareOnSocialMedia('facebook')}>
                  <i className="bi bi-facebook"></i>
                  <span>Facebook</span>
                </button>
                
                <button className="share-option-btn twitter" onClick={() => shareOnSocialMedia('twitter')}>
                  <i className="bi bi-twitter"></i>
                  <span>Twitter</span>
                </button>
                
                <button className="share-option-btn whatsapp" onClick={() => shareOnSocialMedia('whatsapp')}>
                  <i className="bi bi-whatsapp"></i>
                  <span>WhatsApp</span>
                </button>
                
                <button className="share-option-btn email" onClick={() => shareOnSocialMedia('email')}>
                  <i className="bi bi-envelope"></i>
                  <span>Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Yorumlar Modal */}
      {showReviews && (
        <ProductReviews 
          productId={id} 
          productName={title}
          onClose={() => setShowReviews(false)} 
        />
      )}
    </div>
  );
};

export default ProductCard; 