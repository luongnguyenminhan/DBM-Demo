'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Typography from '../atomic/typo';
import Icon from '../atomic/icon';

export type BadgeItemLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface BadgeItemProps {
  name: string;
  icon: IconDefinition;
  description?: string;
  level?: BadgeItemLevel;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  withAnimation?: boolean;
  withShadow?: boolean;
  withBorder?: boolean;
  withHover?: boolean;
  className?: string;
  customClassName?: string;
  onClick?: () => void;
  earnedAt?: Date;
  progress?: number;
  maxProgress?: number;
  isLocked?: boolean;
  lockMessage?: string;
  tooltipText?: string;
  withTooltip?: boolean;
}

const BadgeItem: React.FC<BadgeItemProps> = ({
  name,
  icon,
  description,
  level = 'bronze',
  variant = 'default',
  size = 'md',
  withAnimation = true,
  withShadow = true,
  withBorder = true,
  withHover = true,
  className,
  customClassName,
  onClick,
  earnedAt,
  progress,
  maxProgress,
  isLocked = false,
  lockMessage = 'Complete requirements to unlock',
  tooltipText,
  withTooltip = false,
}) => {
  // Level colors for badges
  const levelColors = {
    bronze: 'from-amber-600 to-amber-800',
    silver: 'from-gray-300 to-gray-500',
    gold: 'from-yellow-300 to-yellow-600',
    platinum: 'from-blue-300 to-blue-600',
    diamond: 'from-indigo-300 to-indigo-600',
  };

  // Size classes
  const sizeClasses = {
    sm: {
      container: 'p-2',
      icon: 'w-8 h-8',
      title: 'text-xs',
      description: 'text-xs',
    },
    md: {
      container: 'p-3',
      icon: 'w-12 h-12',
      title: 'text-sm',
      description: 'text-xs',
    },
    lg: {
      container: 'p-4',
      icon: 'w-16 h-16',
      title: 'text-base',
      description: 'text-sm',
    },
  };

  // Variant classes
  const variantClasses = {
    default: 'bg-white text-gray-800',
    primary: 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]',
    secondary: 'bg-[var(--color-secondary-light)] text-[var(--color-secondary-dark)]',
    success: 'bg-green-50 text-green-800',
    warning: 'bg-yellow-50 text-yellow-800',
    error: 'bg-red-50 text-red-800',
  };

  // Container classes
  const containerClasses = classNames(
    'flex flex-col items-center justify-center rounded-lg',
    sizeClasses[size].container,
    variantClasses[variant],
    {
      'cursor-pointer': !isLocked && onClick,
      'opacity-50': isLocked,
      'shadow-md': withShadow,
      'border border-gray-200': withBorder,
    },
    customClassName,
    className
  );

  // Animation variants
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Format date to readable string
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Render progress text if available
  const renderProgress = () => {
    if (progress === undefined || maxProgress === undefined) return null;
    return (
      <Typography.Text size="xs" variant="muted" className="mt-1">
        {progress}/{maxProgress}
      </Typography.Text>
    );
  };

  // Handle click event
  const handleClick = () => {
    if (!isLocked && onClick) onClick();
  };

  // Badge content
  const badgeContent = (
    <div
      className={containerClasses}
      onClick={handleClick}
      title={withTooltip ? tooltipText || name : undefined}
    >
      {/* Badge icon with level-specific styling */}
      <div
        className={classNames(
          'rounded-full flex items-center justify-center bg-gradient-to-br',
          levelColors[level],
          sizeClasses[size].icon,
          { 'filter grayscale': isLocked }
        )}
      >
        <Icon
          icon={icon}
          size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
          className="text-white"
        />
      </div>

      {/* Badge name */}
      <Typography.Text
        weight="semibold"
        size={size === 'sm' ? 'xs' : size === 'lg' ? 'base' : 'sm'}
        className="mt-2 ml-2 text-center"
      >
        {name}
      </Typography.Text>

      {/* Level indicator */}
      <Typography.Text
        size="xs"
        variant="muted"
        className="!capitalize text-center ml-2"
      >
        {level}
      </Typography.Text>

      {/* Badge description */}
      {description && (
        <Typography.Text
          size="xs"
          variant="muted"
          className="mt-1 !text-center ml-2"
        >
          {description}
        </Typography.Text>
      )}

      {/* Earned date */}
      {earnedAt && !isLocked && (
        <Typography.Text size="xs" variant="muted" className="mt-1 text-center ml-2">
          Earned {formatDate(earnedAt)}
        </Typography.Text>
      )}

      {/* Progress indicator */}
      {renderProgress()}

      {/* Lock message */}
      {isLocked && (
        <Typography.Text size="xs" variant="error" className="mt-1 text-center">
          {lockMessage}
        </Typography.Text>
      )}
    </div>
  );

  // Apply animation if needed
  if (withAnimation) {
    return (
      <motion.div
        variants={badgeVariants}
        initial="hidden"
        animate="visible"
        whileHover={withHover && !isLocked ? 'hover' : undefined}
      >
        {badgeContent}
      </motion.div>
    );
  }

  return badgeContent;
};

export default BadgeItem;
