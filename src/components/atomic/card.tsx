'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type CardVariant = 'default' | 'primary' | 'secondary' | 'outlined' | 'ghost';
export type CardSize = 'small' | 'medium' | 'large';
export type CardAlignment = 'left' | 'center' | 'right';

export interface CardProps {
  children: ReactNode;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  footer?: string | ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  isFullWidth?: boolean;
  isDisabled?: boolean;
  customClassName?: string;
  withAnimation?: boolean;
  withHover?: boolean;
  withShadow?: boolean;
  shadowSize?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  roundedSize?: 'sm' | 'md' | 'lg' | 'full';
  headerIcon?: IconDefinition;
  headerAction?: ReactNode;
  footerAction?: ReactNode;
  alignment?: CardAlignment;
  onClick?: () => void;
  withBorder?: boolean;
  withGradient?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: string;
  className?: string;
  id?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  variant = 'default',
  size = 'medium',
  isFullWidth = false,
  isDisabled = false,
  customClassName = '',
  withAnimation = false,
  withHover = false,
  withShadow = true,
  shadowSize = 'md',
  rounded = true,
  roundedSize = 'md',
  headerIcon,
  headerAction,
  footerAction,
  alignment = 'left',
  onClick,
  withBorder = true,
  withGradient = false,
  padding = 'md',
  backgroundColor,
  className,
  id,
}) => {
  // Size classes
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-white text-[var(--text-primary)]',
    primary: 'bg-[var(--color-primary-light)] text-[var(--text-on-primary)]',
    secondary: 'bg-[var(--color-secondary-light)] text-[var(--text-on-secondary)]',
    outlined: 'bg-transparent text-[var(--text-primary)]',
    ghost: 'bg-transparent text-[var(--text-primary)]',
  };

  // Border classes
  const borderClasses = {
    default: withBorder ? 'border border-gray-200' : '',
    primary: withBorder ? 'border border-[var(--color-primary)]' : '',
    secondary: withBorder ? 'border border-[var(--color-secondary)]' : '',
    outlined: withBorder ? 'border border-gray-200' : '',
    ghost: '',
  };

  // Shadow classes
  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  // Rounded corner classes
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-xl',
  };

  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  // Title size classes
  const titleSizeClasses = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-xl',
  };

  // Alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Card container classes
  const cardClasses = classNames(
    'transition-all duration-200 flex flex-col overflow-hidden',
    sizeClasses[size],
    variantClasses[variant],
    borderClasses[variant],
    {
      'w-full': isFullWidth,
      'opacity-70 cursor-not-allowed': isDisabled,
      'cursor-pointer': onClick && !isDisabled,
      'hover:shadow-lg hover:-translate-y-1 transition-transform duration-300': withHover && !isDisabled,
      [shadowClasses[shadowSize]]: withShadow,
      [roundedClasses[roundedSize]]: rounded,
      [alignmentClasses[alignment]]: true,
      'bg-gradient-primary': withGradient,
    },
    paddingClasses[padding],
    customClassName,
    className
  );

  // Card header classes
  const headerClasses = classNames(
    'flex items-center justify-between mb-3',
    {
      'flex-col gap-1': alignment === 'center',
      'flex-row': alignment !== 'center',
    }
  );

  // Card title classes
  const titleClasses = classNames(
    'font-semibold',
    titleSizeClasses[size]
  );

  // Card subtitle classes
  const subtitleClasses = classNames(
    'text-[var(--text-secondary)]',
    {
      'text-xs': size === 'small',
      'text-sm': size === 'medium',
      'text-base': size === 'large',
    }
  );

  // Card footer classes
  const footerClasses = classNames(
    'flex items-center justify-between mt-3 pt-3',
    {
      'border-t border-gray-200': variant !== 'ghost',
    }
  );

  // Content styles for custom background
  const contentStyle = backgroundColor ? { backgroundColor } : {};

  // Animation variants
  const cardVariants = {
    hover: { 
      scale: 1.01,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.99,
      transition: { duration: 0.1 }
    },
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const renderHeader = () => {
    if (!title && !subtitle && !headerIcon && !headerAction) return null;
    
    return (
      <div className={headerClasses}>
        <div className="flex items-center gap-2">
          {headerIcon && (
            <FontAwesomeIcon
              icon={headerIcon}
              className={classNames({
                'text-[var(--color-primary)]': variant === 'default' || variant === 'outlined' || variant === 'ghost',
              })}
            />
          )}
          <div>
            {title && <div className={titleClasses}>{title}</div>}
            {subtitle && <div className={subtitleClasses}>{subtitle}</div>}
          </div>
        </div>
        {headerAction && <div className="ml-auto">{headerAction}</div>}
      </div>
    );
  };

  const renderFooter = () => {
    if (!footer && !footerAction) return null;
    
    return (
      <div className={footerClasses}>
        <div>{footer}</div>
        {footerAction && <div className="ml-auto">{footerAction}</div>}
      </div>
    );
  };

  const cardContent = (
    <div 
      style={contentStyle}
      className={cardClasses} 
      onClick={handleClick}
      id={id}
    >
      {renderHeader()}
      <div className="flex-1">{children}</div>
      {renderFooter()}
    </div>
  );

  // Optional animation wrapper
  if (withAnimation) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        whileHover={withHover && !isDisabled ? "hover" : undefined}
        whileTap={onClick && !isDisabled ? "tap" : undefined}
        variants={cardVariants}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default Card;
