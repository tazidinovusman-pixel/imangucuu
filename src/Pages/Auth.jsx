import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Вот эта функция должна быть объявлена:
  const handleAuth = async (e) => {
    e.preventDefault();
    
    // 1. Пробуем войти
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // 2. Если ошибка (юзера нет), пробуем создать
    if (signInError) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        alert("Ката: " + signUpError.message);
      } else {
        alert("Каттоо ийгиликтүү!");
      }
    } else {
      alert("Кирүү ийгиликтүү!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Кирүү / Каттоо</h1>
      <form onSubmit={handleAuth} className="space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {/* Здесь проверь, что стоит именно handleAuth */}
        <button type="submit" className="w-full bg-emerald-600 text-white p-2 rounded">
          Кирүү / Каттоо
        </button>
      </form>
    </div>
  );
}