import React from 'react';

/**
 * SquareIconButton Component
 * A square-shaped button component used primarily in the percentage controls.
 * Provides a white background with blue icon and hover effects.
 * 
 * Styling:
 * - Base: Square shape with white background
 * - Dimensions: Fixed size (w-16 h-16)
 * - States:
 *   - Default: White background with blue icon
 *   - Hover: 90% white background (slightly transparent)
 *   - Focus: White ring outline
 * - Layout: Centered icon with flex
 * 
 * @param {Function} icon - Icon component to render (usually Plus/Minus)
 * @param {Function} onClick - Click handler function
 * @param {string} aria-label - Accessibility label for the button
 * @param {string} className - Additional CSS classes
 */
const SquareIconButton = ({ 
  icon: Icon, 
  onClick, 
  'aria-label': ariaLabel,
  className = ''
}) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={`
      w-14              /* Fixed width */
      h-16              /* Fixed height */
      flex              /* Flex container */
      items-center      /* Center vertically */
      justify-center    /* Center horizontally */
      bg-white         /* White background */
      transition-colors /* Smooth color transitions */
      focus:outline-none /* Remove default focus outline */
      focus:ring-2      /* Add ring on focus */
      focus:ring-white/30 /* Semi-transparent white ring */
      hover:bg-white/90   /* Slightly transparent on hover */
      ${className}
    `.trim().replace(/\s+/g, ' ')}
  >
    <Icon 
      className="
        w-6 h-6           /* Icon size */
        text-[#0069A4]    /* Blue icon color */
      "
    />
  </button>
);

export default SquareIconButton;