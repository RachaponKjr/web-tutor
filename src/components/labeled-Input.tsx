// components/LabeledInput.tsx
import React from 'react';

interface LabeledInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  required?: boolean;
  className?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
  type = 'text',
  name,
  required = false,
  className
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border bg-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default LabeledInput;
