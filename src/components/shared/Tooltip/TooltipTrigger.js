import React from 'react';
import IconButton from '../IconButton';

const TooltipTrigger = ({ children, onClick, isOpen }) => {
  // If children are provided, wrap them in a button
  if (children) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center"
        aria-expanded={isOpen}
      >
        {children}
      </button>
    );
  }

  // Default case: render info icon
  return (
    <IconButton
      onClick={onClick}
      aria-expanded={isOpen}
      className="text-blue-500 hover:text-blue-600 transition-colors"
      icon="alert-circle"
      size="sm"
    />
  );
};

export default TooltipTrigger;