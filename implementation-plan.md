# Implementation Plan for UI Improvements

## 1. Vertical Category Headers with Percentages

### Changes Required:
- Modify Category.js to update header format
- Add percentage to category label (e.g., "Need 40%")
- Ensure proper vertical spacing between categories
- Update Container.js if needed for layout changes

### Technical Details:
- Use flexbox column layout for vertical stacking
- Format: `${categoryName} ${percentage}%`
- Maintain existing styling/theming

## 2. Add InfoBanner Components

### Changes Required:
- Add InfoBanner component to each category section
- Create content for each category type:
  
  #### Need (40%):
  - Essential living expenses
  - Examples: "Rent, Phone bill, Insurance, Internet, Water, Transport"
  - Context: "These are your essential monthly expenses that you can't avoid"

  #### Want (30%):
  - Non-essential expenses
  - Examples: "Beers/Drinks, Netflix, Clothes, Apps"
  - Context: "Fun money for entertainment and lifestyle choices"

  #### Save (30%):
  - Long-term savings and investments
  - Examples: "Savings, Crypto, Stocks, Flights, New Phone"
  - Context: "Money for future goals and investments"

### Technical Details:
- Use existing InfoBanner component
- Position banner below category header
- Ensure responsive design
- Maintain consistent styling

## 3. Remove Add Fixed Button

### Changes Required:
- Remove "Add Fixed" button from UI
- Clean up any related code
- Ensure no layout issues after removal

## Implementation Steps:

1. Update Category Component
   - Modify header layout
   - Add percentage to labels
   - Integrate InfoBanner
   - Remove fixed button

2. Update Container Layout
   - Adjust for vertical stacking
   - Ensure proper spacing

3. Test and Verify
   - Check responsive behavior
   - Verify InfoBanner content
   - Ensure smooth transitions

## Notes:
- Maintain existing color scheme and styling
- Ensure accessibility standards
- Keep performance in mind with new InfoBanner components