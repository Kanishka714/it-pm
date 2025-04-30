import React from 'react';

const Header = () => {
  return (
    <header className="bg-white py-4 px-6 flex justify-between items-center border-b border-gray-200">
      {/* Search Container */}
      <div className="relative w-[665px]">
        <div className="flex items-center border-2 border-secondary rounded-lg p-2">
          <input
            type="text"
            placeholder="Search Fleet"
            className="w-full pl-2 font-poppins font-light text-lg text-text-dark outline-none"
          />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
            <circle cx="11" cy="11" r="8" stroke="#080808" strokeWidth="2" />
            <line x1="16.7071" y1="16.7071" x2="20.7071" y2="20.7071" stroke="#080808" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center bg-primary text-white rounded-lg p-4">
        <div className="rounded-full bg-gray-300 w-10 h-10 mr-4">
          {/* User avatar image would go here */}
        </div>
        <span className="font-poppins font-light text-base">Jhon bhutha</span>
      </div>
    </header>
  );
};

export default Header;