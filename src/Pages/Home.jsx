import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-4 relative">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">
          IMANGUCU
        </h1>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-yellow-400 p-2 rounded-full shadow-md"
        >
          <Settings size={20} />
        </button>
      </div>

      {/* MENU */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50 p-6 shadow-xl animate-in slide-in-from-right duration-300">

          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-bold">Настройки</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={28} />
            </button>
          </div>

          <button className="w-full text-left p-4 border-b">
            Сменить тему (День/Ночь)
          </button>

          <button className="w-full text-left p-4 border-b text-red-600">
            Выйти
          </button>
        </div>
      )}

      {/* TOURNAMENT CARD */}
      <div
        onClick={() => navigate('/Tournament')}
        className="bg-teal-700 text-white p-6 rounded-2xl mb-6 cursor-pointer hover:scale-[1.02] transition"
      >
        <h2 className="text-xl font-bold">
          Ислам Турнири
        </h2>

        <p className="text-sm opacity-80 mt-1">
          100 вопросов • 50 случайных • 3 жизни
        </p>
      </div>

    </div>
  );
};

export default Home;