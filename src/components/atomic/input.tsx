'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Input as AntInput, InputProps as AntInputProps, InputRef } from 'antd';
import classNames from 'classnames';
import { useInputState } from '../../hooks/use-input-state';
import type { ChangeEvent, FocusEvent } from 'react';

export type InputVariant = 'default' | 'primary' | 'secondary' | 'outlined' | 'ghost';
export type InputSize = 'small' | 'medium' | 'large';

export interface CustomInputProps extends Omit<AntInputProps, 'size' | 'variant'> {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  helperText?: string;
  customClassName?: string;
  withAnimation?: boolean;
  asTextArea?: boolean;
  rounded?: boolean;
  rows?: number;
  withFloatingLabel?: boolean;
}

const Input = React.forwardRef<InputRef, CustomInputProps>(
  (
    {
      variant = 'default',
      size = 'medium',
      label,
      leftIcon,
      rightIcon,
      isFullWidth = false,
      isDisabled = false,
      isError = false,
      isRequired = false,
      errorMessage = '',
      helperText = '',
      customClassName = '',
      withAnimation = true,
      asTextArea = false,
      rounded = false,
      rows = 3,
      withFloatingLabel = false,
      onChange,
      onFocus,
      onBlur,
      value,
      placeholder,
      ...props
    },
    ref
  ) => {
    // Cast the onChange handler to the compatible type
    const handleInputChange = onChange as unknown as (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    const handleInputFocus = onFocus as unknown as (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    const handleInputBlur = onBlur as unknown as (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

    const { isFocused, hasValue, handleFocus, handleBlur, handleChange } = useInputState(
      value as string,
      handleInputChange,
      handleInputFocus,
      handleInputBlur
    );

    // Size classes
    const sizeClasses = {
      small: 'px-3 !py-1 !text-sm',
      medium: 'px-4 !py-2',
      large: 'px-5 !py-3 !text-lg',
    };

    // Label size classes
    const labelSizeClasses = {
      small: '!text-xs !mb-1',
      medium: '!text-sm !mb-1',
      large: '!text-base !mb-2',
    };

    // Variant classes
    const variantClasses = {
      default: '!bg-white !border !border-gray-300 !focus:border-[var(--color-primary)] !text-[var(--text-primary)]',
      primary: '!bg-white !border !border-[var(--color-primary)] !text-[var(--text-primary)]',
      secondary: '!bg-white !border !border-[var(--color-secondary)] !text-[var(--text-primary)]',
      outlined: '!bg-transparent !border !border-gray-300 !focus:border-[var(--color-primary)] !text-[var(--text-primary)]',
      ghost: '!bg-transparent !border-0 !border-b !border-gray-300 !focus:border-[var(--color-primary)] !text-[var(--text-primary)]',
    };

    // Input container classes
    const inputContainerClasses = classNames(
      'transition-all duration-200 relative',
      {
        'w-full': isFullWidth,
      }
    );

    // Input wrapper classes for the actual input element
    const inputWrapperClasses = classNames(
      'relative flex items-center',
      {
        'mb-1': errorMessage || helperText,
      }
    );

    // Input classes
    const inputClasses = classNames(
      'transition-all duration-200 w-full outline-none',
      sizeClasses[size],
      variantClasses[variant],
      {
        'opacity-70 cursor-not-allowed': isDisabled,
        'border-[var(--color-error)]': isError,
        '!rounded-full': rounded,
        '!rounded-md': !rounded,
        'pl-10': leftIcon, // Add left padding when left icon is present
        'pr-10': rightIcon, // Add right padding when right icon is present
        '!pb-2 !pt-5': withFloatingLabel && (isFocused || hasValue || placeholder),
      },
      customClassName
    );

    // Floating label classes
    const floatingLabelClasses = classNames(
      'transition-all duration-200 absolute pointer-events-none',
      {
        'left-10': leftIcon,
        'left-4': !leftIcon,
        'text-[var(--text-secondary)]': !isError,
        'text-[var(--color-error)]': isError,
        'text-xs translate-y-[-10px]': (isFocused || hasValue || placeholder) && withFloatingLabel,
        'text-base translate-y-0': !(isFocused || hasValue || placeholder) && withFloatingLabel,
      }
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

    // Animation variants
    const inputVariants = {
      focused: { scale: 1.01 },
      blurred: { scale: 1 },
    };

    // Error text animation variants
    const errorTextVariants = {
      initial: { opacity: 0, height: 0, marginTop: 0 },
      animate: { opacity: 1, height: 'auto', marginTop: 4 },
      exit: { opacity: 0, height: 0, marginTop: 0 }
    };

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange({ target: { value: e.target.value } } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const handleTextAreaFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (onFocus) {
            onFocus(e as unknown as React.FocusEvent<HTMLInputElement>);
        }
    };

    const handleTextAreaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (onBlur) {
            onBlur(e as unknown as React.FocusEvent<HTMLInputElement>);
        }
    };
  
// Common props for input
const inputProps = {
    ref,
    disabled: isDisabled,
    className: inputClasses,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    value,
    placeholder: withFloatingLabel && (isFocused || hasValue) ? placeholder : withFloatingLabel ? '' : placeholder,
  };

  // Common props for textarea
  const textAreaProps = {
    ref,
    disabled: isDisabled,
    className: inputClasses,
    onFocus: handleTextAreaFocus,
    onBlur: handleTextAreaBlur,
    onChange: handleTextAreaChange,
    value,
    placeholder: withFloatingLabel && (isFocused || hasValue) ? placeholder : withFloatingLabel ? '' : placeholder,
    rows,
  };

    const InputComponent = asTextArea ? (
        <AntInput.TextArea 
          {...textAreaProps} 
          style={{ 
            paddingLeft: leftIcon ? '40px' : undefined, 
            paddingRight: rightIcon ? '40px' : undefined 
          }} 
        />
    ) : (
        <AntInput 
          {...inputProps} 
          {...props} 
          style={{ 
            paddingLeft: leftIcon ? '40px' : undefined, 
            paddingRight: rightIcon ? '40px' : undefined 
          }}
        />
    );


    const renderInput = () => (
      <div className={inputWrapperClasses}>
        
        
        {InputComponent}
        
        {withFloatingLabel && label && (
          <label className={floatingLabelClasses}>
            {label}
            {isRequired && <span className="text-[var(--color-error)] ml-1">*</span>}
          </label>
        )}
        {leftIcon && (
          <span className="absolute left-3 flex items-center justify-center text-[var(--text-secondary)]">
            <FontAwesomeIcon icon={leftIcon} />
          </span>
        )}
        {rightIcon && (
          <span className="absolute right-3 flex items-center justify-center text-[var(--text-secondary)]">
            <FontAwesomeIcon icon={rightIcon} />
          </span>
        )}
      </div>
    );

    return (
      <div className={inputContainerClasses}>
        {label && !withFloatingLabel && (
          <label className={staticLabelClasses}>
            {label}
            {isRequired && <span className="text-[var(--color-error)] ml-1">*</span>}
          </label>
        )}

        {withAnimation ? (
          <motion.div
            variants={inputVariants}
            animate={isFocused ? 'focused' : 'blurred'}
            transition={{ duration: 0.2 }}
          >
            {renderInput()}
          </motion.div>
        ) : (
          renderInput()
        )}

        <AnimatePresence mode="wait">
          {(isError && errorMessage) && (
            <motion.div 
              key="error"
              className={helperTextClasses}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={errorTextVariants}
              transition={{ duration: 0.2 }}
            >
              {errorMessage}
            </motion.div>
          )}

          {!isError && helperText && (
            <motion.div 
              key="helper"
              className={helperTextClasses}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={errorTextVariants}
              transition={{ duration: 0.2 }}
            >
              {helperText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
