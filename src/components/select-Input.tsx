// components/SelectInput.tsx
import React from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectInputProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  value,
  onChange,
  name,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="" disabled>-- กรุณาเลือก --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
