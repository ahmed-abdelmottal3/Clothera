import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const baseClasses = `
    font-medium
    rounded-lg
    transition-all duration-150
    inline-flex items-center justify-center gap-2
    disabled:opacity-60 disabled:cursor-not-allowed
  `;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'w-full px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: `
      bg-primary text-white
      hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-md
      active:translate-y-0
    `,
    secondary: `
      bg-secondary text-white
      hover:bg-secondary-light hover:-translate-y-0.5 hover:shadow-md
      active:translate-y-0
    `,
    outline: `
      bg-transparent text-primary
      border border-primary
      hover:bg-accent hover:border-primary-light
    `,
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

Button.displayName = 'Button';

