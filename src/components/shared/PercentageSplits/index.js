import React from 'react';
import PercentageControl from '../PercentageControl';

const PercentageSplits = ({ categories, onPercentageChange }) => {
  return (
    <div className="space-y-4">
      {categories.map(category => (
        <PercentageControl
          key={category.id}
          value={category.percentage}
          onChange={(value) => onPercentageChange(category.id, value)}
          label={category.id}
        />
      ))}
    </div>
  );
};

export default PercentageSplits;