import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, Lock } from 'lucide-react';
import Container from './components/Container';

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

  const calculateCategoryBudget = (category) => {
    return (income * categories[category].percentage) / 100;
  };

  const calculateFixedTotal = (categoryItems) => {
    return categoryItems
      .filter(item => item.isFixed)
      .reduce((sum, item) => sum + Number(item.amount), 0);
  };

  const calculateSplitAmounts = (categoryItems, totalBudget) => {
    const fixedTotal = categoryItems
      .filter(item => item.isFixed)
      .reduce((sum, item) => sum + Number(item.amount), 0);
    
    const remainingBudget = Math.max(0, totalBudget - fixedTotal);
    const splitItems = categoryItems.filter(item => !item.isFixed).length;
    return {
      fixedTotal,
      remainingBudget,
      splitAmount: splitItems > 0 ? Math.floor(remainingBudget / splitItems) : 0
    };
  };

  const addItem = (categoryName, isFixed) => {
    const id = Date.now();
    const newItem = {
      id,
      name: '',
      amount: 0,
      isFixed: isFixed
    };
    
    setCategories(prev => {
      const updatedCategories = {
        ...prev,
        [categoryName]: {
          ...prev[categoryName],
          items: [...prev[categoryName].items, newItem]
        }
      };
      
      const category = updatedCategories[categoryName];
      const totalBudget = Math.floor(calculateCategoryBudget(categoryName));
      const { splitAmount } = calculateSplitAmounts(category.items, totalBudget);
      
      updatedCategories[categoryName].items = category.items.map(item => ({
        ...item,
        amount: item.isFixed ? item.amount : splitAmount
      }));
      
      return updatedCategories;
    });
    
    setLastAddedId(id);
  };

  const toggleItemType = (categoryName, itemId) => {
    setCategories(prev => {
      const category = prev[categoryName];
      const totalBudget = Math.floor(calculateCategoryBudget(categoryName));
      
      const updatedItems = category.items.map(item => {
        if (item.id === itemId) {
          return { ...item, isFixed: !item.isFixed };
        }
        return item;
      });

      const { splitAmount } = calculateSplitAmounts(updatedItems, totalBudget);
      
      return {
        ...prev,
        [categoryName]: {
          ...category,
          items: updatedItems.map(item => ({
            ...item,
            amount: item.isFixed ? item.amount : splitAmount
          }))
        }
      };
    });
  };

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
          <input
            type="text"
            value={income}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setIncome(value ? Number(value) : 0);
            }}
            className="p-2 rounded text-black w-full"
            placeholder="Enter your income"
          />
        </Container>
      </div>

      {Object.entries(categories).map(([categoryName, category], index) => (
        <div key={categoryName} 
          style={{ backgroundColor: index % 2 === 0 ? '#007DB8' : '#0A91CC' }}
          className="flex flex-col items-center w-full px-6 py-10"
        >
          <Container>
            <div className="flex items-center mb-4 w-full">
              <h2 className="text-xl capitalize text-white">
                {categoryName} <span className="font-bold">${Math.floor(calculateCategoryBudget(categoryName))}</span>
              </h2>
            </div>
            
            <div className="space-y-2 w-full">
              {category.items.map(item => (
                <div key={item.id} className="flex items-center gap-2 bg-[#0069A4] p-2 rounded w-full">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const updatedItems = category.items.map(i => 
                        i.id === item.id ? { ...i, name: e.target.value } : i
                      );
                      setCategories(prev => ({
                        ...prev,
                        [categoryName]: { ...category, items: updatedItems }
                      }));
                    }}
                    className="flex-1 p-2 rounded text-black min-w-0"
                    placeholder="Item name"
                    autoFocus={item.id === lastAddedId}
                    onFocus={(e) => e.target.select()}
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-white">$</span>
                    {item.isFixed ? (
                      <input
                        type="text"
                        value={Math.floor(item.amount)}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setCategories(prev => {
                            const updatedCategories = { ...prev };
                            const items = [...prev[categoryName].items];
                            const fixedItem = items.find(i => i.id === item.id);
                            if (fixedItem) {
                              fixedItem.amount = value ? Number(value) : 0;
                            }
                            const totalBudget = Math.floor(calculateCategoryBudget(categoryName));
                            const { splitAmount } = calculateSplitAmounts(items, totalBudget);
                            
                            items.forEach(i => {
                              if (!i.isFixed) {
                                i.amount = splitAmount;
                              }
                            });
                            
                            updatedCategories[categoryName].items = items;
                            return updatedCategories;
                          });
                        }}
                        className="w-24 p-2 rounded text-black border border-transparent focus:border-blue-500"
                        placeholder="Amount"
                      />
                    ) : (
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          value={Math.floor(item.amount)}
                          className="w-24 p-2 rounded bg-gray-100 text-gray-600 cursor-default"
                          readOnly
                        />
                        <Lock className="w-4 h-4 text-white absolute right-2" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleItemType(categoryName, item.id)}
                    className="p-2 rounded bg-[#005a8f] hover:bg-[#004a7f] shrink-0"
                    title={item.isFixed ? "Fixed Amount" : "Split Amount"}
                  >
                    {item.isFixed ? <DollarSign className="w-5 h-5 text-white" /> : <Percent className="w-5 h-5 text-white" />}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => addItem(categoryName, false)}
                className="flex-1 bg-[#0069A4] p-2 rounded-lg hover:bg-[#005a8f] flex items-center justify-center gap-2 text-white"
              >
                <Percent className="w-4 h-4 text-white" />
                Add Split
              </button>
              <button
                onClick={() => addItem(categoryName, true)}
                className="flex-1 bg-[#0069A4] p-2 rounded-lg hover:bg-[#005a8f] flex items-center justify-center gap-2 text-white"
              >
                <DollarSign className="w-4 h-4 text-white" />
                Add Dollar
              </button>
            </div>
          </Container>
        </div>
      ))}
    </div>
  );
};

export default BudgetSplitter;