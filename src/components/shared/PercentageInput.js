import React, { useState } from 'react';
import Input from './Input';

const PercentageInput = ({ 
  value, 
  onChange,
  className = '',
  ...props 
}) => {
  const [displayValue, setDisplayValue] = useState(value?.toString() || '');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    
    // Don't allow more than 3 digits
    if (newValue.length > 3) return;
    
    setDisplayValue(newValue);
    
    const numericValue = parseInt(newValue, 10);
    const isValidValue = !isNaN(numericValue) && numericValue >= 0 && numericValue <= 100;
    setIsValid(isValidValue);

    if (isValidValue) {
      onChange?.(numericValue);
    }
  };

  const handleBlur = () => {
    // On blur, if the value is valid, format it nicely
    if (isValid && displayValue) {
      const numericValue = parseInt(displayValue, 10);
      setDisplayValue(numericValue.toString());
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <Input
        type="text"
        value={displayValue}
        onChange={(e) => handleChange(e)}
        onBlur={handleBlur}
        className={`w-12 text-right pr-5 ${!isValid ? 'text-red-500' : ''} ${className}`}
        {...props}
      />
      <span className="absolute right-1 pointer-events-none">%</span>
    </div>
  );
};

export default PercentageInput;