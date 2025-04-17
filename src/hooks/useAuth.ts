import { useState, useEffect, useCallback } from 'react';

export interface UserData {
  username: string;
  email: string;
  isLoggedIn: boolean;
}

export const useAuth = () => {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    email: '',
    isLoggedIn: false
  });
  const [isLoading, setIsLoading] = useState(true);

  // LocalStorage'dan kullanıcı bilgilerini yükleme
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      try {
        const parsedUserData = JSON.parse(savedUserData);
        setUserData(parsedUserData);
      } catch (e) {
        console.error('Kullanıcı verisi ayrıştırılamadı:', e);
      }
    }
    setIsLoading(false);
  }, []);

  // Kullanıcı verisi değiştiğinde localStorage'a kaydetme
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData, isLoading]);

  // Giriş işlemi 
  const login = useCallback((email: string, password: string) => {
    // Burada normalde bir API'ye istek yapılırdı
    // Başarılı login simulasyonu
    setUserData({
      username: email.split('@')[0], // Email'den basit username oluşturma
      email,
      isLoggedIn: true
    });
    
    return true;
  }, []);

  // Kayıt işlemi
  const register = useCallback((username: string, email: string, password: string) => {
    // Burada normalde bir API'ye istek yapılırdı
    // Başarılı kayıt simulasyonu
    setUserData({
      username,
      email,
      isLoggedIn: true
    });
    
    return true;
  }, []);

  // Çıkış işlemi
  const logout = useCallback(() => {
    setUserData({
      username: '',
      email: '',
      isLoggedIn: false
    });
    localStorage.removeItem('userData');
  }, []);

  return {
    userData,
    isLoading,
    login,
    register,
    logout
  };
};