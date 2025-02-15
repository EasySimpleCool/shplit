import React from 'react';

const Section = ({ children, bg }) => (
  <div 
    style={{ backgroundColor: bg }}
    className="flex flex-col items-center w-full px-6 py-10"
  >
    {children}
  </div>
);

export default Section;
