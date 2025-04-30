import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ activeSection = 'vehicles' }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-secondary min-h-screen w-64">
      {/* Logo Section */}
      <div className="p-4 flex items-center gap-3">
        <img src="/icons/fleet-logo.svg" alt="Fleet Logo" className="w-8 h-8" />
        <h1 className="font-poppins font-semibold text-2xl text-text-dark">Fleet Mind</h1>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col gap-4 p-4">
        {/* Dashboard */}
        <div className="flex items-center gap-4 p-2 text-gray-500">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="#2C2C2C" fillOpacity="0.5" />
          </svg>
          <span className="font-poppins font-medium text-lg">Dashboard</span>
        </div>

        {/* Vehicles */}
        <Link to="/vehicles" className={`flex items-center gap-4 p-2 ${activeSection === 'vehicles' ? 'text-text-dark' : 'text-gray-500'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill={activeSection === 'vehicles' ? "#080808" : "#3A3A3A"} fillOpacity="0.5" />
          </svg>
          <div className="flex items-center gap-1">
            <span className={`font-poppins ${activeSection === 'vehicles' ? 'font-semibold' : 'font-medium'} text-lg`}>Vehicles</span>
            {activeSection === 'vehicles' && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10L4 6H12L8 10Z" fill="#080808" />
              </svg>
            )}
          </div>
        </Link>

        {/* Maintenance */}
        <Link to="/maintenance" className={`flex items-center gap-4 p-2 ${activeSection === 'maintenance' ? 'text-text-dark' : 'text-gray-500'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill={activeSection === 'maintenance' ? "#080808" : "#3A3A3A"} fillOpacity="0.5" />
          </svg>
          <span className={`font-poppins ${activeSection === 'maintenance' ? 'font-semibold' : 'font-medium'} text-lg`}>Maintenance</span>
        </Link>

        {/* Parts */}
        <Link to="/parts" className={`flex items-center gap-4 p-2 ${activeSection === 'parts' ? 'text-text-dark' : 'text-gray-500'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill={activeSection === 'parts' ? "#080808" : "#3A3A3A"} fillOpacity="0.5" />
          </svg>
          <div className="flex items-center gap-1">
            <span className={`font-poppins ${activeSection === 'parts' ? 'font-semibold' : 'font-medium'} text-lg`}>Parts</span>
            {activeSection === 'parts' && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10L4 6H12L8 10Z" fill="#080808" />
              </svg>
            )}
          </div>
        </Link>

        {/* Reports */}
        <div className="flex items-center gap-4 p-2 text-gray-500">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="#2C2C2C" fillOpacity="0.5" />
          </svg>
          <span className="font-poppins font-medium text-lg">Reports</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 p-4 mt-8">
        <button 
          onClick={() => navigate('/vehicles/add')}
          className="bg-primary text-white font-poppins font-medium text-xl rounded-lg py-5 px-14 text-center hover:bg-opacity-90 transition-opacity"
        >
          Add vehicle
        </button>
        <button 
          onClick={() => navigate('/log-entry')}
          className="bg-text-dark text-white font-poppins font-medium text-xl rounded-lg py-5 px-14 text-center hover:bg-opacity-90 transition-opacity"
        >
          Log entry
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
