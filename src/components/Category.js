import React, { memo } from 'react';
import Container from './Container';
import CategoryItem from './CategoryItem';
import Stack from './layout/Stack';
import ButtonGroup from './shared/ButtonGroup';
import InfoBanner from './shared/InfoBanner';
import { useBudgetCalculator, formatCurrency } from '../hooks/useBudgetCalculator';

const Category = memo(({
  name,
  category,
  income,
  backgroundColor,
  onAddItem,
  onUpdateItem,
  onToggleItemType,
  onRemoveItem,
  lastAddedId,
  isInfoVisible,
  onInfoDismiss
}) => {
  const { totalBudget, splitAmount } = useBudgetCalculator(
    income, 
    category.percentage, 
    category.items
  );

  return (
    <section 
      style={{ backgroundColor }}
      className="w-full py-6"
    >
      <Container>
        <Stack gap="static-16">
          <h2 className="capitalize text-white text-center text-2xl">
            {name} <span className="font-black">${formatCurrency(totalBudget)}</span>
          </h2>
          
          {name === 'needs' && isInfoVisible && (
            <InfoBanner
              message="Shplit items will divide the remaining amount of money up evenly. Fixed items have a specific dollar value."
              isVisible={isInfoVisible}
              onDismiss={onInfoDismiss}
            />
          )}

          {category.items.length > 0 && (
            <Stack gap="static-4">
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
            </Stack>
          )}

          <ButtonGroup 
            onAddSplit={() => onAddItem(false)}
            onRemoveSplit={onRemoveItem}
            onAddFixed={() => onAddItem(true)}
          />
        </Stack>
      </Container>
    </section>
  );
});

Category.displayName = 'Category';

export default Category;
