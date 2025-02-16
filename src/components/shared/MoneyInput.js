import React from 'react';
import Input from './Input';
import Stack from '../layout/Stack';

const MoneyInput = ({ value, onChange, label = 'Monthly pay' }) => (
  <div className="flex items-center bg-[#0069A4] min-h-[60px] sm:h-[72px] rounded-2xl sm:rounded-full w-full">
    <Stack className="flex-1 py-3 px-4" gap="1">
      <label htmlFor="income" className="text-white/50 text-xs sm:text-sm text-center">
        {label}
      </label>
      <div className="w-full max-w-[200px] mx-auto">
        <Input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            onChange(value ? Number(value) : 0);
          }}
          className="w-full text-white font-inter font-black text-2xl text-center"
          placeholder="Enter amount"
        />
      </div>
    </Stack>
  </div>
);

export default MoneyInput