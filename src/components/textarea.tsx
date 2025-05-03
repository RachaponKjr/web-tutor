import React from 'react';

interface TextareaProps {
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    className?: string;
    error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
    label,
    name,
    value,
    onChange,
    placeholder = '',
    rows = 4,
    className = '',
    error,
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default Textarea;
