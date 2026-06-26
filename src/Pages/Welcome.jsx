import React from 'react';

const Welcome = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Иман-Гуджу</h1>
      <p className="text-gray-600 mb-8">Это образовательный сайт про Ислам. Изучайте основы, проходите тесты и закрепляйте знания.</p>
      <button 
        onClick={onContinue}
        className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
      >
        Продолжить
      </button>
    </div>
  );
};

export default Welcome;