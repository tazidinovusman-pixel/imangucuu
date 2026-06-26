import React, { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react'; // Импортируем иконки
// const [isDark, setIsDark] = useState(false);

// const toggleTheme = () => {
//   setIsDark(!isDark);
//   document.documentElement.classList.toggle('dark');
// };
const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="p-4 relative">
      {/* Шапка: IMANGUCU и кнопка настроек */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">IMANGUCU</h1>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="bg-yellow-400 p-2 rounded-full shadow-md"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Бургер-меню (появляется поверх всего) */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50 p-6 shadow-xl animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-bold">Настройки</h2>
            <button onClick={() => setIsMenuOpen(false)}><X size={28}/></button>
          </div>
          <button className="w-full text-left p-4 border-b">Сменить тему (День/Ночь)</button>
          <button className="w-full text-left p-4 border-b text-red-600">Выйти</button>
        </div>
      )}

      {/* Остальной контент страницы */}
      <div className="bg-teal-700 text-white p-6 rounded-2xl mb-6">
        <h2 className="text-xl font-bold">Ислам Турнири</h2>
      </div>
    </div>
  );
};

export default Home;