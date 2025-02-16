import React from 'react';

const IconButton = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full shrink-0 h-16 w-16 flex flex-col items-center justify-center transition-colors focus:outline-none ${
      isActive ? 'bg-white' : 'bg-transparent hover:bg-white/10'
    }`}
  >
    <Icon className={`w-[20px] h-[20px] ${isActive ? 'text-[#0069A4]' : 'text-white'}`} />
    <span className={`font-inter font-normal text-[10px] mt-0.5 ${isActive ? 'text-[#0069A4]' : 'text-white'}`}>
      {label}
    </span>
  </button>
);

export default IconButton;