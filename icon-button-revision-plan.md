# Icon Button Revision Plan

## Overview
Create a separate square icon button variant while maintaining the original circular IconButton design.

## Implementation Steps

1. **Revert IconButton**
   - Restore original circular design
   - Keep original styling and label display
   - Maintain existing usage in other components

2. **Create SquareIconButton**
   - New component specifically for percentage controls
   - Squared-off design
   - No label display
   - Semi-transparent background
   - Hover states
   - Accessibility support

3. **Update PercentageControl**
   - Use new SquareIconButton instead of IconButton
   - Maintain current layout and functionality
   - Keep Stack component for label and value

## Component Details

### IconButton (Reverted)
```jsx
<button className="p-2 rounded-full shrink-0 h-16 w-16 flex flex-col items-center justify-center">
  <Icon className="w-[20px] h-[20px]" />
  <span className="tiny mt-0.5">{label}</span>
</button>
```

### SquareIconButton (New)
```jsx
<button className="w-16 h-16 flex items-center justify-center bg-white/10 hover:bg-white/20">
  <Icon className="w-8 h-8 text-white" />
</button>
```

## Next Steps

1. Switch to Code mode to:
   - Revert IconButton changes
   - Create new SquareIconButton component
   - Update PercentageControl to use SquareIconButton
   - Test implementation