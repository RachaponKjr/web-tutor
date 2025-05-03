'use client';

import React from 'react';

type TimeInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function TimeInput({
  label,
  name,
  value,
  onChange,
  required = false,
}: TimeInputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="time"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}
