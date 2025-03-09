'use client';

import React from 'react';
import classNames from 'classnames';
import { Checkbox as AntCheckbox } from 'antd';
import type { CheckboxProps as AntCheckboxProps, CheckboxRef } from 'antd';

export interface CheckboxProps extends Omit<AntCheckboxProps, 'size'> {
  label?: string;
  size?: 'small' | 'medium' | 'large';
  isError?: boolean;
  errorMessage?: string;
  helperText?: string;
  customClassName?: string;
}

const Checkbox = React.forwardRef<CheckboxRef, CheckboxProps>(
  ({ 
    label,
    size = 'medium',
    isError = false,
    errorMessage = '',
    helperText = '',
    customClassName = '',
    className,
    ...props
  }, ref) => {
    const checkboxClasses = classNames(
      'transition-all duration-200',
      {
        'scale-90': size === 'small',
        'scale-100': size === 'medium',
        'scale-110': size === 'large',
      },
      customClassName,
      className
    );

    const labelClasses = classNames(
      'ml-2',
      {
        'text-sm': size === 'small',
        'text-base': size === 'medium',
        'text-lg': size === 'large',
        'text-[var(--color-error)]': isError,
      }
    );

    const helperTextClasses = classNames(
      'text-xs mt-1',
      {
        'text-[var(--text-secondary)]': !isError && helperText,
        'text-[var(--color-error)]': isError,
      }
    );

    return (
      <div className="flex flex-col">
        <div className="flex items-center">
          <AntCheckbox
            ref={ref}
            className={checkboxClasses}
            {...props}
          />
          {label && (
            <span className={labelClasses}>{label}</span>
          )}
        </div>
        {isError && errorMessage && (
          <div className={helperTextClasses}>{errorMessage}</div>
        )}
        {!isError && helperText && (
          <div className={helperTextClasses}>{helperText}</div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;