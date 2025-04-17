import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import './ProductReviews.css';

interface ProductReviewsProps {
  productId: number;
  productName: string;
  onClose: () => void;
}

// Geri bildirim anketi için yeni bileşen
const FeedbackSurvey: React.FC = () => {
  const { lastReviewId, submitFeedbackSurvey, closeFeedbackSurvey } = useAppContext();
  const [satisfaction, setSatisfaction] = useState(5);
  const [comments, setComments] = useState('');

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();

    if (lastReviewId) {
      submitFeedbackSurvey(lastReviewId, satisfaction, comments);
    }
  };

  return (
    <div className="feedback-survey-overlay">
      <div className="feedback-survey-container">
        <div className="feedback-survey-header">
          <h3><i className="bi bi-emoji-smile"></i> Yorumunuz için Teşekkürler!</h3>
          <button className="close-btn" onClick={closeFeedbackSurvey}>&times;</button>
        </div>

        <div className="feedback-survey-content">
          <p className="lead text-center mb-4">Yorum deneyiminizi değerlendirir misiniz?</p>

          <form onSubmit={handleSubmitFeedback}>
            <div className="form-group mb-4">
              <label htmlFor="satisfaction" className="fw-bold mb-2">Memnuniyet Dereceniz:</label>
              <div className="rating-input d-flex justify-content-center gap-2 mb-3">
                {[5, 4, 3, 2, 1].map(star => (
                  <React.Fragment key={star}>
                    <input
                      type="radio"
                      id={`satisfaction${star}`}
                      name="satisfaction"
                      value={star}
                      checked={satisfaction === star}
                      onChange={() => setSatisfaction(star)}
                    />
                    <label htmlFor={`satisfaction${star}`} className="fs-4">
                      <i className="bi bi-star-fill"></i>
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="feedbackComments" className="fw-bold mb-2">Eklemek İstediğiniz Yorum:</label>
              <textarea
                id="feedbackComments"
                className="form-control shadow-sm"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
                placeholder="Yorum deneyiminiz hakkında düşünceleriniz (isteğe bağlı)"
              />
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-outline-secondary me-2"
                onClick={closeFeedbackSurvey}
              >
                İptal
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-send me-1"></i> Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productName, onClose }) => {
  const { userData, getProductReviews, addReview, deleteReview, showFeedbackSurvey } = useAppContext();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showAddReview, setShowAddReview] = useState(false);

  // Ürün yorumlarını alıyoruz
  const reviews = getProductReviews(productId);

  // Kullanıcının daha önce bu ürüne yorum yapıp yapmadığını kontrol edelim
  const userHasReviewed = userData.isLoggedIn && reviews.some(review => review.userId === userData.email);

  // Kullanıcı giriş yapmış ve daha önce yorum yapmamışsa, sayfaya girdiğinde yorum formunu göster
  useEffect(() => {
    if (userData.isLoggedIn && !userHasReviewed) {
      setShowAddReview(true);
    }
  }, [userData.isLoggedIn, userHasReviewed]);

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
    <div className="product-reviews-container">
      <div className="product-reviews-header">
        <h3><i className="bi bi-chat-quote me-2"></i>{productName} - Yorumlar</h3>
        <button className="close-btn" onClick={onClose}>&times;</button>
      </div>

      <div className="reviews-content">
        {showAddReview && (
          <div className="add-review-form mb-4 p-4 shadow-sm">
            <h4 className="mb-3"><i className="bi bi-pencil-square me-2"></i>Yorum Ekle</h4>
            <form onSubmit={handleSubmitReview}>
              <div className="form-group mb-4">
                <label htmlFor="rating" className="fw-bold mb-2">Puanınız</label>
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

              <div className="form-group mb-4">
                <label htmlFor="comment" className="fw-bold mb-2">Yorumunuz</label>
                <textarea
                  id="comment"
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  required
                  placeholder="Bu ürün hakkında düşüncelerinizi paylaşın..."
                />
              </div>

              <div className="d-flex justify-content-end">
                {userHasReviewed && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                    onClick={() => setShowAddReview(false)}
                  >
                    İptal
                  </button>
                )}
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-send me-1"></i> Gönder
                </button>
              </div>
            </form>
          </div>
        )}

        {reviews.length === 0 ? (
          <div className="no-reviews text-center p-5">
            <i className="bi bi-chat-text fs-1 text-muted mb-3"></i>
            <p className="fs-5 mb-2">Bu ürün için henüz yorum yapılmamış.</p>
            {!userData.isLoggedIn && (
              <p className="text-muted">Yorum yapmak için lütfen <strong>giriş yapın</strong>.</p>
            )}
          </div>
        ) : (
          <>
            <div className="reviews-summary mb-4">
              <h5 className="mb-3 text-secondary">Toplam {reviews.length} Yorum</h5>
              <div className="progress mb-2" style={{ height: "6px" }}>
                <div className="progress-bar bg-success" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} className="review-item p-4 mb-3 border rounded shadow-sm">
                  <div className="review-header">
                    <div>
                      <strong className="fs-5">{review.userName}</strong>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`bi ${i < review.rating ? 'bi-star-fill text-warning' : 'bi-star'}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <small className="review-date text-muted">{formatDate(review.date)}</small>
                  </div>
                  <p className="review-comment mt-3">{review.comment}</p>

                  {/* Kullanıcı kendi yorumunu silebilir */}
                  {userData.isLoggedIn && userData.email === review.userId && (
                    <div className="d-flex justify-content-end mt-2">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <i className="bi bi-trash me-1"></i> Sil
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {showFeedbackSurvey && <FeedbackSurvey />}
    </div>
  );
};

export default ProductReviews;
