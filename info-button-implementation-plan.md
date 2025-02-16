# Info Button Implementation Plan

## Overview
Add an info icon button to the header that can restore the dismissed info banner, and improve the banner's spacing behavior when closed.

## Component Changes

### 1. InfoBanner Component
- Remove margin/padding that might cause empty space when hidden
- Use conditional rendering to completely remove the element when hidden
- Move state management to a higher level (Category component) to allow external control

```jsx
// Updated props
InfoBanner.propTypes = {
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired
}
```

### 2. Header Component
- Add info icon button to the left of "shplit.money"
- Use the same blue color (#007DB8) for consistency
- Add hover and focus states
- Include aria-label for accessibility

```jsx
// New header button
<button
  className="text-[#007DB8] hover:text-[#006da3] focus:outline-none"
  aria-label="Show information"
>
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
</button>
```

### 3. Category Component
- Lift state management up from InfoBanner
- Handle banner visibility state
- Pass down visibility and dismiss handler to InfoBanner

### 4. State Management
- Store banner visibility in localStorage
- Add function to show banner when info button is clicked
- Maintain persistence across page reloads

## Implementation Steps

1. Update InfoBanner Component
```jsx
const InfoBanner = ({ message, isVisible, onDismiss }) => {
  if (!isVisible) return null;

  return (
    <div className="w-full bg-white rounded-lg">
      {/* ... existing content ... */}
    </div>
  );
};
```

2. Modify Header Component
```jsx
const Header = ({ onInfoClick }) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onInfoClick}
        className="text-[#007DB8] hover:text-[#006da3] focus:outline-none"
        aria-label="Show information"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      </button>
      <h1>shplit.money</h1>
    </div>
  );
};
```

3. Update Category Component
```jsx
const Category = ({ name, ... }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(() => {
    return localStorage.getItem('shplit-info-banner-dismissed') !== 'true';
  });

  const handleDismiss = () => {
    setIsInfoVisible(false);
    localStorage.setItem('shplit-info-banner-dismissed', 'true');
  };

  return (
    // ... existing JSX ...
    {name === 'needs' && (
      <InfoBanner
        message="Shplit items will divide the remaining amount of money up evenly. Fixed items have a specific dollar value."
        isVisible={isInfoVisible}
        onDismiss={handleDismiss}
      />
    )}
    // ... rest of JSX ...
  );
};
```

4. Add Show Banner Function
```jsx
const showBanner = () => {
  setIsInfoVisible(true);
  localStorage.setItem('shplit-info-banner-dismissed', 'false');
};
```

## Testing Considerations
- Verify no empty space remains when banner is dismissed
- Test info button shows banner correctly
- Ensure state persists correctly across page reloads
- Check accessibility of info button
- Verify smooth transitions between states
- Test responsive layout with and without banner