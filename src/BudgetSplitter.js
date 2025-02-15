import React, { useState, useEffect, useCallback } from 'react';
import Container from './components/Container';
import Category from './components/Category';
import { formatCurrency } from './hooks/useBudgetCalculator';

const BudgetSplitter = () => {
  const [income, setIncome] = useState(1000);
  const [lastAddedId, setLastAddedId] = useState(null);
  const [categories, setCategories] = useState({
    needs: { 
      percentage: 40, 
      items: []
    },
    wants: { 
      percentage: 30, 
      items: []
    },
    savings: { 
      percentage: 30, 
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
      const updatedItems = category.items.map(item => 
        item.id === itemId 
          ? { ...item, [isAmount ? 'amount' : 'name']: value }
          : item
      );
      
      return {
        ...prev,
        [categoryName]: { ...category, items: updatedItems }
      };
    });
  }, []);

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
          <h1 className="text-2xl font-bold text-white mb-4">Shplit.money</h1>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={income}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setIncome(value ? Number(value) : 0);
              }}
              className="p-2 pl-8 rounded text-black w-full h-10"
              placeholder="Enter your income"
            />
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