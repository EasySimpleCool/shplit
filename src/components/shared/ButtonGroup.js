import React from 'react';
import { Percent, X, DollarSign } from 'lucide-react';
import Stack from '../layout/Stack';

const ButtonGroup = ({ onAddSplit, onRemoveSplit, onAddFixed }) => (
  <div className="flex gap-2">
    <button
      onClick={onAddSplit}
      className="flex-1 bg-[#0069A4] p-2 rounded-lg hover:bg-[#005a8f] flex flex-wrap items-center justify-center gap-2 text-white"
    >
      <span>Add Shplit</span>
      <Percent className="w-4 h-4 text-white" />
    </button>
    <button
      onClick={onRemoveSplit}
      className="flex-1 bg-[#0069A4] p-2 rounded-lg hover:bg-[#005a8f] flex flex-wrap items-center justify-center gap-2 text-white"
    >
      <span>Remove Last</span>
      <X className="w-4 h-4 text-white" />
    </button>
    <button
      onClick={onAddFixed}
      className="flex-1 bg-[#0069A4] p-2 rounded-lg hover:bg-[#005a8f] flex flex-wrap items-center justify-center gap-2 text-white"
    >
      <span>Add Fixed</span>
      <DollarSign className="w-4 h-4 text-white" />
    </button>
  </div>
);

export default ButtonGroup;