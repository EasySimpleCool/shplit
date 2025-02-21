# Percentage Input Enhancement Plan

## Overview
Replace the current slider-based percentage input with a more precise input + increase/decrease button design for the Need/Want/Save splits.

## Current Implementation
- Uses `PercentageSlider` component with HTML range input
- Shows percentage value in text next to category name
- Allows direct manipulation through slider

## New Design Components
1. **Enhanced PercentageInput**
   - Already has validation and formatting
   - Handles numeric input with % symbol
   - Width and styling will need adjustment

2. **Percentage Controls**
   - Add increase/decrease buttons on either side of input
   - Use IconButton component with custom + and - icons
   - Step size of 1% for fine control
   - Ensure buttons respect min/max bounds (0-100%)

3. **Layout Changes**
   - Replace slider with horizontal layout:
     ```
     [Decrease] [Input] [Increase]
     ```
   - Maintain current category label and percentage display
   - Keep consistent spacing and alignment

## Implementation Steps

1. Create new `PercentageControl` component:
   - Combine PercentageInput with +/- buttons
   - Handle increment/decrement logic
   - Maintain value bounds
   - Pass through onChange events

2. Modify `PercentageSplits` component:
   - Replace PercentageSlider with new PercentageControl
   - Adjust layout and styling
   - Ensure proper spacing and alignment

3. Add new icon components:
   - Create MinusIcon component
   - Create PlusIcon component
   - Match existing icon styling

4. Update styles:
   - Maintain consistent color scheme
   - Match existing component spacing
   - Ensure mobile responsiveness

## Technical Considerations

1. **State Management**
   - Continue using existing percentage change handlers
   - Maintain current validation logic
   - Ensure smooth updates between components

2. **Accessibility**
   - Add proper ARIA labels for buttons
   - Maintain keyboard navigation
   - Include proper focus indicators

3. **Validation**
   - Leverage existing PercentageInput validation
   - Add validation for increment/decrement operations
   - Ensure total remains 100%

4. **Mobile Support**
   - Ensure touch targets are large enough
   - Test responsiveness at various breakpoints
   - Maintain usability on small screens

## Next Steps

1. Switch to Code mode to implement the new components
2. Create the necessary icon components
3. Implement the PercentageControl component
4. Update PercentageSplits to use the new control
5. Test the implementation thoroughly
6. Make any necessary adjustments based on feedback