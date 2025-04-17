import React from 'react';
import './App.css';
import HomePage from './components/Home/HomePage';
import UserUpdateForm from './components/UserUpdateForm';


const App: React.FC = () => {
  const handleCancel = () => {
    console.log('Güncelleme iptal edildi');
  };

  const handleUpdate = (username: string, password: string, role: string) => {
    console.log('Güncellenen kullanıcı:', { username, password, role });
    // Burada güncelleme işlemi için bir API çağrısı yapılabilir
  };

  return (
    <div className="App">
      <HomePage />
      <UserUpdateForm onCancel={handleCancel} onUpdate={handleUpdate} />
      
    </div>
  );
};

export default App;
