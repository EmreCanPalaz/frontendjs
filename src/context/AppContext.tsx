import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Geçici tip tanımlamaları (gerçek projenize uygun olarak güncelleyin)
export interface UserData {
  username: string;
  email: string;
  isLoggedIn: boolean;
  isAdmin?: boolean;
  hasStockControlAccess?: boolean;
}

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends ProductProps {
  quantity: number;
}

// Geri bildirim anketi için yeni bir tip tanımlıyoruz
export interface FeedbackSurvey {
  id: number;
  reviewId: number;
  userId: string;
  satisfaction: number;
  comments?: string;
  date: string;
}

// Yorum tipi tanımlaması
export interface Review {
  id: number;
  productId: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Context için tip tanımları
interface AppContextType {
  // Auth
  userData: UserData;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;

  // Cart
  cartItems: CartItem[];
  cartTotal: number;
  addToCart: (product: ProductProps) => void;
  removeFromCart: (productId: number) => void;
  updateItemQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;

  // Favorites
  favorites: ProductProps[];
  addToFavorites: (product: ProductProps) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;

  // Reviews
  reviews: Review[];
  addReview: (productId: number, rating: number, comment: string) => void;
  getProductReviews: (productId: number) => Review[];
  getUserReviews: () => Review[];
  deleteReview: (reviewId: number) => void;

