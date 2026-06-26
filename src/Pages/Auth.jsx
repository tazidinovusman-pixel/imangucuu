import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Проверьте почту для подтверждения!');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSignUp} className="p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-xl mb-4">Регистрация</h2>
        <input type="email" placeholder="Email" className="block w-full p-2 mb-2 border" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Пароль" className="block w-full p-2 mb-4 border" onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-green-600 text-white p-2 rounded">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Auth;