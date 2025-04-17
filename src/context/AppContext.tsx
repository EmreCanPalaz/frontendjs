import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Geçici tip tanımlamaları (gerçek projenize uygun olarak güncelleyin)
export interface UserData {
  username: string;
  email: string;
  isLoggedIn: boolean;
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
  
  // Login fonksiyonu
  const login = (email: string, password: string) => {
    setIsLoading(true);
    
    // Burada normalde API çağrısı yapılırdı
    // Örnek olarak basit bir simülasyon yapıyoruz
    setTimeout(() => {
      setUserData({
        username: email.split('@')[0],
        email,
        isLoggedIn: true
      });
      setIsLoading(false);
    }, 500);
    
    return true;
  };
  
  // Register fonksiyonu
  const register = (username: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Burada normalde API çağrısı yapılırdı
    // Örnek olarak basit bir simülasyon yapıyoruz
    setTimeout(() => {
      setUserData({
        username,
        email,
        isLoggedIn: true
      });
      setIsLoading(false);
    }, 500);
    
    return true;
  };
  
  // Logout fonksiyonu
  const logout = () => {
    setUserData({
      username: '',
      email: '',
      isLoggedIn: false
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
    isFavorite
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
