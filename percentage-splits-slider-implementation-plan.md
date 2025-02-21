# Percentage Splits Slider Implementation Plan

## Current Status
- ✅ Fixed category reordering
- ✅ Implemented percentage constraints
- ✅ Improved redistribution logic

## New Requirement: Combined Sliders in Header
Move all percentage sliders to the header section for easier simultaneous adjustment.

### 1. Create New Component
Create a new PercentageSplits component:
```jsx
// src/components/shared/PercentageSplits/index.js
const PercentageSplits = ({ categories, onPercentageChange }) => {
  return (
    <div className="bg-[#0A91CC] p-4 rounded-lg">
      {categories.map(category => (
        <div key={category.id} className="mb-4 last:mb-0">
          <div className="flex items-center mb-2">
            <h3 className="capitalize text-white text-left body m-0">
              {category.id}
            </h3>
            <span className="text-white ml-2">
              {category.percentage}%
            </span>
          </div>
          <PercentageSlider
            value={category.percentage}
            onChange={(value) => onPercentageChange(category.id, value)}
            trackColor="rgba(255, 255, 255, 0.5)"
            label={`${category.id} percentage`}
          />
        </div>
      ))}
    </div>
  );
};
```

### 2. Update BudgetSplitter Layout
1. Move sliders to header section
2. Keep budget amounts in category sections
3. Update styling for better visual hierarchy

Changes to BudgetSplitter.js:
```jsx
{/* Header Section */}
<section className="w-full py-6">
  <Container>
    <Stack gap="6">
      <Header onInfoClick={handleInfoToggle} />
      <MoneyInput 
        value={income}
        onChange={setIncome}
        label="Monthly pay"
      />
      <PercentageSplits
        categories={categories}
        onPercentageChange={handlePercentageChange}
      />
    </Stack>
  </Container>
</section>
```

### 3. Update Category Component
Remove slider from Category component, keeping only:
- Budget amount display
- Info banner
- Category items
- Add/Remove buttons

### 4. Styling Updates
1. Add container styles for combined sliders
2. Ensure consistent spacing between elements
3. Maintain visual hierarchy with header
4. Keep responsive layout

## Implementation Steps
1. Create new PercentageSplits component
2. Update BudgetSplitter layout
3. Modify Category component
4. Add necessary styles
5. Test functionality:
   - All sliders work independently
   - Percentage constraints still apply
   - Budget amounts update correctly
   - Responsive layout works

## Expected Result
A more intuitive interface where users can:
- See and adjust all percentages in one place
- Easily compare and balance allocations
- Still view individual category details below
- Maintain all existing functionality