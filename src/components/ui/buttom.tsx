// components/Button.tsx
import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const baseStyle =
    'px-4 py-2 rounded-md font-medium text-sm transition-all duration-150';
  const variantStyle = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyle, variantStyle[variant], className, {
        'opacity-50 cursor-not-allowed': disabled,
      })}
    >
      {label}
    </button>
  );
};

export default Button;
