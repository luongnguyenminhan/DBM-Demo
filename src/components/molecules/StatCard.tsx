'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Typography from '../atomic/typo';

export type StatCardVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type StatCardSize = 'small' | 'medium' | 'large';

export interface StatCardProps {
  metric: string | ReactNode;
  value: string | number | ReactNode;
  change?: string;
  icon?: IconDefinition;
  iconPosition?: 'left' | 'right' | 'top';
  variant?: StatCardVariant;
  size?: StatCardSize;
  withAnimation?: boolean;
  animationType?: 'fade' | 'slide' | 'scale';
  withBorder?: boolean;
  withShadow?: boolean;
  shadowSize?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  customClassName?: string;
  className?: string;
  metricClassName?: string;
  valueClassName?: string;
  changeClassName?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  metric,
  value,
  change,
  icon,
  iconPosition = 'left',
  variant = 'default',
  size = 'medium',
  withAnimation = false,
  animationType = 'fade',
  withBorder = false,
  withShadow = true,
  shadowSize = 'md',
  rounded = true,
  customClassName = '',
  className,
  metricClassName,
  valueClassName,
  changeClassName,
  onClick,
}) => {
  // Determine if change is positive, negative, or neutral
  const isPositive = change?.startsWith('+');
  const isNegative = change?.startsWith('-');
  
  // Size classes
  const sizeClasses = {
    small: 'px-2 py-2',
    medium: 'px-3 py-3 sm:p-4',
    large: 'px-4 py-4 sm:p-5',
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  };

  // Variant classes for different styling based on variant
  const variantClasses = {
    default: '',
    primary: 'bg-[var(--color-primary)] text-white',
    secondary: 'bg-[var(--color-secondary)] text-white',
    success: 'bg-[var(--color-success)] text-white',
    warning: 'bg-[var(--color-warning)] text-[var(--text-primary)]',
    error: 'bg-[var(--color-error)] text-white',
    info: 'bg-[var(--color-info)] text-white',
  };

  // Border color classes based on variant
  const borderColorClasses = {
    default: 'border-gray-200',
    primary: 'border-[var(--color-primary)]',
    secondary: 'border-[var(--color-secondary)]',
    success: 'border-[var(--color-success)]',
    warning: 'border-[var(--color-warning)]',
    error: 'border-[var(--color-error)]',
    info: 'border-[var(--color-info)]',
  };

  // Container classes
  const containerClasses = classNames(
    variant === 'default' ? 'bg-white' : '',
    'overflow-hidden',
    sizeClasses[size],
    variantClasses[variant],
    {
      'rounded-lg': rounded,
      [shadowClasses[shadowSize]]: withShadow,
      ['border ' + borderColorClasses[variant]]: withBorder,
      'cursor-pointer hover:bg-opacity-90 transition-colors duration-200': !!onClick,
      'flex gap-3 items-center': icon && (iconPosition === 'left' || iconPosition === 'right'),
      'flex flex-col': icon && iconPosition === 'top',
    },
    customClassName,
    className
  );

  // Animation variants
  const animationVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  // Handle change color class
  const getChangeColorClass = () => {
    if (isPositive) return 'bg-[var(--stat-positive-bg,#dcfce7)] text-[var(--stat-positive-text,#16a34a)]';
    if (isNegative) return 'bg-[var(--stat-negative-bg,#fee2e2)] text-[var(--stat-negative-text,#dc2626)]';
    return 'bg-[var(--stat-neutral-bg,#f3f4f6)] text-[var(--stat-neutral-text,#4b5563)]';
  };

  // Render the icon if provided
  const renderIcon = () => {
    if (!icon) return null;

    const iconSizeClass = size === 'small' ? 'text-lg' : size === 'large' ? 'text-3xl' : 'text-2xl';
    
    return (
      <div className={classNames(
        variant === 'default' ? 'text-gray-400' : 'text-current opacity-80', 
        iconSizeClass
      )}>
        <FontAwesomeIcon icon={icon} />
      </div>
    );
  };

  // Render the metric content
  const renderMetric = () => {
    if (!metric) return null;

    return typeof metric === 'string' ? (
      <Typography.Text 
        size={size === 'small' ? 'xs' : 'sm'}
        variant={variant !== 'default' ? 'muted' : 'muted'}
        className={classNames("font-medium truncate", metricClassName)}
      >
        {metric}
      </Typography.Text>
    ) : (
      metric
    );
  };

  // Render the value content
  const renderValue = () => {
    return typeof value === 'string' || typeof value === 'number' ? (
      <Typography.Text 
        size={size === 'small' ? 'lg' : size === 'large' ? '3xl' : '2xl'}
        weight="semibold"
        variant={variant !== 'default' ? 'default' : 'default'}
        className={classNames(valueClassName)}
      >
        {value}
      </Typography.Text>
    ) : (
      value
    );
  };

  // Render the change indicator
  const renderChange = () => {
    if (!change) return null;
    
    // Adjust change indicator colors based on card variant
    const changeClasses = variant === 'default' ? 
      getChangeColorClass() :
      'bg-white bg-opacity-20 text-current !text-[var(--text-primary)]';
    
    return (
      <span 
        className={classNames(
          'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
          changeClasses,
          changeClassName
        )}
      >
        {change}
      </span>
    );
  };

  // Content to be rendered
  const content = (
    <div className={containerClasses} onClick={onClick}>
      {icon && iconPosition === 'left' && renderIcon()}
      {icon && iconPosition === 'top' && renderIcon()}

      <div className="flex-1">
        {renderMetric()}
        <div className="mt-1 flex items-baseline justify-between">
          {renderValue()}
          {renderChange()}
        </div>
      </div>

      {icon && iconPosition === 'right' && renderIcon()}
    </div>
  );

  // Apply animation if enabled
  if (withAnimation) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animationVariants[animationType]}
        transition={{ duration: 0.4 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default StatCard;
