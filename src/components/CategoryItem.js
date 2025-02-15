import React, { memo } from 'react';
import { DollarSign, Percent, Lock } from 'lucide-react';

const CategoryItem = memo(({ 
  item, 
  onNameChange, 
  onAmountChange, 
  onToggleType,
  isLastAdded,
  splitAmount 
}) => {
  return (
    <div className="flex items-center gap-2 bg-[#0069A4] p-2 rounded w-full">
      <input
        type="text"
        value={item.name}
        onChange={(e) => onNameChange(e.target.value)}
        className="flex-1 p-2 rounded text-black min-w-0"
        placeholder="Item name"
        autoFocus={isLastAdded}
        onFocus={(e) => e.target.select()}
      />
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-white">$</span>
        {item.isFixed ? (
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={Math.floor(item.amount)}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              onAmountChange(value ? Number(value) : 0);
            }}
            className="w-24 p-2 rounded text-black border border-transparent focus:border-blue-500 h-10"
            placeholder="Amount"
          />
        ) : (
          <div className="relative flex items-center">
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={Math.floor(splitAmount)}
              className="w-24 p-2 rounded bg-gray-100 text-gray-600 cursor-default h-10"
              readOnly
            />
            <Lock className="w-4 h-4 text-white absolute right-2" />
          </div>
        )}
      </div>
      <button
        onClick={onToggleType}
        className="p-2 rounded bg-[#005a8f] hover:bg-[#004a7f] shrink-0 h-10 w-10 flex items-center justify-center"
        title={item.isFixed ? "Fixed Amount" : "Split Amount"}
      >
        {item.isFixed ? 
          <DollarSign className="w-5 h-5 text-white" /> : 
          <Percent className="w-5 h-5 text-white" />
        }
      </button>
    </div>
  );
});

CategoryItem.displayName = 'CategoryItem';

export default CategoryItem;
