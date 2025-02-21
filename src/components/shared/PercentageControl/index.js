import React from 'react';
import SquareIconButton from '../SquareIconButton';
import { Minus, Plus } from 'lucide-react';
import Stack from '../../layout/Stack';

const PercentageControl = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  className = ''
}) => {
  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    onChange?.(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    onChange?.(newValue);
  };

  return (
    <div 
      className={`
        flex 
        items-stretch 
        bg-[#007DB8] 
        rounded-lg 
        overflow-hidden
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      <SquareIconButton
        icon={Minus}
        onClick={handleDecrement}
        aria-label={`Decrease ${label || 'percentage'}`}
      />
      
      <Stack 
        className="flex-1 items-center justify-center" 
        gap="static-4"
      >
        <span className="text-white capitalize">{label}</span>
        <span className="text-white text-4xl font-bold">{value}%</span>
      </Stack>
      
      <SquareIconButton
        icon={Plus}
        onClick={handleIncrement}
        aria-label={`Increase ${label || 'percentage'}`}
      />
    </div>
  );
};

export default PercentageControl;