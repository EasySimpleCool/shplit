# Typography Alignment Fix

## Current Issue
- The h2 and div elements in the Category component have inherited margins causing unwanted spacing
- This affects the category name/percentage and amount display

## Solution
Add the Tailwind `m-0` class to remove default margins while maintaining other styling:

```jsx
// Before
<h2 className="capitalize text-white text-center body">
  {name} {category.percentage}%
</h2>
<div className="text-white text-center header">
  ${formatCurrency(totalBudget)}
</div>

// After
<h2 className="capitalize text-white text-center body m-0">
  {name} {category.percentage}%
</h2>
<div className="text-white text-center header m-0">
  ${formatCurrency(totalBudget)}
</div>
```

This change will:
- Remove default margins from both elements
- Maintain existing text alignment and typography
- Keep the Stack component's gap control for spacing between elements

## Implementation Steps
1. Add `m-0` class to the h2 element
2. Add `m-0` class to the div element
3. Verify the spacing is removed while maintaining other styles