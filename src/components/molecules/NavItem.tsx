'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Icon from '../atomic/icon';
import Typography from '../atomic/typo';
import Badge from '../atomic/badge';

export type NavItemVariant = 'default' | 'primary' | 'secondary' | 'minimal';
export type NavItemSize = 'sm' | 'md' | 'lg';
export type NavItemOrientation = 'horizontal' | 'vertical';

export interface NavItemProps {
  label: string;
  icon?: IconDefinition;
  isActive?: boolean;
  onClick?: () => void;
  href?: string;
  variant?: NavItemVariant;
  size?: NavItemSize;
  orientation?: NavItemOrientation;
  badge?: number | string;
  badgeVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  isDisabled?: boolean;
  withAnimation?: boolean;
  customClassName?: string;
  className?: string;
  withRipple?: boolean;
  withTooltip?: boolean;
  tooltipText?: string;
  iconPosition?: 'left' | 'right' | 'top';
  isCollapsible?: boolean;
  isCollapsed?: boolean;
  children?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  isActive = false,
  onClick,
  href,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  badge,
  badgeVariant = 'primary',
  isDisabled = false,
  withAnimation = true,
  customClassName,
  className,
  withRipple = true,
  withTooltip = false,
  tooltipText,
  iconPosition = 'left',
  isCollapsible = false,
  isCollapsed = false,
  children,
}) => {
  // Size classes for padding and text
  const sizeClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-5 py-4',
  };
  
  // Variant classes
  const getVariantClasses = () => {
    // Apply appropriate styles based on variant and active state
    if (isActive) {
      switch (variant) {
        case 'primary':
          return 'bg-[var(--color-primary)] text-white';
        case 'secondary':
          return 'bg-[var(--color-secondary)] text-white';
        case 'minimal':
          return 'bg-transparent text-[var(--color-primary)]';
        default:
          return 'bg-[var(--color-primary-light)] text-[var(--color-primary)]';
      }
    } else {
      switch (variant) {
        case 'primary':
          return 'hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] text-[var(--text-primary)]';
        case 'secondary':
          return 'hover:bg-[var(--color-secondary-light)] hover:text-[var(--color-secondary)] text-[var(--text-primary)]';
        case 'minimal':
          return 'hover:bg-transparent hover:text-[var(--color-primary)] text-[var(--text-primary)]';
        default:
          return 'hover:bg-gray-100 text-[var(--text-primary)]';
      }
    }
  };
  
  // Container classes
  const containerClasses = classNames(
    'flex items-center transition-all duration-200',
    sizeClasses[size],
    getVariantClasses(),
    {
      'rounded-md': variant !== 'minimal',
      'cursor-pointer': !isDisabled && (onClick || href),
      'opacity-50 pointer-events-none': isDisabled,
      'flex-col': orientation === 'vertical' || iconPosition === 'top',
      'justify-center': orientation === 'vertical' || iconPosition === 'top',
      'w-full': isCollapsible,
      'p-2 justify-center': isCollapsible && isCollapsed,
    },
    customClassName,
    className
  );
  
  // Animation variants
  const itemVariants = {
    hover: {
      scale: withRipple ? 1.02 : 1,
    },
    tap: {
      scale: withRipple ? 0.98 : 1,
    },
  };
  
  // Handle click
  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };
  
  // Get icon sizing based on nav item size
  const getIconSize = (): 'xs' | 'sm' | 'md' | 'lg' => {
    switch (size) {
      case 'sm': return 'xs';
      case 'md': return 'sm';
      case 'lg': return 'md';
      default: return 'sm';
    }
  };
  
  // Render content based on orientation and icon position
  const renderContent = () => {
    const iconElement = icon ? (
      <Icon 
        icon={icon} 
        size={getIconSize()} 
        variant={isActive ? 'primary' : 'default'}
        className={classNames({
          'mr-3': iconPosition === 'left' && !isCollapsed,
          'ml-3': iconPosition === 'right' && !isCollapsed,
          'mb-2': iconPosition === 'top',
        })}
      />
    ) : null;
    
    const labelElement = !isCollapsed || !isCollapsible ? (
      <Typography.Text 
        weight={isActive ? 'medium' : 'regular'} 
        size={size === 'sm' ? 'xs' : size === 'lg' ? 'base' : 'sm'}
      >
        {label}
      </Typography.Text>
    ) : null;
    
    const badgeElement = badge !== undefined ? (
      <Badge 
        content={badge} 
        variant={badgeVariant}
        size="xs"
        className="ml-2"
      />
    ) : null;
    
    if (orientation === 'vertical' || iconPosition === 'top') {
      return (
        <>
          {iconElement}
          {labelElement}
          {badgeElement}
        </>
      );
    }
    
    return (
      <>
        {iconPosition === 'left' && iconElement}
        <div className="flex items-center">
          {labelElement}
          {badgeElement}
        </div>
        {iconPosition === 'right' && iconElement}
        {children}
      </>
    );
  };
  
  // Wrap in motion component if animation is enabled
  const content = (
    <div 
      className={containerClasses}
      onClick={handleClick}
      title={withTooltip ? tooltipText || label : undefined}
    >
      {renderContent()}
    </div>
  );
  
  // If href is provided, wrap in anchor tag
  if (href && !isDisabled) {
    return (
      <a href={href} className="block no-underline">
        {withAnimation ? (
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={itemVariants}
            transition={{ duration: 0.2 }}
          >
            {content}
          </motion.div>
        ) : (
          content
        )}
      </a>
    );
  }
  
  return withAnimation ? (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      variants={itemVariants}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.div>
  ) : (
    content
  );
};

export default NavItem;
