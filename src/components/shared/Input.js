import React, { useState } from 'react';

/**
 * Input Component
 * A customized input component with enhanced UX features.
 * Handles both text and number inputs with special behaviors.
 * 
 * Features:
 * - Placeholder management: Shows/hides based on typing state
 * - Cursor positioning: Moves cursor to end on focus for text inputs
 * - Security: Prevents password managers and autofill
 * - Styling: Clean transparent background without borders
 * 
 * Styling:
 * - Base: Transparent background with no borders
 * - Focus: No visible outline
 * - Typography: Inherits from parent, customizable via className
 * 
 * @param {string} type - Input type ('text' or 'number')
 * @param {any} value - Current input value
 * @param {Function} onChange - Change handler function
 * @param {string} placeholder - Placeholder text (shown before typing)
 * @param {string} className - Additional CSS classes
 * @param {boolean} autoFocus - Whether to focus on mount
 * @param {boolean} readOnly - Whether the input is read-only
 * @param {Function} onFocus - Focus handler function
 * @param {Function} onBlur - Blur handler function
 */
const Input = ({ 
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  autoFocus,
  readOnly,
  onFocus,
  onBlur,
  ...props 
}) => {
  // Track if user has started typing (for placeholder management)
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  /**
   * Handle input focus
   * For text inputs: Moves cursor to end of input
   * Calls provided onFocus handler
   */
  const handleFocus = (e) => {
    if (type === 'text') {
      // Move cursor to end by clearing and resetting value
      const value = e.target.value;
      e.target.value = '';
      e.target.value = value;
    }
    onFocus?.(e);
  };

  /**
   * Handle input blur
   * Resets typing state if text input is empty
   * Calls provided onBlur handler
   */
  const handleBlur = (e) => {
    if (type === 'text' && !value) {
      setHasStartedTyping(false);
    }
    onBlur?.(e);
  };

  /**
   * Handle input change
   * Updates typing state and calls provided onChange handler
   */
  const handleChange = (e) => {
    setHasStartedTyping(true);
    onChange?.(e);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      className={`
        bg-transparent     /* Transparent background */
        border-0          /* Remove borders */
        border-none       /* Remove borders (alternative) */
        outline-0         /* Remove outline */
        outline-none      /* Remove outline (alternative) */
        focus:outline-0   /* Remove focus outline */
        focus:outline-none /* Remove focus outline (alternative) */
        focus:ring-0      /* Remove focus ring */
        focus:ring-offset-0 /* Remove ring offset */
        shadow-none       /* Remove any box shadows */
        appearance-none   /* Remove browser styles */
        ${className}      /* Custom styles passed in */
      `.trim()}
      style={{
        outline: 'none',
        border: 'none',
        boxShadow: 'none'
      }}
      placeholder={hasStartedTyping ? "" : placeholder}
      autoFocus={autoFocus}
      readOnly={readOnly}
      onFocus={handleFocus}
      onBlur={handleBlur}
      autoComplete="off"        /* Prevent browser autofill */
      data-lpignore="true"     /* Prevent LastPass autofill */
      data-form-type="other"   /* Prevent password managers */
      {...props}
    />
  );
};

export default Input;