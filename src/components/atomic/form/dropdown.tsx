'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { Select, SelectProps } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { DefaultOptionType } from 'antd/es/select';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

export type DropdownVariant = 'default' | 'primary' | 'secondary' | 'outlined' | 'ghost';
export type DropdownSize = 'small' | 'medium' | 'large';

export interface DropdownProps extends Omit<SelectProps<never>, 'size' | 'variant'> {
  label?: string;
  size?: DropdownSize;
  variant?: DropdownVariant;
  options: { label: string | React.ReactNode; value: string | number; icon?: IconDefinition; disabled?: boolean }[];
  isFullWidth?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  helperText?: string;
  customClassName?: string;
  withAnimation?: boolean;
  rounded?: boolean;
  leftIcon?: IconDefinition;
  withBadges?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  size = 'medium',
  variant = 'default',
  options = [],
  isFullWidth = false,
  isError = false,
  isDisabled = false,
  isRequired = false,
  errorMessage = '',
  helperText = '',
  customClassName = '',
  withAnimation = true,
  rounded = false,
  leftIcon,
  withBadges = false,
  placeholder = 'Select an option',
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Size mappings for Ant Design with proper typing
  const antSizeMap: Record<DropdownSize, SizeType> = {
    small: 'small',
    medium: 'middle',
    large: 'large',
  };

  // Size classes for option text - applied in renderOption function
  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  // Label size classes
  const labelSizeClasses = {
    small: 'text-xs mb-1',
    medium: 'text-sm mb-1',
    large: 'text-base mb-2',
  };

  // Variant classes
  const variantClasses = {
    default: 'border-gray-300 hover:border-[var(--color-primary)]',
    primary: 'border-[var(--color-primary)] hover:border-[var(--color-primary-dark)]',
    secondary: 'border-[var(--color-secondary)] hover:border-[var(--color-secondary-dark)]',
    outlined: 'border-gray-300 bg-transparent hover:border-[var(--color-primary)]',
    ghost: 'border-b border-gray-300 bg-transparent hover:border-[var(--color-primary)] rounded-none',
  };

  // Container classes
  const containerClasses = classNames(
    'transition-all duration-200 relative',
    {
      'w-full': isFullWidth,
    }
  );

  // Custom select classes to apply through className prop to Ant Design component
  const selectClasses = classNames(
    'transition-all duration-200',
    variantClasses[variant],
    {
      'w-full': isFullWidth,
      'opacity-70': isDisabled,
      'border-[var(--color-error)]': isError,
      'rounded-full': rounded && variant !== 'ghost',
      'rounded-md': !rounded && variant !== 'ghost',
    },
    customClassName,
    className
  );

  // Static label classes
  const staticLabelClasses = classNames(
    labelSizeClasses[size],
    {
      'text-[var(--text-primary)]': !isError,
      'text-[var(--color-error)]': isError,
    }
  );

  // Helper text classes
  const helperTextClasses = classNames(
    'text-xs mt-1',
    {
      'text-[var(--text-secondary)]': !isError && helperText,
      'text-[var(--color-error)]': isError,
    }
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // Animation variants
  const dropdownVariants = {
    focused: { scale: 1.01 },
    blurred: { scale: 1 },
  };

  // Custom dropdown render with icon and badges
  const renderOption = (option: DefaultOptionType) => {
    const optionWithIcon = options.find(opt => opt.value === option.value);
    
    return (
      <div className="flex items-center justify-between w-full py-1">
        <div className="flex items-center">
          {optionWithIcon?.icon && (
            <FontAwesomeIcon 
              icon={optionWithIcon.icon} 
              className="mr-2 text-[var(--text-secondary)]" 
            />
          )}
          <span className={sizeClasses[size]}>{option.label}</span>
        </div>
        {withBadges && props.value === option.value && (
          <FontAwesomeIcon icon={faCheck} className="text-[var(--color-primary)]" />
        )}
      </div>
    );
  };

  const dropdownContent = (
    <div className={containerClasses}>
      {label && (
        <label className={staticLabelClasses}>
          {label}
          {isRequired && <span className="text-[var(--color-error)] ml-1">*</span>}
        </label>
      )}
      
      <Select
        className={selectClasses}
        placeholder={
          leftIcon ? (
            <div className="flex items-center">
              <FontAwesomeIcon 
                icon={leftIcon} 
                className="mr-2 text-[var(--text-secondary)]" 
              />
              {placeholder}
            </div>
          ) : placeholder
        }
        size={antSizeMap[size]}
        disabled={isDisabled}
        options={options}
        status={isError ? 'error' : undefined}
        variant={undefined}
        onFocus={handleFocus}
        onBlur={handleBlur}
        optionRender={renderOption}
        suffixIcon={
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className={`transition-transform duration-300 ${isFocused ? 'rotate-180' : ''}`} 
          />
        }
        popupClassName="custom-dropdown-popup"
        {...props}
      />
      
      {isError && errorMessage && (
        <div className={helperTextClasses}>{errorMessage}</div>
      )}
      
      {!isError && helperText && (
        <div className={helperTextClasses}>{helperText}</div>
      )}
    </div>
  );

  // Optional animation wrapper
  return withAnimation ? (
    <motion.div
      variants={dropdownVariants}
      animate={isFocused ? 'focused' : 'blurred'}
      transition={{ duration: 0.2 }}
    >
      {dropdownContent}
    </motion.div>
  ) : dropdownContent;
};

// Add custom styles for Ant Design dropdown
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .custom-dropdown-popup .ant-select-item-option-selected {
      background-color: rgba(var(--color-primary-rgb), 0.1) !important;
    }
    
    .ant-select-focused .ant-select-selector {
      border-color: var(--color-primary) !important;
      box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2) !important;
    }
  `;
  document.head.appendChild(style);
}

export default Dropdown;
