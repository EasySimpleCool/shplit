# Stack Restructure Plan

## Overview
Restructure the Category component to properly remove the info banner and its container from the Stack when hidden, ensuring no extra gaps remain.

## Current Structure
```jsx
<Stack gap="static-16">
  <div className="flex flex-col items-center justify-center w-full gap-4">
    <h2>Title</h2>
    {name === 'needs' && (
      <InfoBanner />  // When hidden, container div remains
    )}
  </div>
  <Stack gap="static-4">
    {/* Items */}
  </Stack>
  <ButtonGroup />
</Stack>
```

## New Structure
```jsx
<Stack gap="static-16">
  <h2 className="text-center">Title</h2>
  
  {name === 'needs' && isInfoVisible && (
    <InfoBanner />  // Complete element removed when hidden
  )}
  
  <Stack gap="static-4">
    {/* Items */}
  </Stack>
  
  <ButtonGroup />
</Stack>
```

## Changes Required

1. Move title out of container div
   - Remove the flex container div
   - Update title styling to maintain centering

2. Update InfoBanner placement
   - Move it to be a direct child of the Stack
   - Include isInfoVisible in the conditional rendering
   - Update InfoBanner component to handle its own container

3. Update InfoBanner Component
```jsx
const InfoBanner = ({ message, isVisible, onDismiss }) => {
  if (!isVisible) return null;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full bg-white rounded-lg">
        {/* ... existing content ... */}
      </div>
    </div>
  );
};
```

## Expected Result
When info banner is hidden:
```
Stack
├── Title
├── Items
└── ButtonGroup
```

When info banner is visible:
```
Stack
├── Title
├── InfoBanner
├── Items
└── ButtonGroup
```

## Benefits
- No empty containers left in the DOM
- Proper Stack spacing maintained
- Clean transitions between states
- Better component structure