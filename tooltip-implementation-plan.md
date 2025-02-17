# Tooltip Toggle Implementation Plan

## Overview
Add functionality to toggle all tooltips on/off via the info button in the top left of the application. This will enhance user experience by allowing users to hide tooltips once they're familiar with the interface.

## Implementation Steps

1. Add Global Tooltip State
   - Add `isTooltipsEnabled` state to BudgetSplitter component
   - Initialize from localStorage with key 'shplit-tooltips-enabled'
   - Default to true if no preference is stored

2. Modify Info Button Behavior
   - Update `handleInfoShow` to also enable tooltips
   - Add new `handleTooltipToggle` function that:
     - Toggles `isTooltipsEnabled` state
     - Persists preference to localStorage
   - Update Header component to use `handleTooltipToggle` instead of `handleInfoShow`

3. Update Tooltip Component
   - Add `enabled` prop to Tooltip component
   - Modify Tooltip to respect this prop:
     - When `enabled={false}`, don't show tooltip content
     - Keep trigger element visible but non-interactive
   - Pass `isTooltipsEnabled` from BudgetSplitter through component tree

4. Component Updates
   - Update BudgetSplitter to pass `isTooltipsEnabled` to Category components
   - Update Category to pass `isTooltipsEnabled` to any child components using tooltips

## Code Changes

### BudgetSplitter.js
```javascript
const [isTooltipsEnabled, setIsTooltipsEnabled] = useState(() => {
  return localStorage.getItem('shplit-tooltips-enabled') !== 'false';
});

const handleTooltipToggle = () => {
  setIsTooltipsEnabled(prev => {
    const newValue = !prev;
    localStorage.setItem('shplit-tooltips-enabled', newValue.toString());
    return newValue;
  });
};
```

### Header.js
```javascript
const Header = ({ onInfoClick }) => (
  <div className="mb-4 relative flex items-center justify-center">
    <button
      onClick={onInfoClick}
      className="absolute left-0 text-white hover:text-gray-200 focus:outline-none"
      aria-label="Toggle tooltips"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    </button>
    <h1 className="emphasis">Shplit</h1>
  </div>
);
```

### Tooltip.js
```javascript
const Tooltip = ({ 
  children, 
  content, 
  className = '',
  defaultOpen = false,
  enabled = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // Early return if tooltips are disabled
  if (!enabled) {
    return (
      <div className={`relative inline-block ${className}`}>
        {children}
      </div>
    );
  }

  // Rest of existing implementation...
};
```

## Testing Plan

1. Verify Initial State
   - On first load, tooltips should be enabled
   - Tooltip visibility state should persist across page reloads

2. Test Toggle Functionality
   - Clicking info button should toggle all tooltips
   - When disabled, tooltip triggers should not show tooltips
   - When re-enabled, tooltips should work as before

3. Test Edge Cases
   - Verify tooltips close properly when disabled while some are open
   - Check that tooltip state persists correctly in localStorage
   - Ensure toggle works with multiple tooltips on screen

## Migration Notes

This change is backward compatible as:
- Default enabled state is true
- No changes to existing tooltip trigger behavior when enabled
- All changes are additive to existing implementation