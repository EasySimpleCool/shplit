# Header Logo Changes Implementation Plan

## Changes Required

1. Update Header component to:
   - Add the AppIcon.svg logo above the existing header text
   - Set logo dimensions to exactly 80x80 pixels
   - Keep existing text "shplit.money" with className="header"
   - Maintain existing info button functionality
   - Ensure proper spacing and alignment

## Implementation Details

```jsx
// Updated Header structure
<div className="mb-4 relative">
  {/* Logo container */}
  <div className="flex justify-center mb-2">
    <img 
      src="/AppIcon.svg"
      alt="Shplit Logo"
      className="w-20 h-20" // w-20 and h-20 in Tailwind equals 80x80 pixels
    />
  </div>
  
  {/* Existing header - keeping exact text and className */}
  <div className="flex items-center justify-center">
    <button
      onClick={onInfoClick}
      className="absolute left-0 text-white hover:text-gray-200 focus:outline-none"
      aria-label="Toggle information"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    </button>
    <h1 className="header">shplit.money</h1>
  </div>
</div>
```

## Technical Considerations
- Set logo dimensions to exactly 80x80 pixels using Tailwind's w-20 and h-20 classes
- Center logo above header text
- Maintain responsive design
- Preserve existing functionality of info button
- Keep accessibility features intact
- Keep existing text "shplit.money" and className="header" unchanged

Ready to switch to Code mode for implementation.