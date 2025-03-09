'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

export type LabelVariant = 'default' | 'primary' | 'secondary' | 'error';
export type LabelSize = 'small' | 'medium' | 'large';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  size?: LabelSize;
  variant?: LabelVariant;
  isRequired?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  withAnimation?: boolean;
  customClassName?: string;
  tooltip?: string;
  badge?: string | number;
  badgeVariant?: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning';
}

const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  size = 'medium',
  variant = 'default',
  isRequired = false,
  isDisabled = false,
  isError = false,
  withAnimation = false,
  customClassName = '',
  tooltip,
  badge,
  badgeVariant = 'default',
  className,
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  // Variant classes
  const variantClasses = {
    default: 'text-[var(--text-primary)]',
    primary: 'text-[var(--color-primary)]',
    secondary: 'text-[var(--color-secondary)]',
    error: 'text-[var(--color-error)]',
  };

  // Badge variant classes
  const badgeVariantClasses = {
    default: 'bg-gray-200 text-gray-800',
    primary: 'bg-[var(--color-primary)] text-white',
    secondary: 'bg-[var(--color-secondary)] text-white',
    error: 'bg-[var(--color-error)] text-white',
    success: 'bg-[var(--color-success)] text-white',
    warning: 'bg-[var(--color-warning)] text-white',
  };

  // Label classes
  const labelClasses = classNames(
    'flex items-center gap-1.5 font-medium select-none',
    sizeClasses[size],
    variantClasses[isError ? 'error' : variant],
    {
      'opacity-50 cursor-not-allowed': isDisabled,
      'mb-1': true,
    },
    customClassName,
    className
  );

  // Badge classes
  const badgeClasses = classNames(
    'inline-flex items-center justify-center rounded-full px-1.5 min-w-[1.2rem] h-[1.2rem] text-xs font-medium ml-1',
    badgeVariantClasses[badgeVariant]
  );

  // Animation variants
  const labelVariants = {
    hover: { x: 2 },
    tap: { x: 0 },
  };

  const labelContent = (
    <label
      htmlFor={htmlFor}
      className={labelClasses}
      {...props}
    >
      <span className="flex items-center gap-1">
        {children}
        {isRequired && <span className="text-[var(--color-error)] ml-0.5">*</span>}
        {badge && <span className={badgeClasses}>{badge}</span>}
      </span>
      {tooltip && (
        <span 
          className="inline-flex cursor-help text-gray-400 hover:text-gray-600 transition-colors"
          title={tooltip}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="w-4 h-4"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-1.5 2.5a.75.75 0 11.75-.75.75.75 0 01-.75.75zm5.625 0a.75.75 0 10-1.5 0c0 .414-.168.75-.375.75S10 10.164 10 9.75a.75.75 0 00-1.5 0c0 1.242 1.008 2.25 2.25 2.25 1.243 0 2.25-1.008 2.25-2.25 0-1.242-1.007-2.25-2.25-2.25-.168 0-.33.015-.488.045a.75.75 0 00.488-.045z" 
              clipRule="evenodd" 
            />
          </svg>
        </span>
      )}
    </label>
  );

  return withAnimation ? (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      variants={labelVariants}
      transition={{ duration: 0.2 }}
    >
      {labelContent}
    </motion.div>
  ) : labelContent;
};

export default Label;
