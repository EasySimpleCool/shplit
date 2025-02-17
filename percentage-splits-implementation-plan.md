# Percentage Splits Implementation Plan

## Overview
Add functionality to allow users to edit the percentage splits for each category (needs, wants, savings) with automatic reallocation of remaining percentage across other categories.

## Technical Approach

### 1. State Management Updates
- Add new state management for editing percentages
- Implement automatic reallocation logic
- Add error handling for invalid percentage inputs

### 2. UI Components
- Add percentage input field to each category header
- Create a new shared component `PercentageInput` for consistent percentage editing
- Add visual feedback for percentage changes
- Show how other categories will be affected by changes

### 3. Reallocation Rules
- When a category's percentage is changed:
  1. Calculate the difference from previous value
  2. Distribute remaining percentage proportionally across other categories
  3. Round numbers appropriately to maintain 100% total
- Example:
  * Initial: Needs 40%, Wants 30%, Savings 30%
  * User changes Needs to 50%
  * Difference: +10% needs to be taken proportionally from Wants and Savings
  * Since Wants and Savings were equal, each loses 5%
  * Result: Needs 50%, Wants 25%, Savings 25%

### 4. Implementation Steps

1. Create new PercentageInput component:
   - Input field for percentage
   - Validation feedback
   - Format handling (numbers only, max 100)
   - Styling consistent with existing design

2. Update Category component:
   - Add PercentageInput to category header
   - Add percentage editing callbacks
   - Show preview of how change affects other categories
   - Add tooltip to explain reallocation behavior

3. Modify BudgetSplitter:
   ```javascript
   const handlePercentageChange = (categoryName, newPercentage) => {
     setCategories(prev => {
       const oldPercentage = prev[categoryName].percentage;
       const difference = newPercentage - oldPercentage;
       
       // Get other categories to redistribute remaining percentage
       const otherCategories = Object.entries(prev)
         .filter(([name]) => name !== categoryName);
       
       // Calculate total percentage of other categories
       const otherTotal = otherCategories
         .reduce((sum, [, cat]) => sum + cat.percentage, 0);
       
       // Distribute difference proportionally
       const updated = {};
       otherCategories.forEach(([name, category]) => {
         const proportion = category.percentage / otherTotal;
         const newCategoryPercentage = Math.max(
           0, 
           category.percentage - (difference * proportion)
         );
         updated[name] = {
           ...category,
           percentage: Math.round(newCategoryPercentage)
         };
       });
       
       return {
         ...updated,
         [categoryName]: {
           ...prev[categoryName],
           percentage: newPercentage
         }
       };
     });
   };
   ```

4. Update useBudgetCalculator:
   - No changes needed as it already handles percentage calculations correctly

### 5. Error Handling
- Prevent percentages below 0% or above 100%
- Handle rounding errors to maintain 100% total
- Provide user feedback for invalid inputs

### 6. UX Considerations
- Real-time preview of how other categories will be affected
- Smooth transitions when updating values
- Clear visual feedback of percentage changes
- Mobile-friendly input handling
- Tooltip explaining reallocation behavior

### 7. Reallocation Examples

#### Example 1: Equal Distribution
Initial:
- Needs: 40%
- Wants: 30%
- Savings: 30%

User changes Needs to 50%:
1. Difference: +10%
2. Wants and Savings each had equal percentages (30%)
3. Each loses 5% (proportional to their original values)
Result:
- Needs: 50%
- Wants: 25%
- Savings: 25%

#### Example 2: Proportional Distribution
Initial:
- Needs: 40%
- Wants: 40%
- Savings: 20%

User changes Needs to 50%:
1. Difference: +10%
2. Wants had 40% (2/3 of remaining 60%)
3. Savings had 20% (1/3 of remaining 60%)
4. Wants loses 6.67% (2/3 of 10%)
5. Savings loses 3.33% (1/3 of 10%)
Result:
- Needs: 50%
- Wants: 33%
- Savings: 17%

## Testing Plan
1. Test percentage input validation
2. Test reallocation logic with various scenarios
3. Test rounding behavior
4. Test budget recalculation with new percentages
5. Test edge cases (0%, 100%)
6. Test mobile responsiveness
7. Test keyboard navigation

## Next Steps
1. Review and approve implementation plan
2. Switch to Code mode to implement the changes
3. Test the implementation
4. Review and refine as needed