import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [results, setResults] = useState([]); // <--- ДОБАВЬ ЭТУ СТРОКУ
  const navigate = useNavigate();
useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
      } else {
        setUser(user);
        fetchResults(user.id);
      }
    };
    checkUser();
  }, [navigate]);

  const fetchResults = async (userId) => {
    // Получаем данные из таблицы results
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Ошибка при загрузке:", error);
    } else {
      setResults(data || []);
    }
  };
  if (!user) return <div className="p-6">Жүктөлүүдө...</div>;
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
      
      {/* Кнопка Админки */}
      {user.email === 'admin@gmail.com' && (
        <button 
          onClick={() => navigate('/admin')}
          className="mb-6 w-full bg-red-500 text-white py-3 rounded-2xl font-bold hover:bg-red-600 transition"
        >
          Админ-панель
        </button>
      )}
      
     <div className="w-full max-w-sm bg-slate-50 p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🏆</span>
          <h3 className="text-emerald-800 font-bold">Жыйынтыктарыңыз:</h3>
        </div>
        
        {results.length === 0 ? (
          <p className="text-gray-400 text-sm">Азырынча жыйынтыктар жок.</p>
        ) : (
          <div className="space-y-4">
            {results.map((res, i) => (
              <div key={i} className="flex justify-between border-b border-slate-200 pb-2">
               <span className="text-emerald-900 font-medium">{res.quiz_title}</span>
                <span className="text-emerald-600 font-bold">{res.score} балл</span>
              </div>
            ))}
          </div>
        )}
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