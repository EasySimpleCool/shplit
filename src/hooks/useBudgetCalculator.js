import { useMemo } from 'react';

export const useBudgetCalculator = (income, percentage, items) => {
  return useMemo(() => {
    const totalBudget = Math.floor((income * percentage) / 100);
    const fixedTotal = items
      .filter(item => item.isFixed)
      .reduce((sum, item) => sum + Number(item.amount), 0);
    
    const remainingBudget = Math.max(0, totalBudget - fixedTotal);
    const splitItems = items.filter(item => !item.isFixed).length;
    
    return {
      totalBudget,
      fixedTotal,
      remainingBudget,
      splitAmount: splitItems > 0 ? Math.floor(remainingBudget / splitItems) : 0
    };
  }, [income, percentage, items]);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
