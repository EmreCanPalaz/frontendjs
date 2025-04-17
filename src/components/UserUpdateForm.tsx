import React, { useState } from 'react';
import './UserUpdateForm.css';

interface UserUpdateFormProps {
  onCancel: () => void;
  onUpdate: (username: string, password: string, role: string) => void;
}

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({ onCancel, onUpdate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(username, password, role);
  };

  return (
    <div className="user-update-form-container">
      <form className="user-update-form" onSubmit={handleSubmit}>
        <h2>Kullanıcı Güncelle</h2>
        
        <div className="form-group">
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Yeni Şifre</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Yetki</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">Kullanıcı</option>
            <option value="admin">Yönetici</option>
            <option value="editor">Editör</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Güncelle</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>İptal</button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateForm;
