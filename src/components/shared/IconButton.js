import React from 'react';

/**
 * IconButton Component
 * A versatile button component that displays an icon with optional label text.
 * Used throughout the app for toggle actions and interactive controls.
 * 
 * Styling:
 * - Base: Circular shape with padding and flex layout
 * - Dimensions: Fixed size (h-16 w-16)
 * - States: 
 *   - Active: White background with blue text/icon
 *   - Inactive: Transparent background with white text/icon
 *   - Hover: 10% white overlay on inactive state
 * - Transitions: Smooth color transitions for hover states
 * 
 * @param {Function} icon - Lucide icon component to render
 * @param {string} label - Text displayed below icon and used for accessibility
 * @param {boolean} isActive - Controls the active/inactive visual state
 * @param {Function} onClick - Click handler function
 */
const IconButton = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      p-2                    /* Padding around the content */
      rounded-full           /* Circular shape */
      shrink-0              /* Prevent shrinking in flex containers */
      h-16 w-16             /* Fixed dimensions */
      flex flex-col         /* Stack icon and label vertically */
      items-center          /* Center items horizontally */
      justify-center        /* Center items vertically */
      transition-colors     /* Smooth color transitions */
      focus:outline-none    /* Clean focus state */
      ${isActive 
        ? 'bg-white'                      /* Active: White background */
        : 'bg-transparent hover:bg-white/10' /* Inactive: Transparent with hover */
      }
    `}
  >
    <Icon 
      className={`
        w-[20px] h-[20px]                 /* Icon size */
        ${isActive ? 'text-[#0069A4]' : 'text-white'} /* Icon color based on state */
      `}
    />
    <span 
      className={`
        tiny                /* Typography: Smallest text size */
        mt-0.5             /* Small margin top to separate from icon */
        ${isActive 
          ? 'text-[#0069A4] !text-[#0069A4]' /* Active: Blue text (double for emphasis) */
          : 'text-white'                      /* Inactive: White text */
        }
      `}
    >
      {label}
    </span>
  </button>
);

export default IconButton;