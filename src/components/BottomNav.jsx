import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare, BookOpen, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Башкы' },
    { path: '/quiz', icon: CheckSquare, label: 'Тест' },
    { path: '/study', icon: BookOpen, label: 'Билим' },
    { path: '/profile', icon: User, label: 'Профиль' },
  ];

  return (
    // Убрали fixed, left-0, bottom-0, z-50
    <nav className="bg-white border-t border-gray-200 flex justify-around p-3 shadow-lg shrink-0">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex flex-col items-center gap-1 text-xs font-medium ${isActive ? 'text-green-600' : 'text-gray-400'}`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;