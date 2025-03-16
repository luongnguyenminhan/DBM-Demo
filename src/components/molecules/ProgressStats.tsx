'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Typography, { TextSize } from '../atomic/typo';
import ProgressBar from '../atomic/progressBar';
import Icon from '../atomic/icon';

export interface ProgressStatsProps {
  label: string;
  value: number;
  maxValue?: number;
  format?: 'percentage' | 'fraction' | 'custom';
  customFormat?: (value: number, maxValue: number) => string;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: IconDefinition;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  withAnimation?: boolean;
  className?: string;
  customClassName?: string;
  showValue?: boolean;
  valuePosition?: 'right' | 'bottom';
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  stats?: {
    label: string;
    value: string | number;
  }[];
  barHeight?: 'xs' | 'sm' | 'md' | 'lg';
  barShape?: 'rounded' | 'square';
  barVariant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gradient';
  animationDuration?: number;
  withLabelStats?: boolean;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({
  label,
  value,
  maxValue = 100,
  format = 'percentage',
  customFormat,
  subtitle,
  description,
  icon,
  variant = 'default',
  size = 'md',
  withAnimation = true,
  className,
  customClassName,
  showValue = true,
  valuePosition = 'right',
  trend,
  stats = [],
  barHeight = 'sm',
  barShape = 'rounded',
  barVariant = 'primary',
  animationDuration = 0.8,
  withLabelStats = false,
}) => {
  // Size classes for text
  const sizeClasses = {
    sm: {
      label: 'text-xs',
      value: 'text-sm',
      stats: 'text-xs',
    },
    md: {
      label: 'text-sm',
      value: 'text-base',
      stats: 'text-xs',
    },
    lg: {
      label: 'text-base',
      value: 'text-lg',
      stats: 'text-sm',
    },
  };

  // Container classes
  const containerClasses = classNames(
    'w-full',
    customClassName,
    className
  );

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Format the displayed value
  const formatValue = () => {
    if (customFormat) {
      return customFormat(value, maxValue);
    }
    
    switch (format) {
      case 'percentage':
        return `${Math.round((value / maxValue) * 100)}%`;
      case 'fraction':
        return `${value}/${maxValue}`;
      default:
        return `${value}`;
    }
  };

  // Render trend indicator if provided
  const renderTrend = () => {
    if (!trend) return null;
    
    const trendColor = trend.isPositive ? 'text-green-500' : 'text-red-500';
    const trendArrow = trend.isPositive ? '↑' : '↓';
    
    return (
      <Typography.Text size="xs" className={trendColor}>
        {trendArrow} {trend.value}%
        {trend.label && <span className="ml-1">{trend.label}</span>}
      </Typography.Text>
    );
  };

  // Render stats if provided
  const renderStats = () => {
    if (stats.length === 0) return null;
    
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between">
            <Typography.Text
              size={sizeClasses[size].stats as TextSize}
              variant="muted"
            >
              {stat.label}
            </Typography.Text>
            <Typography.Text
              size={sizeClasses[size].stats as TextSize}
              weight="medium"
            >
              {stat.value}
            </Typography.Text>
          </div>
        ))}
      </div>
    );
  };

  // Progress content
  const progressContent = (
    <div className={containerClasses}>
      {/* Header with label and value */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {icon && (
            <Icon
              icon={icon}
              size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'}
              variant={variant}
              className="mr-1.5"
            />
          )}
          <Typography.Text
            size={sizeClasses[size].label as TextSize}
            weight="medium"
          >
            {label}
          </Typography.Text>
        </div>
        
        {showValue && valuePosition === 'right' && (
          <div className="flex items-center">
            <Typography.Text
              size={sizeClasses[size].value as TextSize}
              weight="semibold"
              className="mr-2"
            >
              {formatValue()}
            </Typography.Text>
            {renderTrend()}
          </div>
        )}
      </div>
      
      {/* Subtitle if provided */}
      {subtitle && (
        <div className="mb-2">
          <Typography.Text size="xs" variant="muted">
            {subtitle}
          </Typography.Text>
        </div>
      )}
      
      {/* Progress bar */}
      <ProgressBar
        value={value}
        maxValue={maxValue}
        variant={barVariant}
        size={barHeight}
        shape={barShape}
        withAnimation={withAnimation}
        animationDuration={animationDuration}
        label={withLabelStats ? (
          <div className="flex justify-between">
            <Typography.Text size="xs">0</Typography.Text>
            <Typography.Text size="xs">{maxValue}</Typography.Text>
          </div>
        ) : undefined}
      />
      
      {/* Bottom value display */}
      {showValue && valuePosition === 'bottom' && (
        <div className="flex justify-end mt-1">
          <Typography.Text size={sizeClasses[size].value as TextSize} weight="semibold">
            {formatValue()}
          </Typography.Text>
          {renderTrend()}
        </div>
      )}
      
      {/* Description if provided */}
      {description && (
        <div className="mt-2">
          <Typography.Text size="xs" variant="muted">
            {description}
          </Typography.Text>
        </div>
      )}
      
      {/* Stats section */}
      {renderStats()}
    </div>
  );

  // Apply animation if needed
  if (withAnimation) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          {progressContent}
        </motion.div>
      </motion.div>
    );
  }

  return progressContent;
};

export default ProgressStats;
