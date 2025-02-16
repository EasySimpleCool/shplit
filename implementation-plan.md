# Implementation Plan for CategoryItem Responsive Fix

## Current Issues
- On narrow screens (320px minimum width), the layout breaks due to fixed-width inputs
- Amount inputs are set to w-20 (80px) which doesn't scale well
- Name input doesn't utilize available space effectively

## Space Calculation (320px screen)
- Left IconButton: 64px (w-16)
- Right IconButton: 64px (w-16)
- Gaps between elements: 8px × 2 = 16px
- Total fixed width: 144px
- Available space for content: 176px

## Proposed Changes

1. Remove fixed widths from amount inputs:
```diff
- className="w-20 text-white font-black text-2xl text-center mx-auto"
+ className="min-w-[60px] flex-1 text-white font-black text-2xl text-center"
```

2. Optimize name input for better space utilization:
```diff
- className="text-white/50 text-sm text-center placeholder-white/50"
+ className="text-white/50 text-sm text-center placeholder-white/50 w-full"
```

3. Adjust Stack component to better handle narrow widths:
```diff
- <Stack className="flex-1" gap="1">
+ <Stack className="flex-1 min-w-0" gap="1">
```

## Expected Outcome
- Inputs will scale with available space while maintaining minimum readability
- Layout will remain intact on screens as narrow as 320px
- Text will truncate gracefully if needed
- Numbers will remain readable with minimum width of 60px

## Implementation Steps
1. Switch to Code mode to implement the changes
2. Test on various screen widths (especially 320px)
3. Verify that both fixed and split amount displays remain functional
4. Ensure text input remains usable on narrow screens