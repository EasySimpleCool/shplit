import React, { useState, useEffect, useCallback } from 'react';
import Container from './components/Container';
import Category from './components/Category';
import Stack from './components/layout/Stack';
import Header from './components/shared/Header';
import MoneyInput from './components/shared/MoneyInput';
import PercentageSplits from './components/shared/PercentageSplits';

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

  const handleInfoToggle = () => {
    setIsInfoVisible(prev => {
      const newValue = !prev;
      localStorage.setItem('shplit-info-banner-dismissed', (!newValue).toString());
      return newValue;
    });
  };

  const [categories, setCategories] = useState([
    {
      id: 'needs',
      percentage: 40,
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
    {
      id: 'wants',
      percentage: 30,
      items: []
    },
    {
      id: 'savings',
      percentage: 30,
      items: []
    }
  ]);

  const findCategoryIndex = useCallback((categoryId) => {
    return categories.findIndex(cat => cat.id === categoryId);
  }, [categories]);

  const addItem = useCallback((categoryId, isFixed) => {
    const id = Date.now();
    setCategories(prev => {
      const categoryIndex = prev.findIndex(cat => cat.id === categoryId);
      if (categoryIndex === -1) return prev;

      const newCategories = [...prev];
      const category = { ...newCategories[categoryIndex] };
      const newItem = { id, name: '', amount: 0, isFixed };
      
      category.items = [...category.items, newItem];
      newCategories[categoryIndex] = category;
      
      return newCategories;
    });
    setLastAddedId(id);
  }, []);

  const updateItem = useCallback((categoryId, value, itemId, isAmount = false) => {
    setCategories(prev => {
      const categoryIndex = prev.findIndex(cat => cat.id === categoryId);
      if (categoryIndex === -1) return prev;

      const newCategories = [...prev];
      const category = { ...newCategories[categoryIndex] };
      
      if (!isAmount) {
        // If updating name, just update it directly
        category.items = category.items.map(item =>
          item.id === itemId
            ? { ...item, name: value }
            : item
        );
        newCategories[categoryIndex] = category;
        return newCategories;
      }

      // Calculate total budget for this category
      const totalBudget = Math.floor((income * category.percentage) / 100);

      // Get the current item
      const currentItem = category.items.find(item => item.id === itemId);
      
      if (!currentItem?.isFixed) {
        // If not a fixed item, update normally
        category.items = category.items.map(item =>
          item.id === itemId
            ? { ...item, amount: value }
            : item
        );
        newCategories[categoryIndex] = category;
        return newCategories;
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
      category.items = category.items.map(item =>
        item.id === itemId
          ? { ...item, amount: newAmount }
          : item
      );
      
      newCategories[categoryIndex] = category;
      return newCategories;
    });
  }, [income]);

  const removeLastItem = useCallback((categoryId) => {
    setCategories(prev => {
      const categoryIndex = prev.findIndex(cat => cat.id === categoryId);
      if (categoryIndex === -1) return prev;

      const newCategories = [...prev];
      const category = { ...newCategories[categoryIndex] };
      category.items = category.items.slice(0, -1);
      
      newCategories[categoryIndex] = category;
      return newCategories;
    });
  }, []);

  const handlePercentageChange = useCallback((categoryId, newPercentage) => {
    setCategories(prev => {
      const categoryIndex = prev.findIndex(cat => cat.id === categoryId);
      if (categoryIndex === -1) return prev;

      const oldPercentage = prev[categoryIndex].percentage;
      const difference = newPercentage - oldPercentage;
      
      // If decreasing or no change, just update the category
      if (difference <= 0) {
        return prev.map((category, index) => 
          index === categoryIndex 
            ? { ...category, percentage: newPercentage }
            : category
        );
      }
      
      // Calculate what the total would be with the new percentage
      const newTotal = prev.reduce((sum, cat, idx) => 
        idx === categoryIndex ? sum + newPercentage : sum + cat.percentage
      , 0);
      
      // If the new total wouldn't exceed 100%, just update the category
      if (newTotal <= 100) {
        return prev.map((category, index) => 
          index === categoryIndex 
            ? { ...category, percentage: newPercentage }
            : category
        );
      }
      
      // If we would exceed 100%, we need to redistribute
      const otherTotal = prev.reduce((sum, cat, idx) => 
        idx === categoryIndex ? sum : sum + cat.percentage, 0);
      
      // Constrain the new percentage to not exceed 100% total
      const maxAllowedPercentage = 100 - otherTotal;
      const constrainedNewPercentage = Math.min(newPercentage, maxAllowedPercentage);
      
      // If we had to constrain the percentage, don't redistribute
      if (constrainedNewPercentage !== newPercentage) {
        return prev.map((category, index) => 
          index === categoryIndex 
            ? { ...category, percentage: constrainedNewPercentage }
            : category
        );
      }
      
      // Get indices of other categories
      const otherIndices = prev
        .map((_, index) => index)
        .filter(index => index !== categoryIndex);
      
      // Calculate total percentage of other categories
      const currentOtherTotal = otherIndices
        .reduce((sum, index) => sum + prev[index].percentage, 0);
      
      // If there are no other categories or their total is 0, we can't redistribute
      if (currentOtherTotal === 0) {
        return prev.map((category, index) => 
          index === categoryIndex 
            ? { ...category, percentage: constrainedNewPercentage }
            : category
        );
      }
      
      // Redistribute the difference proportionally to prevent exceeding 100%
      return prev.map((category, index) => {
        if (index === categoryIndex) {
          return { ...category, percentage: constrainedNewPercentage };
        }
        
        const proportion = category.percentage / currentOtherTotal;
        const reduction = difference * proportion;
        const newCategoryPercentage = Math.max(0, Math.round(
          category.percentage - reduction
        ));
        
        return {
          ...category,
          percentage: newCategoryPercentage
        };
      });
    });
  }, []);

  const toggleItemType = useCallback((categoryId, itemId) => {
    setCategories(prev => {
      const categoryIndex = prev.findIndex(cat => cat.id === categoryId);
      if (categoryIndex === -1) return prev;

      const newCategories = [...prev];
      const category = { ...newCategories[categoryIndex] };
      category.items = category.items.map(item => 
        item.id === itemId 
          ? { ...item, isFixed: !item.isFixed }
          : item
      );
      
      newCategories[categoryIndex] = category;
      return newCategories;
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
          <Stack gap="static-16">
            <Header onInfoClick={handleInfoToggle} />
            <MoneyInput 
              value={income}
              onChange={setIncome}
              label="Monthly pay"
            />
            <PercentageSplits
              categories={categories}
              onPercentageChange={handlePercentageChange}
            />
          </Stack>
        </Container>
      </section>

      {/* Category Sections */}
      {categories.map((category, index) => (
        <Category
          key={category.id}
          name={category.id}
          category={category}
          income={income}
          backgroundColor={index % 2 === 0 ? '#007DB8' : '#0A91CC'}
          onAddItem={(isFixed) => addItem(category.id, isFixed)}
          onUpdateItem={(value, itemId, isAmount) => updateItem(category.id, value, itemId, isAmount)}
          onToggleItemType={(itemId) => toggleItemType(category.id, itemId)}
          onRemoveItem={() => removeLastItem(category.id)}
          lastAddedId={lastAddedId}
          isInfoVisible={isInfoVisible}
          onInfoDismiss={handleInfoDismiss}
        />
      ))}
    </div>
  );
};

export default BudgetSplitter;