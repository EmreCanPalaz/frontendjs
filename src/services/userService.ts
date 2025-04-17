import { User, UserUpdateData } from '../types/user';

// Örnek API URL'i
const API_URL = 'https://api.example.com';

// Kullanıcı güncelleme
export const updateUser = async (userData: UserUpdateData): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/users/${userData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error('Kullanıcı güncellenemedi');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Kullanıcı güncelleme hatası:', error);
    throw error;
  }
};

// Kullanıcı getirme
export const getUser = async (userId: number): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Kullanıcı bilgileri alınamadı');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Kullanıcı getirme hatası:', error);
    throw error;
  }
};
