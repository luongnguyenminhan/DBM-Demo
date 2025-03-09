'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Button as AntButton } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button';
import classNames from 'classnames';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
export type ButtonSize = 'small' | 'medium' | 'large';

// Define ButtonProps, omitting 'size' and 'variant' from AntButtonProps
export interface ButtonProps extends Omit<AntButtonProps, 'size' | 'variant' | 'type'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  isFullWidth?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  customClassName?: string;
  withRipple?: boolean;
  rounded?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  type?: 'link' | 'text' | 'primary' | 'default' | 'dashed'; // Ant Design button type
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  isFullWidth = false,
  isLoading = false,
  isDisabled = false,
  children,
  customClassName = '',
  withRipple = false,
  rounded = false,
  onClick,
  ...props
}) => {
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white',
    secondary: 'bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white',
    outline:
      'bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white',
    ghost: 'bg-transparent text-[var(--color-primary)] hover:bg-[rgba(253,43,123,0.1)]',
    gradient: 'btn-gradient',
  };

  const buttonClasses = classNames(
    'transition-all duration-200 flex items-center justify-center gap-2 font-medium',
    sizeClasses[size],
    variantClasses[variant],
    {
      'w-full': isFullWidth,
      'opacity-70 cursor-not-allowed': isDisabled,
      'rounded-full': rounded,
      'rounded-md': !rounded,
    },
    customClassName
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled || isLoading) return;

    if (withRipple) {
      const button = e.currentTarget;
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
      circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
      circle.classList.add('ripple');

      const ripple = button.querySelector('.ripple');
      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 600);
    }

    onClick?.(e);
  };

  const buttonVariants = {
    hover: { scale: withRipple ? 1.02 : 1 },
    tap: { scale: withRipple ? 0.98 : 1 },
  };

  const ButtonComponent = withRipple ? (
    <motion.button
      className={buttonClasses}
      onClick={handleClick}
      disabled={isDisabled || isLoading}
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      type={props.htmlType || 'button'}
    >
      {isLoading && (
        <span className="animate-spin mr-2">
          <FontAwesomeIcon icon={faSpinner} />
        </span>
      )}
      {leftIcon && !isLoading && <FontAwesomeIcon icon={leftIcon} />}
      {children}
      {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
    </motion.button>
  ) : (
    <button
      {...props}
      className={buttonClasses}
      onClick={handleClick}
      disabled={isDisabled || isLoading}
      type={props.htmlType || 'button'}
    >
      {isLoading && (
        <span className="animate-spin mr-2">
          <FontAwesomeIcon icon={faSpinner} />
        </span>
      )}
      {leftIcon && !isLoading && <FontAwesomeIcon icon={leftIcon} />}
      {children}
      {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
    </button>
  );

  // Optional: Use AntButton for additional functionality
  const useAntButton = false; // Set to true if you want to use AntButton's features

  if (useAntButton) {
    return (
      <AntButton
        type={props.type || 'default'}
        className={buttonClasses}
        onClick={handleClick}
        disabled={isDisabled}
        loading={isLoading}
        size={size === 'small' ? 'small' : size === 'large' ? 'large' : 'middle'}
        htmlType={props.htmlType}
        {...props}
      >
        {leftIcon && !isLoading && <FontAwesomeIcon icon={leftIcon} />}
        {children}
        {rightIcon && <FontAwesomeIcon icon={rightIcon} />}
      </AntButton>
    );
  }

  return ButtonComponent;
};

// Add ripple style for the button
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    .ripple {
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 600ms linear;
      background-color: rgba(255, 255, 255, 0.7);
    }
  `;
  document.head.appendChild(style);
}

export default Button;