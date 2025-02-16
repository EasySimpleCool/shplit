# Info Banner in Needs Category Implementation Plan

## Overview
Move the info banner into the Needs category section with a white background and blue text design, maintaining its dismissible functionality.

## Component Design

### Location
- Move InfoBanner from BudgetSplitter.js to Category.js
- Place within the Needs category Stack component
- Position after the category title, before the items list

### Visual Design
- White background for the banner
- Blue text (#007DB8) to match the app's color scheme
- Blue info icon
- Blue close button
- Rounded corners for a softer look
- Proper spacing within the category layout
- Full-width within the container

### Technical Implementation

#### Component Updates

1. Category.js Changes:
```jsx
// Add conditional rendering for Needs category
{name === 'needs' && (
  <InfoBanner
    message="Shplit items will divide the remaining amount of money up evenly. Fixed items have a specific dollar value."
  />
)}
```

2. InfoBanner.js Updates:
```jsx
<div className="w-full bg-white rounded-lg">
  <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
    <div className="flex items-center gap-2 text-[#007DB8]">
      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
      <span>{message}</span>
    </div>
    <button className="text-[#007DB8] hover:text-[#006da3]">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>
  </div>
</div>
```

## Implementation Steps

1. Remove InfoBanner from BudgetSplitter.js
   - Delete import statement
   - Remove component instance

2. Update Category.js
   - Add InfoBanner import
   - Add conditional rendering for Needs category
   - Place within Stack component after title
   - Ensure proper gap spacing

3. Update InfoBanner Styling
   - Change background to white
   - Update text and icon colors to blue (#007DB8)
   - Add rounded corners
   - Adjust padding and spacing
   - Ensure proper width within container

## Example Updated Category.js Structure
```jsx
<Stack gap="static-24">
  <div className="flex flex-col items-center justify-center w-full">
    <h2 className="capitalize text-white text-center text-2xl mb-4">
      {name} <span className="font-black">${formatCurrency(totalBudget)}</span>
    </h2>
    
    {name === 'needs' && (
      <InfoBanner
        message="Shplit items will divide the remaining amount of money up evenly. Fixed items have a specific dollar value."
      />
    )}
  </div>

  {/* Rest of category content */}
</Stack>
```

## Testing Considerations
- Verify banner appears only in Needs category
- Check color contrast for accessibility
- Test spacing and alignment within category
- Verify proper text and icon colors
- Test persistence of dismissed state
- Ensure responsive behavior within category container