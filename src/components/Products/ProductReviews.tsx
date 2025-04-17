import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import './ProductReviews.css';

interface ProductReviewsProps {
  productId: number;
  productName: string;
  onClose: () => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productName, onClose }) => {
  const { userData, getProductReviews, addReview, deleteReview } = useAppContext();
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showAddReview, setShowAddReview] = useState(false);
  
  // Ürün yorumlarını alıyoruz
  const reviews = getProductReviews(productId);
  
  // Kullanıcının daha önce bu ürüne yorum yapıp yapmadığını kontrol edelim
  const userHasReviewed = userData.isLoggedIn && reviews.some(review => review.userId === userData.email);
  
  // Yorum gönderme
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userData.isLoggedIn) {
      alert('Yorum yapabilmek için giriş yapmalısınız!');
      return;
    }
    
    if (rating < 1 || rating > 5) {
      alert('Lütfen 1-5 arası bir puan verin!');
      return;
    }
    
    if (!comment.trim()) {
      alert('Lütfen bir yorum yazın!');
      return;
    }
    
    addReview(productId, rating, comment);
    setComment('');
    setRating(5);
    setShowAddReview(false);
  };
  
  // Yorumu sil
  const handleDeleteReview = (reviewId: number) => {
    if (window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
      deleteReview(reviewId);
    }
  };
  
  // Tarih formatlamak için yardımcı fonksiyon
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };
  
  return (
    <div className="reviews-overlay">
      <div className="reviews-container">
        <div className="reviews-header">
          <h2 className="reviews-title">{productName} - Yorumlar</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="reviews-content">
          {!userHasReviewed && userData.isLoggedIn && !showAddReview && (
            <button 
              className="btn btn-primary mb-3" 
              onClick={() => setShowAddReview(true)}
            >
              Yorum Yap
            </button>
          )}
          
          {showAddReview && (
            <div className="add-review-form mb-4">
              <h4>Yorum Yap</h4>
              <form onSubmit={handleSubmitReview}>
                <div className="form-group mb-3">
                  <label htmlFor="rating">Puanınız</label>
                  <div className="rating-input">
                    {[5, 4, 3, 2, 1].map(star => (
                      <React.Fragment key={star}>
                        <input 
                          type="radio" 
                          id={`star${star}`} 
                          name="rating" 
                          value={star} 
                          checked={rating === star}
                          onChange={() => setRating(star)}
                        />
                        <label htmlFor={`star${star}`}>
                          <i className="bi bi-star-fill"></i>
                        </label>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                
                <div className="form-group mb-3">
                  <label htmlFor="comment">Yorumunuz</label>
                  <textarea
                    id="comment"
                    className="form-control"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                
                <div className="d-flex justify-content-end">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary me-2"
                    onClick={() => setShowAddReview(false)}
                  >
                    İptal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Gönder
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {reviews.length === 0 ? (
            <div className="no-reviews">
              <i className="bi bi-chat-text"></i>
              <p>Bu ürün için henüz yorum yapılmamış.</p>
              {!userData.isLoggedIn && (
                <p>Yorum yapmak için lütfen giriş yapın.</p>
              )}
            </div>
          ) : (
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div>
                      <strong>{review.userName}</strong>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`bi ${i < review.rating ? 'bi-star-fill' : 'bi-star'}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <small className="review-date">{formatDate(review.date)}</small>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  
                  {/* Kullanıcı kendi yorumunu silebilir */}
                  {userData.isLoggedIn && userData.email === review.userId && (
                    <button 
                      className="btn btn-sm btn-outline-danger mt-2"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      <i className="bi bi-trash"></i> Sil
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
