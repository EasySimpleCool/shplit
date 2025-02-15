import React, { memo } from 'react';
import { DollarSign, Percent } from 'lucide-react';
import Container from './Container';
import CategoryItem from './CategoryItem';
import { useBudgetCalculator, formatCurrency } from '../hooks/useBudgetCalculator';

const Category = memo(({ 
  name, 
  category, 
  income,
  backgroundColor,
  onAddItem,
  onUpdateItem,
  onToggleItemType,
  lastAddedId
}) => {
  const { totalBudget, splitAmount } = useBudgetCalculator(
    income, 
    category.percentage, 
    category.items
  );

  return (
    <div 
      style={{ backgroundColor }}
      className="flex flex-col items-center w-full px-6 py-6"
    >
      <Container>
        <div className="flex items-center justify-center mb-4 w-full">
          <h2 className="capitalize text-white text-center text-2xl">
            {name} <span className="font-black">${formatCurrency(totalBudget)}</span>
          </h2>
        </div>
        
        <div className="space-y-2 w-full">
          {category.items.map(item => (
            <CategoryItem
              key={item.id}
              item={item}
              splitAmount={splitAmount}
              totalBudget={totalBudget}
              isLastAdded={item.id === lastAddedId}
              onNameChange={(name) => onUpdateItem(name, item.id)}
              onAmountChange={(amount) => onUpdateItem(amount, item.id, true)}
              onToggleType={() => onToggleItemType(item.id)}
            />
          ))}
        </div>
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onAddItem(false)}
            className="flex-1 bg-[#0069A4] p-2 rounded-lg hover:bg-[#005a8f] flex items-center justify-center gap-2 text-white h-10"
          >
            <Percent className="w-4 h-4 text-white" />
            Add Split
          </button>
          <button
            onClick={() => onAddItem(true)}
            className="flex-1 bg-[#0069A4] p-2 rounded-lg hover:bg-[#005a8f] flex items-center justify-center gap-2 text-white h-10"
          >
            <DollarSign className="w-4 h-4 text-white" />
            Add Dollar
          </button>
        </div>
      </Container>
    </div>
  );
});

Category.displayName = 'Category';

export default Category;
