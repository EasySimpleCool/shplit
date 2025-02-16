# Tooltip Component Implementation Plan

## Component Structure

### TooltipComponent
A reusable tooltip component that can be positioned relative to any trigger element.

```jsx
<Tooltip 
  content="Your tooltip content"
  isOpen={boolean}
  onClose={() => {}}
>
  <TriggerElement />
</Tooltip>
```

## Features
1. **Trigger Element**
   - Info icon by default (using Tabler icons)
   - Support for custom trigger elements
   - Accessible button behavior

2. **Tooltip Content**
   - Text content
   - Close button in top right
   - Dark background
   - Proper padding and spacing
   - Box shadow for depth
   - Optional arrow pointer

3. **Positioning**
   - Smart positioning relative to trigger
   - Stays within viewport
   - Smooth enter/exit animations

4. **Accessibility**
   - ARIA attributes for screen readers
   - Keyboard navigation support
   - Focus management
   - Close on Escape key

## Technical Implementation

### 1. Component Files
- `src/components/shared/Tooltip/`
  - `Tooltip.js` - Main component
  - `TooltipTrigger.js` - Default info icon trigger
  - `TooltipContent.js` - Content container with close button

### 2. Styling
Use Tailwind CSS for:
- Dark background color
- Border radius
- Shadow effects
- Positioning
- Transitions/animations

### 3. State Management
- Control open/closed state
- Handle click outside
- Position calculations

### 4. Usage Example
```jsx
// Basic usage with default info icon
<Tooltip content="Shplit items will divide the remaining amount of money up evenly. Fixed items have a specific dollar value.">
  <span>Need help?</span>
</Tooltip>

// Custom trigger
<Tooltip content="Custom tooltip content">
  <CustomTrigger />
</Tooltip>
```

## Implementation Steps

1. Create base component structure
2. Implement positioning logic
3. Add default info icon trigger
4. Style tooltip content container
5. Add close button functionality
6. Implement accessibility features
7. Add animations
8. Create documentation and examples

## Design Considerations

1. **Visual Design**
   - Match existing design system
   - Dark background (#1F2937)
   - Proper spacing (p-4)
   - Rounded corners
   - Subtle shadow

2. **Interaction Design**
   - Smooth open/close transitions
   - Click outside to close
   - Escape key to close
   - Focus management

3. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Focus trapping when open