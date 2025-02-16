import React, { useState, useEffect, useCallback } from 'react';
import Container from './components/Container';
import Category from './components/Category';
import Stack from './components/layout/Stack';
import Header from './components/shared/Header';
import MoneyInput from './components/shared/MoneyInput';

const BudgetSplitter = () => {
  const [income, setIncome] = useState(1000);
  const [lastAddedId, setLastAddedId] = useState(null);
  const [isInfoVisible, setIsInfoVisible] = useState(() => {
    return localStorage.getItem('shplit-info-banner-dismissed') !== 'true';
  });

  const handleInfoDismiss = () => {
    setIsInfoVisible(false);
    localStorage.setItem('shplit-info-banner-dismissed', 'true');
  };

  const handleInfoShow = () => {
    setIsInfoVisible(true);
    localStorage.setItem('shplit-info-banner-dismissed', 'false');
  };
  const [categories, setCategories] = useState({
    needs: {
      percentage: 50,
      items: [
        {
          id: 1,
          name: "Example shplit",
          amount: 0,
          isFixed: false
        },
        {
          id: 2,
          name: "Example fixed",
          amount: 50,
          isFixed: true
        }
      ]
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
  }, [income]);

  const removeLastItem = useCallback((categoryName) => {
    setCategories(prev => {
      const category = prev[categoryName];
      const updatedItems = [...category.items];
      updatedItems.pop(); // Remove the last item
      
      return {
        ...prev,
        [categoryName]: {
          ...category,
          items: updatedItems
        }
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
    <div className="min-h-screen bg-[#0A91CC]">
      {/* Header Section */}
      <section className="w-full py-6">
        <Container>
          <Stack gap="4">
            <Header onInfoClick={handleInfoShow} />
            <MoneyInput 
              value={income}
              onChange={setIncome}
              label="Monthly pay"
            />
          </Stack>
        </Container>
      </section>

      {/* Category Sections */}
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
          onRemoveItem={() => removeLastItem(name)}
          lastAddedId={lastAddedId}
          isInfoVisible={isInfoVisible}
          onInfoDismiss={handleInfoDismiss}
        />
      ))}
    </div>
  );
};

export default BudgetSplitter;