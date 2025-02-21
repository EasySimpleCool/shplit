import React from 'react';

const SquareIconButton = ({ 
  icon: Icon, 
  onClick, 
  'aria-label': ariaLabel,
  className = ''
}) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={`
      w-16 
      h-16 
      flex 
      items-center 
      justify-center 
      bg-white 
      transition-colors 
      focus:outline-none 
      focus:ring-2 
      focus:ring-white/30
      hover:bg-white/90
      ${className}
    `.trim().replace(/\s+/g, ' ')}
  >
    <Icon 
      className="w-8 h-8 text-[#0069A4]"
    />
  </button>
);

export default SquareIconButton;