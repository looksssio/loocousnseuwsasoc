import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-white z-10 border-b border-gray-200">
      <div className="max-w-md mx-auto h-12 md:h-14 flex items-center justify-center relative">
        <div className="absolute left-4 border-2 border-black rounded-md px-2 py-0.5">
            <span className="text-lg md:text-xl font-bold text-black">TikTok</span>
        </div>
        <h1 className="text-base md:text-lg font-semibold text-gray-800">Get Coins</h1>
      </div>
    </header>
  );
};

export default Header;