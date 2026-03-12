import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import MyWants from './pages/MyWants';
import Matches from './pages/Matches';
import Profile from './pages/Profile';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
        <div className="max-w-md mx-auto relative min-h-screen bg-white dark:bg-gray-900 shadow-xl">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/my-wants" element={<MyWants />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/profile" element={<Profile darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <BottomNav />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
