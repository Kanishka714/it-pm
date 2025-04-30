import React from 'react';


const PartsTopSection = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {/* Title */}
      <h1 className="font-chivo font-medium text-3xl text-black">
        Parts & Inventory
      </h1>

      {/* Search and Filters */}
      <div className="flex items-center gap-5">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border-[1px] border-gray-200 rounded-lg py-3 px-4 pl-12 w-[300px] font-poppins"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="#080808"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L16.65 16.65"
              stroke="#080808"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Filters Button */}
        <button className="flex items-center gap-2 bg-[#F2F2F7] rounded-lg py-3 px-4 shadow-sm">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 20V10" stroke="#878787" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 20V4" stroke="#878787" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 20V14" stroke="#878787" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-poppins text-lg">Filters</span>
        </button>
      </div>
    </div>
  );
};

export default PartsTopSection;
