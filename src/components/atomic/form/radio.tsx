'use client';

import React from 'react';
import classNames from 'classnames';
import { Radio as AntRadio } from 'antd';
import type { RadioProps as AntRadioProps, RadioGroupProps as AntRadioGroupProps, CheckboxRef } from 'antd';
import { motion } from 'framer-motion';


export interface RadioProps extends Omit<AntRadioProps, 'size'> {
  label?: string;
  size?: 'small' | 'medium' | 'large';
  isError?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  helperText?: string;
  customClassName?: string;
  withAnimation?: boolean;
  variant?: 'default' | 'primary' | 'secondary';
}

export interface RadioGroupProps extends Omit<AntRadioGroupProps, 'size'> {
  options: Array<{ label: string; value: string | number; disabled?: boolean }>;
  size?: 'small' | 'medium' | 'large';
  isError?: boolean;
  isRequired?: boolean;
  label?: string;
  errorMessage?: string;
  helperText?: string;
  customClassName?: string;
  withAnimation?: boolean;
  variant?: 'default' | 'primary' | 'secondary';
  direction?: 'horizontal' | 'vertical';
}

const Radio = React.forwardRef<CheckboxRef, RadioProps>(
  (
    {
      label,
      size = 'medium',
      isError = false,
      isRequired = false,
      errorMessage = '',
      helperText = '',
      customClassName = '',
      withAnimation = true,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const radioClasses = classNames(
      'transition-all duration-200',
      {
        'scale-90': size === 'small',
        'scale-100': size === 'medium',
        'scale-110': size === 'large',
        '[&_.ant-radio-inner]:border-[var(--color-primary)]': variant === 'primary',
        '[&_.ant-radio-inner]:border-[var(--color-secondary)]': variant === 'secondary',
        '[&_.ant-radio-inner]:border-[var(--color-error)]': isError,
        'opacity-50 cursor-not-allowed': props.disabled,
      },
      customClassName,
      className
    );

    const labelClasses = classNames(
      'ml-2 select-none',
      {
        'text-sm': size === 'small',
        'text-base': size === 'medium',
        'text-lg': size === 'large',
        'text-[var(--color-error)]': isError,
        'cursor-not-allowed': props.disabled,
      }
    );

    const helperTextClasses = classNames(
      'text-xs mt-1',
      {
        'text-[var(--text-secondary)]': !isError && helperText,
        'text-[var(--color-error)]': isError,
      }
    );

    const radioContent = (
      <div className="flex flex-col">
        <div className="flex items-center">
          <AntRadio ref={ref} className={radioClasses} {...props} />
          {label && (
            <span className={labelClasses}>
              {label}
              {isRequired && <span className="text-[var(--color-error)] ml-1">*</span>}
            </span>
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

    return withAnimation ? (
      <motion.div
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {radioContent}
      </motion.div>
    ) : radioContent;
  }
);

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  size = 'medium',
  isError = false,
  isRequired = false,
  label,
  errorMessage = '',
  helperText = '',
  customClassName = '',
  withAnimation = true,
  variant = 'default',
  direction = 'vertical',
  className,
  ...props
}) => {
  const groupClasses = classNames(
    'flex',
    {
      'flex-col gap-2': direction === 'vertical',
      'flex-row gap-4': direction === 'horizontal',
    },
    customClassName,
    className
  );

  const labelClasses = classNames(
    'block mb-2',
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

  const groupContent = (
    <div className="flex flex-col">
      {label && (
        <label className={labelClasses}>
          {label}
          {isRequired && <span className="text-[var(--color-error)] ml-1">*</span>}
        </label>
      )}
      <AntRadio.Group className={groupClasses} {...props}>
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            size={size}
            isError={isError}
            variant={variant}
            disabled={option.disabled}
            withAnimation={false}
          />
        ))}
      </AntRadio.Group>
      {isError && errorMessage && (
        <div className={helperTextClasses}>{errorMessage}</div>
      )}
      {!isError && helperText && (
        <div className={helperTextClasses}>{helperText}</div>
      )}
    </div>
  );

  return withAnimation ? (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {groupContent}
    </motion.div>
  ) : groupContent;
};

Radio.displayName = 'Radio';
RadioGroup.displayName = 'RadioGroup';

export default Radio;