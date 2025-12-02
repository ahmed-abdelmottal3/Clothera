import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="mb-5">
        {label && (
          <label 
            htmlFor={props.id}
            className="block mb-2 text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 
            bg-surface 
            border rounded-lg
            text-base text-text-primary
            placeholder:text-text-light
            transition-all duration-150
            outline-none
            ${error 
              ? 'border-error focus:border-error focus:ring-4 focus:ring-error-light' 
              : 'border-border focus:border-primary focus:ring-4 focus:ring-accent'
            }
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="block mt-2 text-sm text-error">
            {error}
          </span>
        )}
        {helperText && !error && (
          <span className="block mt-2 text-sm text-text-secondary">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

