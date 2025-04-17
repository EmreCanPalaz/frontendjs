import React, { useState, useEffect } from 'react';
import { getUser } from '../services/userService';
import { User } from '../types/user';

const UserManagementPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Örnek olarak ilk kullanıcıyı getir
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getUser(1); // 1 numaralı kullanıcıyı getir
        setSelectedUser(userData);
        setError(null);
      } catch (err) {
        setError('Kullanıcı bilgileri yüklenirken bir hata oluştu');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <div className="container mt-5">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="container mt-5 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 mb-4">
          <h1>Kullanıcı Yönetimi</h1>
          
          {selectedUser && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{selectedUser.username}</h5>
                <p className="card-text">
                  <strong>ID:</strong> {selectedUser.id}<br />
                  <strong>Rol:</strong> {selectedUser.role}<br />
                  {selectedUser.email && <><strong>Email:</strong> {selectedUser.email}<br /></>}
                </p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => alert("Kullanıcı güncelleme formu henüz eklenmedi.")}
                >
                  Kullanıcıyı Güncelle
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
