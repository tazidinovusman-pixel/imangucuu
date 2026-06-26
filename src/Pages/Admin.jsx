import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email === 'admin@gmail.com') {
        setIsAdmin(true);
        fetchAllUsers();
      } else {
        navigate('/');
      }
    };
    checkAdmin();
  }, [navigate]);

  const fetchAllUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*');
    if (data) setUsers(data);
    setLoading(false);
  };

  // Функция удаления
  const deleteUser = async (id) => {
    if (window.confirm("Бул колдонуучуну өчүрөсүзбү?")) {
      // Удаляем из таблицы profiles
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      
      if (!error) {
        setUsers(users.filter(u => u.id !== id));
        alert("Колдонуучу өчүрүлдү!");
      } else {
        alert("Ката: " + error.message);
      }
    }
  };

  if (!isAdmin) return <div className="p-6 text-red-500">Доступ запрещен!</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Кнопка назад */}
      <button 
        onClick={() => navigate('/profile')} 
        className="mb-4 text-gray-500 hover:text-black font-medium"
      >
        ← Артка (Назад)
      </button>

      <h1 className="text-2xl font-bold mb-6">Админ-панель</h1>
      
      <button 
        onClick={fetchAllUsers} 
        className="bg-emerald-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-emerald-700"
      >
        Жаңыртуу (Обновить)
      </button>

      <div className="bg-white shadow rounded-xl p-4">
        {loading ? <p>Жүктөлүүдө...</p> : (
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="p-3 border-b flex justify-between items-center">
                <div>
                  <p className="font-bold">{user.email}</p>
                  <p className="text-xs text-gray-400">ID: {user.id.slice(0, 8)}</p>
                </div>
                
                <button 
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                >
                  Өчүрүү (Удалить)
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}