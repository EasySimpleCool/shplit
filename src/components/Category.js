import React, { memo } from 'react';
import Container from './Container';
import CategoryItem from './CategoryItem';
import Stack from './layout/Stack';
import ButtonGroup from './shared/ButtonGroup';
import InfoBanner from './shared/InfoBanner';
import { useBudgetCalculator, formatCurrency } from '../hooks/useBudgetCalculator';

const getCategoryInfo = (id) => {
  switch (id) {
    case 'needs':
      return {
        examples: 'Rent, Phone bill, Insurance, Internet, Water, Transport',
        description: 'These are your essential monthly expenses that you can\'t avoid'
      };
    case 'wants':
      return {
        examples: 'Beers/Drinks, Netflix, Clothes, Apps',
        description: 'Fun money for entertainment and lifestyle choices'
      };
    case 'savings':
      return {
        examples: 'Savings, Crypto, Stocks, Flights, New Phone',
        description: 'Money for future goals and investments'
      };
    default:
      return { examples: '', description: '' };
  }
};

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

  const { examples, description } = getCategoryInfo(name);

  return (
    <section 
      style={{ backgroundColor }}
      className="w-full py-6"
    >
      <Container>
        <Stack gap="static-16">
          <Stack gap="static-2">
            <h2 className="capitalize text-white text-center body m-0 mb-0">
              {name}
            </h2>
            <div className="text-white text-center header m-0">
              ${formatCurrency(totalBudget)}
            </div>
          </Stack>
          
          <InfoBanner
            message={`${description}. Examples: ${examples}`}
            isVisible={isInfoVisible}
            onDismiss={onInfoDismiss}
          />

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
          />
        </Stack>
      </Container>
    </section>
  );
});

Category.displayName = 'Category';

export default Category;
