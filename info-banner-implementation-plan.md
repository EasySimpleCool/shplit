# Info Banner Toggle Implementation Plan

## Overview
Modify the info button in the top left to toggle the visibility of info banners, rather than just showing them. This will allow users to easily show/hide the info banners as needed.

## Current Implementation
- BudgetSplitter manages `isInfoVisible` state
- Header has an info button that calls `handleInfoShow`
- `handleInfoShow` always sets visibility to true
- `handleInfoDismiss` sets visibility to false
- State is persisted in localStorage with 'shplit-info-banner-dismissed'

## Implementation Steps

1. Modify BudgetSplitter.js
   - Rename `handleInfoShow` to `handleInfoToggle`
   - Update the function to toggle the current state instead of always setting to true
   - Keep the localStorage persistence behavior but update the logic to match the toggle

2. Update Header.js
   - Update the button's aria-label to "Toggle information" to reflect its new behavior
   - Keep the same icon and styling
   - Pass the renamed handler prop

## Code Changes

### BudgetSplitter.js
```javascript
// Rename handleInfoShow to handleInfoToggle
const handleInfoToggle = () => {
  setIsInfoVisible(prev => {
    const newValue = !prev;
    localStorage.setItem('shplit-info-banner-dismissed', (!newValue).toString());
    return newValue;
  });
};

// Update Header usage
<Header onInfoClick={handleInfoToggle} />
```

### Header.js
```javascript
const Header = ({ onInfoClick }) => (
  <div className="mb-4 relative flex items-center justify-center">
    <button
      onClick={onInfoClick}
      className="absolute left-0 text-white hover:text-gray-200 focus:outline-none"
      aria-label="Toggle information"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    </button>
    <h1 className="emphasis">Shplit</h1>
  </div>
);
```

## Testing Plan

1. Verify Toggle Behavior
   - Clicking info button when banners are hidden should show them
   - Clicking info button when banners are visible should hide them
   - State should persist across page reloads

2. Test Edge Cases
   - Verify individual banner dismiss buttons still work correctly
   - Check that localStorage is updated correctly
   - Ensure toggle works with multiple info banners on screen

## Migration Notes

This change is backward compatible as:
- Initial state behavior remains the same
- Individual banner dismiss functionality is unchanged
- Only the info button behavior is modified to support toggling