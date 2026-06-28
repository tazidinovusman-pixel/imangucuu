// import React from 'react';

// const Welcome = ({ onContinue }) => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
//       <h1 className="text-3xl font-bold text-green-700 mb-4">Иман-кучу</h1>
//       <p className="text-gray-600 mb-8">Это образовательный сайт про Ислам. Изучайте основы, проходите тесты и закрепляйте знания.</p>
//       <button 
//         onClick={onContinue}
//         className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition"
//       >
//         Продолжить
//       </button>
//     </div>
//   );
// };

// export default Welcome;
import React from 'react';

const Welcome = ({ onContinue }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 via-white to-emerald-100 px-6">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center border border-emerald-100">
        
        {/* Logo / Title */}
        <div className="mb-6">
          <div className="w-14 h-14 mx-auto bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
            ИК
          </div>

          <h1 className="text-2xl font-bold text-emerald-700 mt-4">
            Иман-Күчү
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Ислам билим платформасы
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-8">
          Ислам тууралуу билим алыңыз, тесттерди тапшырыңыз жана өз билимиңизди бекемдеңиз.
        </p>

        {/* Button */}
        <button
          onClick={onContinue}
          className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-emerald-700 active:scale-[0.98] transition"
        >
          Баштоо
        </button>

        {/* Small footer */}
        <p className="text-xs text-gray-400 mt-6">
          Билим — нур
        </p>
      </div>
    </div>
  );
};

export default Welcome;