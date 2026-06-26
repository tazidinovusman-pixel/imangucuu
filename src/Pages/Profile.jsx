import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      // Прямой запрос к Supabase за текущим пользователем
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth'); // Если не залогинен — отправляем на вход
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (!user) return <div className="p-6">Жүктөлүүдө...</div>;

  return (
    <div className="flex flex-col items-center p-6 bg-white min-h-screen">
      <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
        {user.email[0].toUpperCase()}
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{user.email}</h2>
      
      <div className="w-full bg-gray-50 p-6 rounded-2xl text-center">
        <h3 className="text-lg font-bold text-gray-700">Жыйынтыгыңыз:</h3>
        <p className="text-gray-500">Азырынча жыйынтыктар жок.</p>
      </div>
      
      <button 
        onClick={handleLogout}
        className="mt-8 text-red-500 font-medium"
      >
        Чыгуу
      </button>
    </div>
  );
};

export default Profile;