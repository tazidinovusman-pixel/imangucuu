import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Tournament = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);

  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);

  const [timeLeft, setTimeLeft] = useState(120);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  // LOAD QUESTIONS
  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("tournament_questions")
        .select("*");

      if (error) {
        console.log("Supabase error:", error);
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        console.log("No questions in DB");
        setLoading(false);
        return;
      }

      const shuffled = [...data].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 50);

      setQuestions(selected);
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  // TIMER
  useEffect(() => {
    if (loading || finished) return;

    if (timeLeft <= 0) {
      handleNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, finished]);

  // ANSWER
  const handleAnswer = (index) => {
    const q = questions[current];
    if (!q) return;

    setSelected(index);

    if (index === q.correct) {
      setScore((s) => s + 1);
    } else {
      setHearts((h) => {
        const newH = h - 1;
        if (newH <= 0) setFinished(true);
        return newH;
      });
    }
  };

  // NEXT QUESTION
  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      return;
    }

    setCurrent((c) => c + 1);
    setSelected(null);
    setTimeLeft(120);
  };

  // SAVE RESULT
  const saveResult = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.from("results").insert([
        {
          user_id: user.id,
          quiz_title: "Tournament",
          score: score,
        },
      ]);
    }
  };

  useEffect(() => {
    if (finished) {
      saveResult();
    }
  }, [finished]);

  // LOADING
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading questions...
      </div>
    );
  }

  // NO QUESTIONS SAFETY
  if (!questions.length) {
    return (
      <div className="p-6 text-center text-red-500">
        Вопросов нет в базе
      </div>
    );
  }

  // CURRENT QUESTION SAFETY
  const q = questions[current];

  if (!q) {
    return (
      <div className="p-6 text-center text-gray-500">
        Ошибка вопроса
      </div>
    );
  }

  // FINISH SCREEN
  if (finished) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold text-emerald-800 mb-4">
          Турнир аяқталды
        </h1>

        <p className="text-lg mb-6">
          Упай: {score} / {questions.length}
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl"
        >
          Башкы бетке кайтуу
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* TOP */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-red-500 font-bold">❤️ {hearts}</div>
        <div className="text-emerald-700 font-bold">{timeLeft}s</div>
        <div className="text-gray-700">
          {current + 1} / {questions.length}
        </div>
      </div>

      {/* QUESTION */}
      <h2 className="text-lg font-semibold mb-6 text-gray-900">
        {q.question}
      </h2>

      {/* OPTIONS */}
      <div className="space-y-3">
        {[q.option_a, q.option_b, q.option_c, q.option_d].map(
          (opt, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-4 rounded-xl border text-left transition
                ${
                  selected === index
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-gray-200"
                }`}
            >
              {opt}
            </button>
          )
        )}
      </div>

      {/* NEXT */}
      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full mt-6 bg-emerald-600 text-white p-4 rounded-xl"
        >
          Кийинки
        </button>
      )}
    </div>
  );
};

export default Tournament;