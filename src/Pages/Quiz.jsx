import React, { useState } from 'react';
import { allTests } from '../data/allTests';
import { supabase } from '../supabaseClient';

export default function Quiz() {
  const [view, setView] = useState('menu'); 
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Для подсветки выбора

  const startTest = (test) => {
    setSelectedTest(test);
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setView('playing');
  };

  const handleNext = () => {
    // Проверяем правильность
    if (selectedOption === selectedTest.questions[currentIdx].correct) {
      setScore(score + 1);
    }

    if (currentIdx + 1 < selectedTest.questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null); // Сброс выбора для нового вопроса
    } else {
      saveResult(score + (selectedOption === selectedTest.questions[currentIdx].correct ? 1 : 0));
      setView('finished');
    }
  };

 const saveResult = async (finalScore) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase.from('results').insert([
  {
    user_id: user.id,
    quiz_title: selectedTest.title,
    score: finalScore
  }
]);

if (error) {
  console.log(error);
}

  
};

 if (view === 'menu') {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-emerald-900 mb-6 text-center tracking-wide">
        Тесттер
      </h1>

      <div className="grid gap-4">
        {allTests.map((test) => (
          <button
            key={test.id}
            onClick={() => startTest(test)}
            className="w-full flex items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl shadow-sm
                       hover:shadow-md hover:border-emerald-500 active:scale-[0.99] transition-all duration-200"
          >
            <div className="text-left">
              <h2 className="text-base font-semibold text-gray-900">
                {test.title}
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                {test.questions.length} суроо
              </p>
            </div>

            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-600 text-white text-sm font-bold
                            group-hover:bg-emerald-700">
              &gt;
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
  if (view === 'finished') {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="text-emerald-500 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Тест аяктады!</h2>
        <p className="text-lg text-emerald-600 font-bold mb-8">Упайыңыз: {score} / {selectedTest.questions.length}</p>
        <button onClick={() => setView('menu')} className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl">
          Артка кайтуу
        </button>
      </div>
    );
  }

  const q = selectedTest.questions[currentIdx];

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-emerald-600 font-medium">{selectedTest.title}</span>
        <span className="text-emerald-600 font-bold">{currentIdx + 1} / {selectedTest.questions.length}</span>
      </div>
      
      {/* Картинка вопроса */}
      {q.image && <img src={q.image} alt="Вопрос" className="w-full h-48 object-contain mb-6 rounded-xl" />}
      
      <p className="text-xl font-bold text-gray-800 mb-8">{q.question}</p>
      
      <div className="grid gap-3">
        {q.options.map((option, index) => (
          <button key={index} onClick={() => setSelectedOption(index)}
            className={`w-full p-4 text-left border-2 rounded-xl transition ${selectedOption === index ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200'}`}>
            {option}
          </button>
        ))}
      </div>

      {/* Кнопка Кийинки (появляется только после выбора) */}
      {selectedOption !== null && (
        <button onClick={handleNext} className="w-full mt-8 py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg">
          Кийинки
        </button>
      )}
    </div>
  );
}