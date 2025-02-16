import React, { useState } from 'react';

const Input = ({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  className = '', 
  autoFocus,
  readOnly,
  onFocus,
  onBlur,
  ...props 
}) => {
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const handleFocus = (e) => {
    if (type === 'text') {
      // Move cursor to end
      const value = e.target.value;
      e.target.value = '';
      e.target.value = value;
    }
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    if (type === 'text' && !value) {
      setHasStartedTyping(false);
    }
    onBlur?.(e);
  };

  const handleChange = (e) => {
    setHasStartedTyping(true);
    onChange?.(e);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      className={`bg-transparent focus:outline-none ${className}`}
      placeholder={hasStartedTyping ? "" : placeholder}
      autoFocus={autoFocus}
      readOnly={readOnly}
      onFocus={handleFocus}
      onBlur={handleBlur}
      autoComplete="off"
      data-lpignore="true"
      data-form-type="other"
      {...props}
    />
  );
};

export default Input;