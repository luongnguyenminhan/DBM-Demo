'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Typography, { TextSize } from '../atomic/typo';
import Icon from '../atomic/icon';
import Button from '../atomic/button';

export interface SectionHeaderProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  action?: React.ReactNode;
  actionLabel?: string;
  actionIcon?: IconDefinition;
  onAction?: () => void;
  icon?: IconDefinition;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  alignment?: 'left' | 'center' | 'right' | 'between';
  withDivider?: boolean;
  withAnimation?: boolean;
  className?: string;
  customClassName?: string;
  actionVariant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  actionSize?: 'small' | 'medium' | 'large';
  withMargin?: boolean;
  withIcon?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action,
  actionLabel,
  actionIcon,
  onAction,
  icon,
  variant = 'default',
  size = 'md',
  alignment = 'between',
  withDivider = false,
  withAnimation = false,
  className,
  customClassName,
  actionVariant = 'primary',
  actionSize = 'medium',
  withMargin = true,
  withIcon = true,
}) => {
  // Size classes for title
  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  // Size classes for subtitle
  const subtitleSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Alignment classes
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  // Variant classes
  const variantClasses = {
    default: 'text-[var(--text-primary)]',
    primary: 'text-[var(--color-primary)]',
    secondary: 'text-[var(--color-secondary)]',
  };

  // Container classes
  const containerClasses = classNames(
    'flex items-center',
    alignmentClasses[alignment],
    {
      'mb-4': withMargin,
      'pb-3 border-b border-gray-200': withDivider,
    },
    customClassName,
    className
  );

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  // Render action button or custom action
  const renderAction = () => {
    if (!action && !actionLabel && !onAction) return null;
    
    if (action) return action;
    
    if (actionLabel && onAction) {
      return (
        <Button
          variant={actionVariant}
          size={actionSize}
          rightIcon={actionIcon}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      );
    }
    
    return null;
  };

  // Render the header content
  const headerContent = (
    <div className={containerClasses}>
      <div className="flex items-center">
        {withIcon && icon && (
          <Icon 
            icon={icon} 
            size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'} 
            variant={variant}
            className="mr-2"
          />
        )}
        
        <div>
          <Typography.Heading
            level="h3"
            size={titleSizes[size] as TextSize}
            className={variantClasses[variant]}
            weight="semibold"
          >
            {title}
          </Typography.Heading>
          
          {subtitle && (
            <Typography.Text
              size={subtitleSizes[size] as TextSize}
              variant="muted"
              className="mt-0.5"
            >
              {subtitle}
            </Typography.Text>
          )}
        </div>
      </div>
      
      {renderAction()}
    </div>
  );

  // Apply animation if needed
  if (withAnimation) {
    return (
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        {headerContent}
      </motion.div>
    );
  }

  return headerContent;
};

export default SectionHeader;
