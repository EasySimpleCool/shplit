import React, { useState, useEffect, useCallback } from 'react';
import Container from './components/Container';
import Category from './components/Category';
const BudgetSplitter = () => {
  const [income, setIncome] = useState(1000);
  const [lastAddedId, setLastAddedId] = useState(null);
  const [categories, setCategories] = useState({
    needs: { 
      percentage: 50, 
      items: []
    },
    wants: { 
      percentage: 30, 
      items: []
    },
    savings: { 
      percentage: 20, 
      items: [] 
    }
  });

  const addItem = useCallback((categoryName, isFixed) => {
    const id = Date.now();
    setCategories(prev => {
      const category = prev[categoryName];
      const newItem = { id, name: '', amount: 0, isFixed };
      const updatedItems = [...category.items, newItem];
      
      return {
        ...prev,
        [categoryName]: {
          ...category,
          items: updatedItems
        }
      };
    });
    setLastAddedId(id);
  }, []);

  const updateItem = useCallback((categoryName, value, itemId, isAmount = false) => {
    setCategories(prev => {
      const category = prev[categoryName];
      
      if (!isAmount) {
        // If updating name, just update it directly
        const updatedItems = category.items.map(item =>
          item.id === itemId
            ? { ...item, name: value }
            : item
        );
        return {
          ...prev,
          [categoryName]: { ...category, items: updatedItems }
        };
      }

      // Calculate total budget for this category
      const totalBudget = Math.floor((income * category.percentage) / 100);

      // Get the current item
      const currentItem = category.items.find(item => item.id === itemId);
      
      if (!currentItem?.isFixed) {
        // If not a fixed item, update normally
        const updatedItems = category.items.map(item =>
          item.id === itemId
            ? { ...item, amount: value }
            : item
        );
        return {
          ...prev,
          [categoryName]: { ...category, items: updatedItems }
        };
      }

      // Calculate total of other fixed items
      const otherFixedTotal = category.items.reduce((sum, item) => {
        if (item.id !== itemId && item.isFixed) {
          return sum + (Number(item.amount) || 0);
        }
        return sum;
      }, 0);

      // Calculate maximum allowed value for this item
      const maxAllowed = totalBudget - otherFixedTotal;
      const newAmount = Math.min(Number(value) || 0, maxAllowed);

      // Update items with the constrained amount
      const updatedItems = category.items.map(item =>
        item.id === itemId
          ? { ...item, amount: newAmount }
          : item
      );

      return {
        ...prev,
        [categoryName]: { ...category, items: updatedItems }
      };
    });
  }, [income]); // Add income to dependencies since we use it in calculations

  const toggleItemType = useCallback((categoryName, itemId) => {
    setCategories(prev => {
      const category = prev[categoryName];
      const updatedItems = category.items.map(item => 
        item.id === itemId 
          ? { ...item, isFixed: !item.isFixed }
          : item
      );
      
      return {
        ...prev,
        [categoryName]: { ...category, items: updatedItems }
      };
    });
  }, []);

  useEffect(() => {
    if (lastAddedId) {
      const timeoutId = setTimeout(() => {
        setLastAddedId(null);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [lastAddedId]);

  return (
    <div style={{ backgroundColor: '#0A91CC' }} className="min-h-screen">
      <div style={{ backgroundColor: '#0A91CC' }} className="flex flex-col items-center w-full px-6 py-10">
        <Container>
          <h1 className="header mb-4 text-center">Shplit.money</h1>
          <div className="flex items-center gap-2 bg-[#0069A4] h-[72px] rounded-full w-full">
            <div className="flex-1 flex flex-col items-center justify-center">
              <label htmlFor="income" className="text-white/50 text-sm">Income</label>
              <div className="w-full">
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={income}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setIncome(value ? Number(value) : 0);
                  }}
                  className="w-full bg-transparent text-white font-inter font-black text-2xl text-center focus:outline-none"
                  placeholder="Enter your income"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {Object.entries(categories).map(([name, category], index) => (
        <Category
          key={name}
          name={name}
          category={category}
          income={income}
          backgroundColor={index % 2 === 0 ? '#007DB8' : '#0A91CC'}
          onAddItem={(isFixed) => addItem(name, isFixed)}
          onUpdateItem={(value, itemId, isAmount) => updateItem(name, value, itemId, isAmount)}
          onToggleItemType={(itemId) => toggleItemType(name, itemId)}
          lastAddedId={lastAddedId}
        />
      ))}
    </div>
  );
};

export default BudgetSplitter;