import { useState, useEffect, useCallback } from 'react';

// ProductProps tipi tanımı
export interface ProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
}

export interface CartItem extends ProductProps {
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);

  // LocalStorage'dan sepeti yükleme
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        updateCartTotal(parsedCart);
      } catch (e) {
        console.error('Sepet verisi ayrıştırılamadı:', e);
      }
    }
  }, []);

  // Sepet güncellendiğinde localStorage'a kaydetme
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartTotal(cartItems);
  }, [cartItems]);

  // Sepet toplamını hesaplama
  const updateCartTotal = useCallback((items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  }, []);

  // Sepete ürün ekleme
  const addToCart = useCallback((product: ProductProps) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Eğer ürün zaten sepette varsa, miktarını artır
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Eğer ürün sepette yoksa, yeni ekle
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }, []);

  // Sepetten ürün çıkarma
  const removeFromCart = useCallback((productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  // Ürün miktarını değiştirme
  const updateItemQuantity = useCallback((productId: number, newQuantity: number) => {
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
  }, [removeFromCart]);

  // Sepeti temizleme
  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartTotal(0);
    localStorage.removeItem('cart');
  }, []);

  return {
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart
  };
};