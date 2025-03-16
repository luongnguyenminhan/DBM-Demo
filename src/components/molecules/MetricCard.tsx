'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Typography from '../atomic/typo';
import Card, { CardVariant } from '../atomic/card';
import Icon from '../atomic/icon';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: IconDefinition;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  withAnimation?: boolean;
  withShadow?: boolean;
  withBorder?: boolean;
  withHover?: boolean;
  className?: string;
  customClassName?: string;
  onClick?: () => void;
  iconPosition?: 'left' | 'top' | 'right';
  iconBackground?: boolean;
  additionalContent?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  size = 'md',
  withAnimation = true,
  withShadow = true,
  withBorder = false,
  withHover = false,
  className,
  customClassName,
  onClick,
  iconPosition = 'left',
  iconBackground = true,
  additionalContent,
}) => {
  // Size classes for text
  const sizeClasses = {
    sm: {
      title: 'text-xs',
      value: 'text-xl',
      subtitle: 'text-xs',
    },
    md: {
      title: 'text-sm',
      value: 'text-2xl',
      subtitle: 'text-xs',
    },
    lg: {
      title: 'text-base',
      value: 'text-3xl',
      subtitle: 'text-sm',
    },
  };

  // Icon background colors based on variant
  const iconBgColors = {
    default: 'bg-gray-100',
    primary: 'bg-[var(--color-primary-light)]',
    secondary: 'bg-[var(--color-secondary-light)]',
    success: 'bg-green-100',
    warning: 'bg-yellow-100',
    error: 'bg-red-100',
    info: 'bg-blue-100',
  };

  // Icon colors based on variant
  const iconColors = {
    default: 'text-gray-600',
    primary: 'text-[var(--color-primary)]',
    secondary: 'text-[var(--color-secondary)]',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    info: 'text-blue-600',
  };

  // Trend colors
  const trendColor = trend?.isPositive ? 'text-green-500' : 'text-red-500';
  const trendIcon = trend?.isPositive ? '↑' : '↓';

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -4,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Render icon if provided
  const renderIcon = () => {
    if (!icon) return null;

    return (
      <div
        className={classNames(
          'flex items-center justify-center',
          {
            'rounded-full': iconBackground,
            [iconBgColors[variant]]: iconBackground,
            'p-3': size !== 'sm',
            'p-2': size === 'sm',
            'mr-4': iconPosition === 'left',
            'mb-4': iconPosition === 'top',
            'ml-4': iconPosition === 'right',
          }
        )}
      >
        <Icon
          icon={icon}
          size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
          variant={variant}
          className={iconBackground ? iconColors[variant] : ''}
        />
      </div>
    );
  };

  // Render trend indicator if provided
  const renderTrend = () => {
    if (!trend) return null;

    return (
      <div className={classNames('flex items-center', trendColor)}>
        <span className="mr-1">{trendIcon}</span>
        <Typography.Text size="xs" className={trendColor}>
          {trend.value}%
          {trend.label && <span className="ml-1">{trend.label}</span>}
        </Typography.Text>
      </div>
    );
  };

  // Card content
  const cardContent = (
    <div
      className={classNames(
        'flex',
        {
          'flex-row items-center': iconPosition === 'left' || iconPosition === 'right',
          'flex-col': iconPosition === 'top',
          'flex-row-reverse': iconPosition === 'right',
        },
        customClassName
      )}
    >
      {renderIcon()}

      <div className="flex-1">
        <Typography.Text
          variant="muted"
          size="sm"
          className={classNames(sizeClasses[size].title, 'mb-1')}
        >
          {title}
        </Typography.Text>

        <div className="flex items-baseline">
          <Typography.Text
            weight="semibold"
            size={size === 'sm' ? 'lg' : size === 'lg' ? '3xl' : '2xl'}
            className="mr-2"
          >
            {value}
          </Typography.Text>
          {renderTrend()}
        </div>

        {subtitle && (
          <Typography.Text
            variant="muted"
            size="xs"
            className={classNames(sizeClasses[size].subtitle, 'mt-1')}
          >
            {subtitle}
          </Typography.Text>
        )}

        {additionalContent && <div className="mt-3">{additionalContent}</div>}
      </div>
    </div>
  );

  // Wrapped in Card component
  if (withAnimation) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={withHover ? 'hover' : undefined}
      >
        <Card
          variant={variant as CardVariant}
          withShadow={withShadow}
          withBorder={withBorder}
          withHover={false} 
          withAnimation={false} 
          onClick={onClick}
          className={className}
          padding={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
        >
          {cardContent}
        </Card>
      </motion.div>
    );
  }

  return (
    <Card
      variant={variant as CardVariant}
      withShadow={withShadow}
      withBorder={withBorder}
      withHover={withHover}
      withAnimation={false}
      onClick={onClick}
      className={className}
      padding={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
    >
      {cardContent}
    </Card>
  );
};

export default MetricCard;
