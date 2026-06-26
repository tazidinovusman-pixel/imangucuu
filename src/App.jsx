import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Quiz from './Pages/Quiz';
import Study from './Pages/Study';
import Profile from './Pages/Profile';
import Auth from './Pages/Auth';
import Welcome from './Pages/Welcome';
import Admin from './Pages/Admin';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(localStorage.getItem('seenWelcome') !== 'true');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (showWelcome) return <Welcome onContinue={() => {
    localStorage.setItem('seenWelcome', 'true');
    setShowWelcome(false);
  }} />;
return (
    <Router>
      <div className="flex justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative">
          <Routes>
            {/* Если сессии нет, отправляем на Auth, иначе на Layout */}
            <Route path="/" element={session ? <Layout /> : <Navigate to="/auth" />}>
              <Route index element={<Home />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="study" element={<Study />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/" />} />
            <Route path="/admin" element={session ? <Admin /> : <Navigate to="/auth" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );

}

export default App;