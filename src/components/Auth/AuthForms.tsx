import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import './AuthForms.css';

// onClose prop'unu ekleyin
interface AuthFormsProps {
  onClose: () => void;
}

const AuthForms: React.FC<AuthFormsProps> = ({ onClose }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);  // Kimlik doğrulama durumu
  
  const { login, register, isLoading } = useAppContext();

  // Login işlemi 
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun!');
      return;
    }
    
    // Kimlik doğrulama durumunu başlat
    setIsAuthenticating(true);
    setSuccessMessage('Kimliğiniz doğrulanıyor...');
    
    // Sahte gecikme ekleyerek doğrulama animasyonu gösterme
    setTimeout(() => {
      const loginSuccess = login(email, password);
      
      setIsAuthenticating(false);
      
      if (!loginSuccess) {
        setError('Giriş başarısız! Lütfen bilgilerinizi kontrol edin.');
        setSuccessMessage('');
      } else {
        setSuccessMessage('Giriş başarılı! Yönlendiriliyorsunuz...');
        // 1 saniye sonra modal'ı kapat
        setTimeout(() => {
          if (onClose) onClose();
        }, 1000);
      }
    }, 1500); // 1.5 saniye doğrulama mesajını göster
  };

  // Kayıt işlemi
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!email || !password || !username) {
      setError('Lütfen tüm alanları doldurun!');
      return;
    }
    
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır!');
      return;
    }
    
    // Kimlik doğrulama durumunu başlat
    setIsAuthenticating(true);
    setSuccessMessage('Hesabınız oluşturuluyor...');
    
    // Sahte gecikme ekleyerek işlem süreci göster
    setTimeout(() => {
      const registerSuccess = register(username, email, password);
      
      setIsAuthenticating(false);
      
      if (!registerSuccess) {
        setError('Kayıt başarısız! Lütfen farklı bilgiler deneyin.');
        setSuccessMessage('');
      } else {
        setSuccessMessage('Kayıt başarılı! Hoş geldiniz...');
        // 1 saniye sonra modal'ı kapat
        setTimeout(() => {
          if (onClose) onClose();
        }, 1000);
      }
    }, 1500); // 1.5 saniye mesajı göster
  };

  // Şifre sıfırlama işlemi
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!resetEmail) {
      setError('Lütfen email adresinizi girin!');
      return;
    }
    
    // Burada normalde bir API çağrısı yapılırdı
    // Örnek başarılı bir işlem simüle ediyoruz
    setTimeout(() => {
      setSuccessMessage(`${resetEmail} adresine şifre sıfırlama bağlantısı gönderildi.`);
      setResetEmail('');
    }, 1000);
  };

  // Formlar arası geçiş
  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
    setShowForgotPassword(false);
    // Form değişince inputları ve hata mesajını temizle
    setEmail('');
    setPassword('');
    setUsername('');
    setError('');
    setSuccessMessage('');
  };

  // Şifremi unuttum formunu göster/gizle
  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setError('');
    setSuccessMessage('');
  };

  // Ana forma dön (şifremi unuttum formundan)
  const backToLogin = () => {
    setShowForgotPassword(false);
    setResetEmail('');
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="auth-forms-container">
      <div className="auth-forms-modal">
        {/* Kapatma butonu */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        
        {/* Hata ve Başarı Mesajları */}
        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">
            {isAuthenticating && <div className="loading-spinner"></div>}
            {successMessage}
          </div>
        )}
        
        {!showForgotPassword ? (
          <>
            <div className="auth-forms-header">
              <button 
                className={`tab-btn ${showLoginForm ? 'active' : ''}`} 
                onClick={() => setShowLoginForm(true)}
              >
                Giriş Yap
              </button>
              <button 
                className={`tab-btn ${!showLoginForm ? 'active' : ''}`} 
                onClick={() => setShowLoginForm(false)}
              >
                Kayıt Ol
              </button>
            </div>
            
            {showLoginForm ? (
              <form onSubmit={handleLogin} className="auth-form">
                <div className="form-group">
                  <label htmlFor="login-email">Email</label>
                  <input
                    type="email"
                    id="login-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isAuthenticating || isLoading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="login-password">Şifre</label>
                  <input
                    type="password"
                    id="login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isAuthenticating || isLoading}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block"
                  disabled={isAuthenticating || isLoading}
                >
                  {isAuthenticating ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                </button>
                
                <p className="form-footer">
                  Hesabınız yok mu? <button type="button" className="link-btn" onClick={toggleForm}>Kayıt Olun</button>
                </p>
                
                <p className="forgot-password">
                  <button type="button" className="link-btn" onClick={toggleForgotPassword}>
                    Şifremi Unuttum
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="auth-form">
                <div className="form-group">
                  <label htmlFor="register-username">Kullanıcı Adı</label>
                  <input
                    type="text"
                    id="register-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isAuthenticating || isLoading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="register-email">Email</label>
                  <input
                    type="email"
                    id="register-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isAuthenticating || isLoading}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="register-password">Şifre</label>
                  <input
                    type="password"
                    id="register-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isAuthenticating || isLoading}
                  />
                  <small className="form-text text-muted">Şifreniz en az 6 karakter olmalıdır.</small>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block"
                  disabled={isAuthenticating || isLoading}
                >
                  {isAuthenticating ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
                </button>
                
                <p className="form-footer">
                  Zaten hesabınız var mı? <button type="button" className="link-btn" onClick={toggleForm}>Giriş Yapın</button>
                </p>
              </form>
            )}
          </>
        ) : (
          // Şifremi unuttum formu
          <div>
            <h3 className="forgot-title">Şifremi Unuttum</h3>
            
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <form onSubmit={handleForgotPassword} className="auth-form">
              <div className="form-group">
                <label htmlFor="reset-email">Email Adresi</label>
                <p className="form-text">Şifre sıfırlama bağlantısı email adresinize gönderilecektir.</p>
                <input
                  type="email"
                  id="reset-email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="btn btn-primary btn-block">
                Şifre Sıfırlama Bağlantısı Gönder
              </button>
              
              <p className="form-footer">
                <button type="button" className="link-btn" onClick={backToLogin}>
                  Giriş sayfasına dön
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForms;