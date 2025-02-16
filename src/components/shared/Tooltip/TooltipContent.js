import React, { forwardRef, useEffect, useState } from 'react';
import IconButton from '../IconButton';

const TooltipContent = forwardRef(({ children, onClose, triggerRef }, ref) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (triggerRef.current && ref.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = ref.current.getBoundingClientRect();
      
      // Position the tooltip centered above the trigger
      const newLeft = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
      const newTop = triggerRect.top - tooltipRect.height - 8; // 8px gap

      // Adjust if tooltip would go off screen
      const adjustedLeft = Math.max(8, Math.min(newLeft, window.innerWidth - tooltipRect.width - 8));
      const adjustedTop = newTop < 8 ? triggerRect.bottom + 8 : newTop;

      setPosition({
        top: adjustedTop,
        left: adjustedLeft,
      });
    }
  }, [triggerRef, ref]);

  return (
    <div
      ref={ref}
      role="tooltip"
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      className="
        z-50 p-4 
        bg-gray-800 text-white 
        rounded-lg shadow-lg
        max-w-xs
        animate-fade-in
      "
    >
      <div className="relative">
        <IconButton
          icon="x"
          onClick={onClose}
          className="
            absolute -top-2 -right-2
            text-gray-400 hover:text-white
            transition-colors
          "
          size="sm"
          aria-label="Close tooltip"
        />
        <div className="pr-4">
          {children}
        </div>
      </div>
    </div>
  );
});

TooltipContent.displayName = 'TooltipContent';

export default TooltipContent;