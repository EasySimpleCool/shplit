# Percentage Input Revision Plan

## UI Structure
Based on the mockup and layer structure:

```
[MinusButton] [Stack: Label + Value] [PlusButton]
```

### Components Breakdown

1. **Container**
   - Horizontal flex layout
   - Full width with rounded corners
   - Blue background (#007DB8)
   - Consistent padding

2. **IconButton (Minus/Plus)**
   - Large square buttons
   - Semi-transparent white background
   - Uses Tabler Math icons
   - Positioned on left/right edges

3. **Stack (Center Content)**
   - Vertical stack layout
   - Contains:
     * Category label (e.g. "Want")
     * Percentage value (e.g. "30%")
   - Centered alignment

## Implementation Steps

1. **Update Icon Components**
   - Use Tabler Math icons instead of custom SVGs
   - Match the style from the mockup
   - Ensure proper sizing

2. **Create PercentageControl Component**
```jsx
<div className="flex items-stretch bg-[#007DB8] rounded-lg">
  <IconButton
    icon={MinusIcon}
    onClick={handleDecrement}
    className="bg-white/10"
  />
  
  <Stack className="flex-1 items-center justify-center">
    <span className="text-white capitalize">{label}</span>
    <span className="text-white text-4xl">{value}%</span>
  </Stack>
  
  <IconButton
    icon={PlusIcon}
    onClick={handleIncrement}
    className="bg-white/10"
  />
</div>
```

3. **Update PercentageSplits Component**
   - Remove old slider implementation
   - Integrate new PercentageControl
   - Maintain category mapping and event handling

## Styling Details

1. **Colors**
   - Background: #007DB8
   - Text: White
   - Buttons: White with 10% opacity (hover state TBD)

2. **Typography**
   - Category label: Regular weight, capitalized
   - Percentage: Large (text-4xl), bold

3. **Spacing**
   - Consistent padding around container
   - Equal spacing between elements
   - Full-height buttons

4. **Interactions**
   - Button hover states
   - Click animations
   - Smooth value transitions

## Technical Considerations

1. **Accessibility**
   - ARIA labels for buttons
   - Keyboard navigation
   - Focus indicators

2. **Mobile Support**
   - Touch-friendly button sizes
   - Responsive layout
   - Proper tap targets

## Next Steps

1. Switch to Code mode to implement revised design
2. Update icon components to use Tabler icons
3. Create new PercentageControl with exact layout
4. Style to match mockup precisely
5. Test implementation
6. Make adjustments based on feedback