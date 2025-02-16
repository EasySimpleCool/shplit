# Info Banner Implementation Plan

## Overview
Replace the current tooltip in the Needs category with a persistent info banner at the top of the application that can be dismissed permanently.

## Component Design

### Location
- Remove tooltip from Category.js
- Add new InfoBanner component between header section and category sections in BudgetSplitter.js

### Visual Design
- Full-width banner with the app's existing blue color scheme
- Flexible height to accommodate content
- Consistent padding and spacing
- Info icon on the left
- Close button on the right
- Message text in the center
- Simple display/hide behavior (no animations)

### Technical Implementation

#### New Component Structure
```
src/components/shared/InfoBanner/
  ├── index.js
  └── InfoBanner.js
```

#### Features
1. Default Visibility
   - Banner shows by default on first visit
   - Uses localStorage to track if it has been dismissed

2. Persistence
   - Store dismissed state in localStorage
   - Key: 'shplit-info-banner-dismissed'
   - Value: boolean

#### Component Props
```javascript
InfoBanner.propTypes = {
  message: PropTypes.string.required,
  className: PropTypes.string,
  onDismiss: PropTypes.func
}
```

## Implementation Steps

1. Create InfoBanner Component
   - Build base component with message and close button
   - Implement localStorage persistence
   - Add styling consistent with app design

2. Remove Existing Tooltip
   - Remove tooltip code from Category.js
   - Clean up any unused imports

3. Add InfoBanner to BudgetSplitter
   - Place between header and category sections
   - Pass appropriate message text
   - Handle dismiss callback if needed

4. Styling
   - Use existing color scheme
   - Maintain consistent spacing
   - Ensure responsive design

## Example Usage

```jsx
<InfoBanner
  message="Shplit items will divide the remaining amount of money up evenly. Fixed items have a specific dollar value."
/>
```

## Testing Considerations
- Test persistence across page reloads
- Verify display/hide behavior
- Ensure responsive behavior
- Check contrast for accessibility