  // Feedback Surveys
  showFeedbackSurvey: boolean;
  lastReviewId: number | null;
  submitFeedbackSurvey: (reviewId: number, satisfaction: number, comments?: string) => void;
  closeFeedbackSurvey: () => void;
}

// Context oluşturma
const AppContext = createContext<AppContextType | undefined>(undefined);

// Context Provider bileşeni
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Auth state
  const [userData, setUserData] = useState<UserData>({
    username: '',
    email: '',
    isLoggedIn: false
  });
  const [isLoading, setIsLoading] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Favorites state
  const [favorites, setFavorites] = useState<ProductProps[]>([]);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);

  // Feedback Survey state
  const [feedbackSurveys, setFeedbackSurveys] = useState<FeedbackSurvey[]>([]);
  const [showFeedbackSurvey, setShowFeedbackSurvey] = useState(false);
  const [lastReviewId, setLastReviewId] = useState<number | null>(null);

  // LocalStorage'dan verileri yükleme
  useEffect(() => {
    // Sepeti yükle
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (e) {
        console.error('Sepet verisi ayrıştırılamadı:', e);
      }
    }

    // Favorileri yükle
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
      } catch (e) {
        console.error('Favoriler verisi ayrıştırılamadı:', e);
      }
    }

    // Yorumları yükle
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      try {
        const parsedReviews = JSON.parse(savedReviews);
        setReviews(parsedReviews);
      } catch (e) {
        console.error('Yorumlar verisi ayrıştırılamadı:', e);
      }
    }

    // Geri bildirim anketlerini yükle
    const savedFeedbackSurveys = localStorage.getItem('feedbackSurveys');
    if (savedFeedbackSurveys) {
      try {
        const parsedFeedbackSurveys = JSON.parse(savedFeedbackSurveys);
        setFeedbackSurveys(parsedFeedbackSurveys);
      } catch (e) {
        console.error('Geri bildirim anketleri verisi ayrıştırılamadı:', e);
      }
    }
  }, []);

  // Sepet güncellendiğinde localStorage'a kaydetme ve total hesaplama
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Toplam fiyatı hesapla
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  }, [cartItems]);

  // Favoriler güncellendiğinde localStorage'a kaydetme
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Yorumlar güncellendiğinde localStorage'a kaydetme
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Geri bildirim anketleri güncellendiğinde localStorage'a kaydetme
  useEffect(() => {
    localStorage.setItem('feedbackSurveys', JSON.stringify(feedbackSurveys));
  }, [feedbackSurveys]);

  // Login fonksiyonu
  const login = (email: string, password: string) => {
    setIsLoading(true);

    // Burada normalde API çağrısı yapılırdı
    // Örnek olarak basit bir simülasyon yapıyoruz
    setTimeout(() => {
      // admin@example.com ile giriş yapanları admin olarak işaretle
      const isAdmin = email === 'admin@example.com';
      // example@gmail.com kullanıcısına stok kontrol erişimi ver
      const hasStockControlAccess = email === 'example@gmail.com';

      console.log('Kullanıcı giriş yapıyor:', { email, isAdmin, hasStockControlAccess });

      setUserData({
        username: email.split('@')[0],
        email,
        isLoggedIn: true,
        isAdmin,
        hasStockControlAccess
      });
      setIsLoading(false);
    }, 1500); // Kimlik doğrulama mesajının daha görünür olması için süreyi uzattık

    return true;
  };

  // Register fonksiyonu
  const register = (username: string, email: string, password: string) => {
    setIsLoading(true);

    // Burada normalde API çağrısı yapılırdı
    // Örnek olarak basit bir simülasyon yapıyoruz
    setTimeout(() => {
      // admin@example.com ile kayıt olanları admin olarak işaretle
      const isAdmin = email === 'admin@example.com';
      // example@gmail.com kullanıcısına stok kontrol erişimi ver
      const hasStockControlAccess = email === 'example@gmail.com';

      setUserData({
        username,
        email,
        isLoggedIn: true,
        isAdmin,
        hasStockControlAccess
      });
      setIsLoading(false);
    }, 1500); // Kayıt işlemi mesajının görünür olması için süreyi uzattık

    return true;
  };

  // Logout fonksiyonu
  const logout = () => {
    setUserData({
      username: '',
      email: '',
      isLoggedIn: false,
      isAdmin: false,
      hasStockControlAccess: false
    });
  };

  // Sepete ürün ekleme
  const addToCart = (product: ProductProps) => {
    setCartItems(prevItems => {
      // Ürün zaten sepette var mı kontrol et
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        // Varsa miktarını artır
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Yoksa yeni ekle
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Sepetten ürün silme
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Ürün miktarını güncelleme
  const updateItemQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Sepeti temizleme
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // Favoriler fonksiyonları
  const addToFavorites = (product: ProductProps) => {
    setFavorites(prevFavorites => {
      // Ürün zaten favorilerde mi kontrol et
      const isAlreadyFavorite = prevFavorites.some(item => item.id === product.id);

      if (isAlreadyFavorite) {
        return prevFavorites; // Zaten favorilerdeyse bir şey yapma
      } else {
        return [...prevFavorites, product]; // Yeni ekle
      }
    });
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(item => item.id !== productId)
    );
  };

  const isFavorite = (productId: number) => {
    return favorites.some(item => item.id === productId);
  };

  // Ürüne yorum ekleme
  const addReview = (productId: number, rating: number, comment: string) => {
    if (!userData.isLoggedIn) {
      alert('Yorum yapabilmek için giriş yapmalısınız!');
      return;
    }

    const newReviewId = Date.now(); // Benzersiz ID için timestamp kullanıyoruz
    const newReview: Review = {
      id: newReviewId,
      productId,
      userId: userData.email, // Kullanıcı ID'si olarak email'i kullanıyoruz
      userName: userData.username,
      rating,
      comment,
      date: new Date().toISOString()
    };

    setReviews(prevReviews => [...prevReviews, newReview]);

    // Yorum eklendikten sonra geri bildirim anketini göster
    setLastReviewId(newReviewId);
    setShowFeedbackSurvey(true);
  };

  // Ürüne ait yorumları getirme
  const getProductReviews = (productId: number) => {
    return reviews.filter(review => review.productId === productId);
  };

  // Kullanıcının yaptığı yorumları getirme
  const getUserReviews = () => {
    if (!userData.isLoggedIn) return [];
    return reviews.filter(review => review.userId === userData.email);
  };

  // Yorum silme
  const deleteReview = (reviewId: number) => {
    setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
  };

  // Geri bildirim anketi gönderme
  const submitFeedbackSurvey = (reviewId: number, satisfaction: number, comments?: string) => {
    const newFeedbackSurvey: FeedbackSurvey = {
      id: Date.now(),
      reviewId,
      userId: userData.email,
      satisfaction,
      comments,
      date: new Date().toISOString()
    };

    setFeedbackSurveys(prevSurveys => [...prevSurveys, newFeedbackSurvey]);
    setShowFeedbackSurvey(false);
    setLastReviewId(null);
  };

  // Geri bildirim anketini kapatma
  const closeFeedbackSurvey = () => {
    setShowFeedbackSurvey(false);
    setLastReviewId(null);
  };

  // Context value
  const value: AppContextType = {
    userData,
    isLoading,
    login,
    register,
    logout,
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    reviews,
    addReview,
    getProductReviews,
    getUserReviews,
    deleteReview,
    showFeedbackSurvey,
    lastReviewId,
    submitFeedbackSurvey,
    closeFeedbackSurvey
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook context kullanımı için
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
