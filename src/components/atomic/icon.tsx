'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
export type IconVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export interface IconProps {
  icon: IconDefinition;
  size?: IconSize;
  variant?: IconVariant;
  customSize?: string;
  className?: string;
  withAnimation?: boolean;
  animationVariant?: 'pulse' | 'spin' | 'bounce' | 'shake';
  onClick?: () => void;
  isButton?: boolean;
  isDisabled?: boolean;
  tooltip?: string;
  customColor?: string;
  fixedWidth?: boolean;
  rotate?: number;
  flip?: 'horizontal' | 'vertical' | 'both';
}

const Icon: React.FC<IconProps> = ({
  icon,
  size = 'md',
  variant = 'default',
  customSize,
  className,
  withAnimation = false,
  animationVariant,
  onClick,
  isButton = false,
  isDisabled = false,
  tooltip,
  customColor,
  fixedWidth = false,
  rotate,
  flip,
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10',
    custom: customSize || 'w-5 h-5',
  };

  // Variant classes (colors)
  const variantClasses = {
    default: 'text-[var(--text-primary)]',
    primary: 'text-[var(--color-primary)]',
    secondary: 'text-[var(--color-secondary)]',
    success: 'text-[var(--color-success)]',
    warning: 'text-[var(--color-warning)]',
    error: 'text-[var(--color-error)]',
    info: 'text-[var(--color-info)]',
  };

  // Animation classes
  const animationClasses = {
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
    shake: 'animate-shake', // You may need to define this in tailwind.config.js
  };

  // Container classes
  const containerClasses = classNames(
    sizeClasses[size],
    variantClasses[variant],
    {
      'cursor-pointer hover:opacity-80 transition-opacity': isButton && !isDisabled,
      'opacity-50 cursor-not-allowed': isDisabled,
      'inline-flex items-center justify-center': true,
      [animationClasses[animationVariant || 'pulse']]: animationVariant,
    },
    className
  );

  // Custom styles
  const customStyles: React.CSSProperties = {
    color: customColor,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
  };

  if (flip) {
    switch (flip) {
      case 'horizontal':
        customStyles.transform = `${customStyles.transform || ''} scaleX(-1)`;
        break;
      case 'vertical':
        customStyles.transform = `${customStyles.transform || ''} scaleY(-1)`;
        break;
      case 'both':
        customStyles.transform = `${customStyles.transform || ''} scale(-1)`;
        break;
    }
  }

  // Animation variants for framer-motion
  const iconVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const iconContent = (
    <div
      className={containerClasses}
      onClick={handleClick}
      title={tooltip}
      style={customStyles}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !isDisabled ? 0 : undefined}
    >
      <FontAwesomeIcon
        icon={icon}
        fixedWidth={fixedWidth}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );

  // Optional animation wrapper
  return withAnimation && isButton && !isDisabled ? (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      variants={iconVariants}
      transition={{ duration: 0.2 }}
    >
      {iconContent}
    </motion.div>
  ) : (
    iconContent
  );
};

// Define a helper component for icon buttons
export const IconButton: React.FC<
  Omit<IconProps, 'isButton'> & {
    withRipple?: boolean;
    rounded?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    withBackground?: boolean;
    backgroundVariant?: IconVariant;
    withBorder?: boolean;
    borderVariant?: IconVariant;
  }
> = ({
  withRipple = true,
  rounded = true,
  padding = 'md',
  withBackground = false,
  backgroundVariant = 'default',
  withBorder = false,
  borderVariant = 'default',
  ...props
}) => {
  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3',
  };

  // Background classes
  const backgroundClasses = {
    default: 'bg-gray-100 hover:bg-gray-200',
    primary: 'bg-[var(--color-primary-light)] hover:bg-[var(--color-primary)]',
    secondary: 'bg-[var(--color-secondary-light)] hover:bg-[var(--color-secondary)]',
    success: 'bg-green-100 hover:bg-green-200',
    warning: 'bg-yellow-100 hover:bg-yellow-200',
    error: 'bg-red-100 hover:bg-red-200',
    info: 'bg-blue-100 hover:bg-blue-200',
  };

  // Border classes
  const borderClasses = {
    default: 'border border-gray-300',
    primary: 'border border-[var(--color-primary)]',
    secondary: 'border border-[var(--color-secondary)]',
    success: 'border border-[var(--color-success)]',
    warning: 'border border-[var(--color-warning)]',
    error: 'border border-[var(--color-error)]',
    info: 'border border-[var(--color-info)]',
  };

  const buttonClasses = classNames(
    'transition-all duration-200 inline-flex items-center justify-center',
    paddingClasses[padding],
    {
      'rounded-full': rounded,
      'rounded-md': !rounded,
      [backgroundClasses[backgroundVariant]]: withBackground,
      [borderClasses[borderVariant]]: withBorder,
    }
  );

  // Handler for ripple effect
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.isDisabled || !withRipple) return;
    
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
    
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div className={buttonClasses} onClick={handleClick}>
      <Icon {...props} isButton={true} />
    </div>
  );
};

export default Icon;
