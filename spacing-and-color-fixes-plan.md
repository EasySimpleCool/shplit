# Spacing and Color Fixes Plan

## Overview
Fix the spacing issues when the info banner is dismissed and update the header's info icon color to white.

## Changes Required

### 1. Category Component Spacing

Current Issue:
- Large gap remains after info banner is dismissed
- Spacing is not properly managed within the Stack component

Solution:
- Remove mb-4 class from h2 element since Stack handles gaps
- Adjust Stack gap values to be more precise
- Remove any extra margin/padding classes that might cause spacing issues

```jsx
// Updated Category JSX structure
<Stack gap="static-24">
  <div className="flex flex-col items-center justify-center w-full">
    <h2 className="capitalize text-white text-center text-2xl">
      {name} <span className="font-black">${formatCurrency(totalBudget)}</span>
    </h2>
    
    {name === 'needs' && (
      <InfoBanner
        message="Shplit items will divide the remaining amount of money up evenly. Fixed items have a specific dollar value."
        isVisible={isInfoVisible}
        onDismiss={onInfoDismiss}
      />
    )}
  </div>

  {category.items.length > 0 && (
    <Stack gap="static-4">
      {/* Items */}
    </Stack>
  )}

  <ButtonGroup />
</Stack>
```

### 2. Header Icon Color

Current Issue:
- Info icon is blue (#007DB8)
- Should be white to match header text

Solution:
- Update Header component styles
- Change icon color to white
- Add appropriate hover state

```jsx
// Updated Header button styles
<button
  onClick={onInfoClick}
  className="absolute left-0 text-white hover:text-gray-200 focus:outline-none"
  aria-label="Show information"
>
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    {/* ... */}
  </svg>
</button>
```

## Implementation Steps

1. Update Category Component
   - Remove mb-4 from h2
   - Ensure proper Stack gap values
   - Remove any unnecessary spacing classes

2. Update Header Component
   - Change icon color to white
   - Update hover state to use appropriate white variant
   - Maintain proper positioning

## Testing Considerations
- Verify spacing is consistent with and without info banner
- Check white icon visibility against background
- Ensure hover states are visible
- Verify overall layout alignment