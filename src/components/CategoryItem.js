import React, { memo, useState } from 'react';
import { DollarSign, Percent } from 'lucide-react';

const CategoryItem = memo(({
  item,
  onNameChange,
  onAmountChange,
  onToggleType,
  isLastAdded,
  splitAmount,
  totalBudget
}) => {
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isAmountFocused, setIsAmountFocused] = useState(false);
  return (
    <div className="flex items-center gap-2 bg-[#0069A4] p-1 rounded-full w-full h-[72px]">
      <button
        onClick={onToggleType}
        className={`p-2 rounded-full shrink-0 h-16 w-16 flex flex-col items-center justify-center transition-colors focus:outline-none ${
          !item.isFixed
            ? 'bg-white'
            : 'bg-transparent hover:bg-white/10'
        }`}
      >
        <Percent className={`w-[20px] h-[20px] ${!item.isFixed ? 'text-[#0069A4]' : 'text-white'}`} />
        <span className={`font-inter font-normal text-[10px] mt-0.5 ${!item.isFixed ? 'text-[#0069A4]' : 'text-white'}`}>Shplit</span>
      </button>
      <div className="flex-1 flex flex-col items-center justify-center py-2">
        <div className="w-full">
          <input
            type="text"
            value={item.name}
            onChange={(e) => {
              setHasStartedTyping(true);
              onNameChange(e.target.value);
            }}
            className="w-full bg-transparent text-white min-w-0 font-inter font-medium text-sm text-center placeholder-white/10 p-0 focus:outline-none"
            placeholder={hasStartedTyping ? "" : "Item name"}
            autoFocus={isLastAdded}
            onFocus={(e) => {
              // Move cursor to end
              const value = e.target.value;
              e.target.value = '';
              e.target.value = value;
            }}
            onBlur={() => {
              if (!item.name) {
                setHasStartedTyping(false);
              }
            }}
          />
        </div>
        <div className="mt-1">
          {item.isFixed ? (
            <div className="flex items-center justify-center">
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={item.amount === 0 ? '' : Math.floor(item.amount)}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  let newAmount = value ? Number(value) : 0;
                  // Ensure amount doesn't exceed total budget
                  if (newAmount > totalBudget) {
                    newAmount = totalBudget;
                  }
                  onAmountChange(newAmount);
                }}
                className="w-20 bg-transparent text-white font-inter font-black text-2xl placeholder-white/10 text-center focus:outline-none pl-0"
                placeholder="0"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onFocus={() => setIsAmountFocused(true)}
                onBlur={() => setIsAmountFocused(false)}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={Math.floor(splitAmount)}
                className="w-20 bg-transparent text-white font-inter font-black text-2xl cursor-default text-center focus:outline-none"
                readOnly
              />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={onToggleType}
        className={`p-2 rounded-full shrink-0 h-16 w-16 flex flex-col items-center justify-center transition-colors focus:outline-none ${
          item.isFixed
            ? 'bg-white'
            : 'bg-transparent hover:bg-white/10'
        }`}
      >
        <DollarSign className={`w-[20px] h-[20px] ${item.isFixed ? 'text-[#0069A4]' : 'text-white'}`} />
        <span className={`font-inter font-normal text-[10px] mt-0.5 ${item.isFixed ? 'text-[#0069A4]' : 'text-white'}`}>Fixed</span>
      </button>
    </div>
  );
});

CategoryItem.displayName = 'CategoryItem';

export default CategoryItem;
