import React from 'react';
import { Plus, X } from 'lucide-react';

const ButtonGroup = ({ onAddSplit, onRemoveSplit }) => (
  <div className="flex gap-2">
    <button
      onClick={onAddSplit}
      className="flex-1 bg-[#0069A4] p-2 rounded-lg hover:bg-[#005a8f] flex flex-wrap items-center justify-center gap-2 text-white"
    >
      <span>Add Item</span>
      <Plus className="w-4 h-4 text-white" />
    </button>
    <button
      onClick={onRemoveSplit}
      className="flex-1 bg-[#0069A4] p-2 rounded-lg hover:bg-[#005a8f] flex flex-wrap items-center justify-center gap-2 text-white"
    >
      <span>Remove Item</span>
      <X className="w-4 h-4 text-white" />
    </button>
  </div>
);

export default ButtonGroup;