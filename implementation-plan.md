# Password Manager Icons Removal Plan

## Problem
Password manager browser extensions are detecting the itemname input fields as potential username/password fields and showing their icons, which is not desired for this use case.

## Solution
Add specific HTML attributes to the Input component that will prevent password managers from detecting these fields as potential username/password inputs.

### Technical Changes

1. Modify `src/components/shared/Input.js`:
   - Add default attributes to the input element:
     ```jsx
     <input
       autocomplete="off"
       data-lpignore="true"
       data-form-type="other"
       // ... existing props
     />
     ```
   These attributes will:
   - `autocomplete="off"`: Prevent browser's built-in autocomplete suggestions
   - `data-lpignore="true"`: Specifically prevent LastPass from detecting the field
   - `data-form-type="other"`: Signal to password managers that this is not a login form field

2. No changes needed to CategoryItem.js as these attributes will be automatically applied to all Input components.

### Implementation Steps
1. Switch to Code mode to implement the changes
2. Update the Input component with the new attributes
3. Test the changes to ensure:
   - Password manager icons no longer appear
   - Existing input functionality remains unchanged

### Impact
- ✅ Removes password manager icons from itemname inputs
- ✅ No impact on existing functionality
- ✅ Simple, maintainable solution
- ✅ Works across different password managers