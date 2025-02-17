import React, { memo } from 'react';
import { DollarSign, Percent } from 'lucide-react';
import Stack from './layout/Stack';
import IconButton from './shared/IconButton';
import Input from './shared/Input';

const CategoryItem = memo(({
  item,
  onNameChange,
  onAmountChange,
  onToggleType,
  isLastAdded,
  splitAmount,
}) => (
  <div className="flex items-center gap-2 bg-[#0069A4] p-1 rounded-full w-full h-[72px]">
    <IconButton
      icon={Percent}
      label="Shplit"
      isActive={!item.isFixed}
      onClick={onToggleType}
    />
    <Stack className="flex-1 min-w-0" gap="1">
      <Input
        type="text"
        value={item.name}
        onChange={(e) => onNameChange(e.target.value)}
        className="text-white/50 label text-center placeholder-white/50 w-full"
        placeholder="Item name"
        autoFocus={isLastAdded}
      />
      {item.isFixed ? (
        <Input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={item.amount === 0 ? '' : Math.floor(item.amount)}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            const newAmount = value ? Number(value) : 0;
            onAmountChange(newAmount);
          }}
          className="min-w-[60px] flex-1 text-white subheader text-center"
          placeholder="0"
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
      ) : (
        <Input
          type="number"
          value={Math.floor(splitAmount)}
          className="min-w-[60px] flex-1 text-white subheader text-center cursor-default"
          readOnly
        />
      )}
    </Stack>
    <IconButton
      icon={DollarSign}
      label="Fixed"
      isActive={item.isFixed}
      onClick={onToggleType}
    />
  </div>
));

CategoryItem.displayName = 'CategoryItem';

export default CategoryItem;
