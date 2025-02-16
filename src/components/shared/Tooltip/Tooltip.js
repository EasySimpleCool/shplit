import React, { useState, useRef, useEffect } from 'react';
import TooltipContent from './TooltipContent';
import TooltipTrigger from './TooltipTrigger';

const Tooltip = ({ 
  children, 
  content, 
  className = '',
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div ref={triggerRef}>
        <TooltipTrigger onClick={handleToggle} isOpen={isOpen}>
          {children}
        </TooltipTrigger>
      </div>
      
      {isOpen && (
        <TooltipContent 
          ref={tooltipRef}
          onClose={handleClose}
          triggerRef={triggerRef}
        >
          {content}
        </TooltipContent>
      )}
    </div>
  );
};

export default Tooltip;