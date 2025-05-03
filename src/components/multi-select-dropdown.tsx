// components/MultiSelectDropdown.tsx
'use client';

import React, { useState } from 'react';

interface Option {
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="relative w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <button
        type="button"
        className="w-full border rounded-md px-3 py-2 text-sm text-left mt-1 bg-white"
        onClick={() => setOpen(!open)}
      >
        {selected.length > 0
          ? options
              .filter((opt) => selected.includes(opt.value))
              .map((opt) => opt.label)
              .join(', ')
          : 'เลือก...'}
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full border rounded-md bg-white shadow-md max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <label key={opt.value} className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => toggleOption(opt.value)}
                className="mr-2"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
