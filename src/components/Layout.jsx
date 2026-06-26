import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      {/* w-full max-w-md - ширина как на телефоне
         h-screen - высота на весь экран
         flex flex-col - элементы стоят друг под другом
      */}
      <div className="w-full max-w-md bg-white h-screen flex flex-col shadow-2xl relative">
        
        {/* flex-grow - этот блок будет растягиваться на всё свободное место,
           а overflow-y-auto - добавит прокрутку, если контента много.
        */}
        <main className="flex-grow overflow-y-auto">
          <Outlet />
        </main>
        
        {/* Нижняя панель всегда будет внизу, потому что она вне flex-grow
        */}
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;