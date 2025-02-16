import React from 'react';

const Stack = ({ 
  direction = 'vertical', 
  gap = 'static-0', 
  children, 
  className = '' 
}) => {
  // Convert token to pixel value
  const getGapValue = (token) => {
    const staticValues = {
      'static-0': '0px',
      'static-4': '4px',
      'static-8': '8px',
      'static-16': '16px',
      'static-24': '24px',
      'static-40': '40px',
      'static-64': '64px',
      'static-80': '80px'
    };

    if (token in staticValues) {
      return staticValues[token];
    }

    // For fluid tokens, use CSS variables
    if (token.startsWith('fluid-')) {
      return `var(--${token})`;
    }

    return token;
  };

  return (
    <div 
      className={`
        flex 
        ${direction === 'vertical' ? 'flex-col' : 'flex-row'} 
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      style={{ gap: getGapValue(gap) }}
    >
      {children}
    </div>
  );
};

export default Stack;