'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import Typography from './typo';

export type ProgressBarVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'gradient';

export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressBarShape = 'rounded' | 'square';

export interface ProgressBarProps {
  value: number; // 0-100
  maxValue?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  shape?: ProgressBarShape;
  showValue?: boolean;
  valuePosition?: 'inside' | 'right' | 'top' | 'bottom';
  valueSuffix?: string;
  valuePrefix?: string;
  customValueFormat?: (value: number, maxValue: number) => string | React.ReactNode;
  customValueClass?: string;
  customTrackClass?: string;
  customFillerClass?: string;
  withAnimation?: boolean;
  animationDuration?: number;
  withTransition?: boolean;
  withGlowEffect?: boolean;
  withStripes?: boolean;
  striped?: boolean;
  animated?: boolean;
  indeterminate?: boolean;
  label?: string | React.ReactNode;
  labelPosition?: 'top' | 'bottom';
  hideValueOnSmall?: boolean;
  className?: string;
  stripeAnimationDuration?: number;
  onChange?: (value: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  maxValue = 100,
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  showValue = false,
  valuePosition = 'right',
  valueSuffix = '%',
  valuePrefix = '',
  customValueFormat,
  customValueClass = '',
  customTrackClass = '',
  customFillerClass = '',
  withAnimation = true,
  animationDuration = 0.8,
  withTransition = true,
  withGlowEffect = false,
  withStripes = false,
  striped = false,
  animated = false,
  indeterminate = false,
  label,
  labelPosition = 'top',
  hideValueOnSmall = false,
  className,
  stripeAnimationDuration = 2,
}) => {
  // Ensure value is between 0 and maxValue
  const normalizedValue = Math.min(Math.max(0, value), maxValue);
  const percentage = (normalizedValue / maxValue) * 100;

  // Size classes for the progress bar height
  const sizeClasses = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  // Shape classes
  const shapeClasses = {
    rounded: 'rounded-full',
    square: 'rounded-none',
  };

  // Variant classes for colors
  const variantClasses = {
    default: 'bg-gray-200',
    primary: 'bg-[var(--color-primary-light)]',
    secondary: 'bg-[var(--color-secondary-light)]',
    success: 'bg-green-100',
    warning: 'bg-yellow-100',
    error: 'bg-red-100',
    info: 'bg-blue-100',
    gradient: 'bg-gray-200',
  };

  const fillerVariantClasses = {
    default: 'bg-gray-500',
    primary: 'bg-[var(--color-primary)]',
    secondary: 'bg-[var(--color-secondary)]',
    success: 'bg-green-500',
    warning: 'bg-yellow-400',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    gradient: 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]',
  };

  // Container classes
  const containerClasses = classNames(
    'w-full',
    className
  );

  // Track classes
  const trackClasses = classNames(
    'w-full',
    sizeClasses[size],
    shapeClasses[shape],
    variantClasses[variant],
    customTrackClass
  );

  // Filler classes
  const fillerClasses = classNames(
    'h-full',
    shapeClasses[shape],
    fillerVariantClasses[variant],
    {
      'transition-all duration-300': withTransition && !indeterminate,
      'shadow glow': withGlowEffect,
      'progress-bar-striped': striped || withStripes,
      'progress-bar-animated': animated || (withStripes && animated),
    },
    customFillerClass
  );

  // Value text classes
  const valueClasses = classNames(
    'font-semibold',
    {
      'text-xs': size === 'xs' || size === 'sm',
      'text-sm': size === 'md',
      'text-base': size === 'lg',
      'ml-2': valuePosition === 'right',
      'mr-2': valuePosition === 'inside',
      'mb-1': valuePosition === 'top',
      'mt-1': valuePosition === 'bottom',
      'hidden sm:block': hideValueOnSmall,
    },
    customValueClass
  );

  // Format the displayed value
  const formattedValue = () => {
    if (customValueFormat) {
      return customValueFormat(normalizedValue, maxValue);
    }
    return `${valuePrefix}${normalizedValue}${valueSuffix}`;
  };

  // Glow effect style
  const glowStyle = withGlowEffect ? {
    boxShadow: `0 0 5px ${variant === 'primary' ? 'var(--color-primary)' : 
                 variant === 'secondary' ? 'var(--color-secondary)' : 
                 variant === 'success' ? '#10b981' : 
                 variant === 'warning' ? '#f59e0b' : 
                 variant === 'error' ? '#ef4444' : 
                 variant === 'info' ? '#3b82f6' : '#9ca3af'}`
  } : {};

  // Create stripe animation style if needed
  React.useEffect(() => {
    if ((striped || withStripes) && (animated || indeterminate)) {
      const style = document.createElement('style');
      style.textContent = `
        .progress-bar-striped {
          background-image: linear-gradient(
            45deg, 
            rgba(255, 255, 255, 0.15) 25%, 
            transparent 25%, 
            transparent 50%, 
            rgba(255, 255, 255, 0.15) 50%, 
            rgba(255, 255, 255, 0.15) 75%, 
            transparent 75%, 
            transparent
          );
          background-size: 1rem 1rem;
        }
        .progress-bar-animated {
          animation: progress-bar-stripes ${stripeAnimationDuration}s linear infinite;
        }
        @keyframes progress-bar-stripes {
          from { background-position: 1rem 0; }
          to { background-position: 0 0; }
        }
        
        .indeterminate-animation {
          animation: indeterminate ${animationDuration * 2}s infinite linear;
          width: 50%;
        }
        @keyframes indeterminate {
          0% { left: -50%; }
          100% { left: 100%; }
        }
      `;
      document.head.appendChild(style);
    }
  }, [striped, withStripes, animated, indeterminate, stripeAnimationDuration, animationDuration]);

  // Animation variants
  const progressVariants = {
    initial: {
      width: '0%',
    },
    animate: {
      width: `${percentage}%`,
      transition: {
        duration: animationDuration,
        ease: 'easeInOut',
      },
    },
  };

  const indeterminateVariants = {
    initial: { left: '-50%' },
    animate: {
      left: '100%',
      transition: {
        duration: animationDuration * 2,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  // Render value text based on position
  const renderValue = () => {
    if (!showValue) return null;
    
    return (
      <Typography.Text size="xs" className={valueClasses}>
        {formattedValue()}
      </Typography.Text>
    );
  };

  // Render label if provided
  const renderLabel = () => {
    if (!label) return null;
    
    return (
      <div className={`mb-1 ${labelPosition === 'bottom' ? 'order-last mt-1 mb-0' : ''}`}>
        {typeof label === 'string' ? (
          <Typography.Text variant="secondary" size="sm">
            {label}
          </Typography.Text>
        ) : (
          label
        )}
      </div>
    );
  };

  // Main render function
  return (
    <div className={containerClasses}>
      {/* Label on top if needed */}
      {labelPosition === 'top' && renderLabel()}
      
      {/* Value on top if needed */}
      {valuePosition === 'top' && renderValue()}
      
      {/* Progress Bar Track */}
      <div className={trackClasses}>
        {indeterminate ? (
          <div className="relative w-full overflow-hidden">
            <motion.div
              className={`${fillerClasses} absolute`}
              initial="initial"
              animate="animate"
              variants={indeterminateVariants}
              style={glowStyle}
            />
          </div>
        ) : (
          withAnimation ? (
            <motion.div
              className={fillerClasses}
              style={glowStyle}
              initial="initial"
              animate="animate"
              variants={progressVariants}
            >
              {valuePosition === 'inside' && renderValue()}
            </motion.div>
          ) : (
            <div
              className={fillerClasses}
              style={{ ...glowStyle, width: `${percentage}%` }}
            >
              {valuePosition === 'inside' && renderValue()}
            </div>
          )
        )}
      </div>
      
      {/* Value on bottom or right if needed */}
      {(valuePosition === 'bottom' || valuePosition === 'right') && renderValue()}
      
      {/* Label on bottom if needed */}
      {labelPosition === 'bottom' && renderLabel()}
    </div>
  );
};

export default ProgressBar;
